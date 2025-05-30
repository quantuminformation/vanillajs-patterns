// File: js/routes/web-tutorial.js
// Renders a centered flat square (25% viewport) in cyan via WebGPU.

import { loadShader } from '../utils/shaderLoader.js';

export default async function WebGPUFlatSquare(host) {
  // 1) Fill entire viewport
  host.style.cssText = 'position:fixed;left:0;right:0;top:0;bottom:0;margin:0;overflow:hidden;background:#000';
  host.replaceChildren();

  // 2) Create & append canvas
  const canvas = Object.assign(document.createElement('canvas'), {
    style: 'position:absolute;inset:0;width:100%;height:100%;cursor:default;',
  });
  host.appendChild(canvas);

  // 3) Init WebGPU
  if (!navigator.gpu) return alert('WebGPU not supported');
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) return alert('No GPU adapter available');
  const device = await adapter.requestDevice();
  const ctx = canvas.getContext('webgpu');
  const format = navigator.gpu.getPreferredCanvasFormat();

  // 4) Resize handling (account for DPR)
  const resize = () => {
    const dpr = devicePixelRatio;
    canvas.width  = host.clientWidth  * dpr;
    canvas.height = host.clientHeight * dpr;
    ctx.configure({ device, format, alphaMode: 'premultiplied', size: [canvas.width, canvas.height] });
  };
  resize();
  addEventListener('resize', resize);

  // 5) Load & compile shader
  const wgslModule = await loadShader('square-flat.wgsl');
  const module = device.createShaderModule({ code: wgslModule });

  // 6) Build a 0.5×0.5 NDC square (i.e. 25% of viewport) in cyan
  const s = 0.5;
  const vertices = new Float32Array([
    -s, -s, 0,  0,1,1,   s, -s, 0,  0,1,1,
    s,  s, 0,  0,1,1,  -s,  s, 0,  0,1,1,
  ]);
  const indices = new Uint16Array([0,1,2, 0,2,3]);

  const vb = device.createBuffer({ size: vertices.byteLength, usage: GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST });
  device.queue.writeBuffer(vb, 0, vertices);
  const ib = device.createBuffer({ size: indices.byteLength,  usage: GPUBufferUsage.INDEX |GPUBufferUsage.COPY_DST });
  device.queue.writeBuffer(ib, 0, indices);

  // 7) Configure render pipeline
  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs_main',
      buffers: [{
        arrayStride: 24,
        attributes: [
          { shaderLocation: 0, offset: 0,  format: 'float32x3' }, // position
          { shaderLocation: 1, offset: 12, format: 'float32x3' }, // color
        ],
      }],
    },
    fragment: {
      module,
      entryPoint: 'fs_main',
      targets: [{ format }],
    },
    primitive: { topology: 'triangle-list', cullMode: 'none' },
    depthStencil: undefined,
  });

  // 8) Draw loop
  function frame() {
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [{
        view: ctx.getCurrentTexture().createView(),
        loadOp: 'clear', clearValue: { r:0,g:0,b:0,a:1 }, storeOp:'store'
      }],
    });
    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, vb);
    pass.setIndexBuffer(ib, 'uint16');
    pass.drawIndexed(6);
    pass.end();
    device.queue.submit([encoder.finish()]);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
