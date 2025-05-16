/**
 * WebGPU Spinning Cube Component
 * SPDX-License-Identifier: MIT
 * @version 1.3
 *
 * Fetches an external WGSL shader and renders a spinning cube.
 *
 * @module WebGPUSpinningCube
 * @param {HTMLElement} hostComponent
 */
export default async function WebGPUSpinningCube(hostComponent) {
    // 1) set up the canvas
    const canvas = document.createElement('canvas');
    canvas.style.width  = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    hostComponent.appendChild(canvas);

    if (!navigator.gpu) {
        hostComponent.textContent = 'WebGPU not supported.';
        return;
    }

    // 2) adapter / device / context
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        hostComponent.textContent = 'GPU adapter unavailable.';
        return;
    }
    const device  = await adapter.requestDevice();
    const context = canvas.getContext('webgpu');
    const format  = navigator.gpu.getPreferredCanvasFormat();

    // 3) resize helper
    const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width  = hostComponent.clientWidth  * dpr;
        canvas.height = hostComponent.clientHeight * dpr;
        context.configure({ device, format, alphaMode: 'opaque', size: [canvas.width, canvas.height] });
    };
    window.addEventListener('resize', resize);
    resize();

    // 4) load shader code externally
    const shaderURL = 'wgsl/spinning-cube.wgsl';
    let wgsl;
    try {
        wgsl = await fetch(shaderURL).then(r => {
            if (!r.ok) throw new Error(`WGSL fetch ${r.status}`);
            return r.text();
        });
    } catch (e) {
        hostComponent.textContent = `Failed to load shader: ${e.message}`;
        return;
    }

    console.log('Loaded WGSL shader:', wgsl);

    // 5) create module & pipeline
    const shaderModule = device.createShaderModule({ code: wgsl });

    // geometry
    const verts = new Float32Array([
        // x,y,z   r,g,b
        -1,-1,-1, 1,0,0,   1,-1,-1, 0,1,0,   1,1,-1, 0,0,1,  -1,1,-1, 1,1,0,
        -1,-1,1, 1,0,1,    1,-1,1, 0,1,1,    1,1,1, 1,1,1,   -1,1,1, 0,0,0
    ]);
    const inds = new Uint16Array([
        0,1,2, 0,2,3,
        4,5,6, 4,6,7,
        0,1,5, 0,5,4,
        2,3,7, 2,7,6,
        0,3,7, 0,7,4,
        1,2,6, 1,6,5
    ]);

    const vb = device.createBuffer({ size: verts.byteLength, usage: GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST });
    device.queue.writeBuffer(vb, 0, verts);
    const ib = device.createBuffer({ size: inds.byteLength, usage: GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST });
    device.queue.writeBuffer(ib, 0, inds);

    const uniformBuffer = device.createBuffer({
        size: 16 * 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const uboLayout = device.createBindGroupLayout({
        entries: [{ binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }]
    });
    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [uboLayout]
    });

    const pipeline = device.createRenderPipeline({
        layout: pipelineLayout,
        vertex: {
            module: shaderModule,
            entryPoint: 'vs_main',
            buffers: [{
                arrayStride: 6 * 4,
                attributes: [
                    { shaderLocation: 0, offset: 0,     format: 'float32x3' },
                    { shaderLocation: 1, offset: 3 * 4, format: 'float32x3' },
                ],
            }],
        },
        fragment: {
            module: shaderModule,
            entryPoint: 'fs_main',
            targets: [{ format }],
        },
        primitive: { topology: 'triangle-list', cullMode: 'back' },
        depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' },
    });

    let depthTex = device.createTexture({
        size:   [canvas.width, canvas.height],
        format: 'depth24plus',
        usage:  GPUTextureUsage.RENDER_ATTACHMENT,
    });

    const bindGroup = device.createBindGroup({
        layout: uboLayout,
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }]
    });

    // math helpers
    const perspective = (fov, ar, near, far) => {
        const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
        return new Float32Array([
            f / ar, 0, 0, 0,
            0, f,   0, 0,
            0, 0, (far + near) * nf, -1,
            0, 0, (2 * far * near) * nf, 0
        ]);
    };
    const translate = (x,y,z) => new Float32Array([
        1,0,0,0,  0,1,0,0,  0,0,1,0,  x,y,z,1
    ]);
    const rotX = r => { const c=Math.cos(r), s=Math.sin(r);
        return new Float32Array([1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1]);
    };
    const rotY = r => { const c=Math.cos(r), s=Math.sin(r);
        return new Float32Array([c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1]);
    };
    const mul = (A,B) => {
        const R = new Float32Array(16);
        for (let i = 0; i < 4; ++i)
            for (let j = 0; j < 4; ++j) {
                let sum = 0;
                for (let k = 0; k < 4; ++k) sum += A[k*4 + j] * B[i*4 + k];
                R[i*4 + j] = sum;
            }
        return R;
    };

    // 6) animation loop
    let then = 0;
    function frame(now) {
        if (!then) then = now;
        const t = now / 1000;

        // resize depthTex if needed
        if (depthTex.width !== canvas.width || depthTex.height !== canvas.height) {
            depthTex.destroy();
            depthTex = device.createTexture({
                size: [canvas.width, canvas.height],
                format: 'depth24plus',
                usage: GPUTextureUsage.RENDER_ATTACHMENT
            });
        }

        // build MVP
        const aspect = canvas.width / canvas.height;
        const proj   = perspective(Math.PI/4, aspect, 0.1, 100);
        const view   = translate(0,0,-6);
        const model  = mul(rotY(t), rotX(t * 0.7));
        const mvp    = mul(proj, mul(view, model));

        device.queue.writeBuffer(uniformBuffer, 0, mvp);

        // encode pass
        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: 'clear',
                clearValue: { r:0, g:0, b:0, a:1 },
                storeOp: 'store'
            }],
            depthStencilAttachment: {
                view: depthTex.createView(),
                depthLoadOp: 'clear',
                depthClearValue: 1,
                depthStoreOp: 'store'
            }
        });

        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.setVertexBuffer(0, vb);
        pass.setIndexBuffer(ib, 'uint16');
        pass.drawIndexed(inds.length);
        pass.end();

        device.queue.submit([encoder.finish()]);
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}
