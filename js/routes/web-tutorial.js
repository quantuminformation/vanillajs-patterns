// File: js/routes/web-tutorial.js
// Draw a 25 % cyan square; header & footer remain visible.
// Works by relying 100 % on flex-layout (no manual pixel math).

import { loadShader } from '../utils/shaderLoader.js';

export default async function WebGPUFlatSquare(host) {
  /* ───────────── 1 · LAYOUT (pure flex, no calculations) ───────────── */
  host.replaceChildren();
  host.style.cssText =
      'flex:1 0 auto; position:relative; overflow:hidden; background:#000; margin:0; padding:0;';

  const canvas = Object.assign(document.createElement('canvas'), {
    style: 'position:absolute; width:100%; height:100%; cursor:default;',
  });
  host.appendChild(canvas);

  /* ───────────── 2 · WEBGPU INIT ───────────── */
  if (!navigator.gpu) return alert('WebGPU not supported');
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) return alert('No GPU adapter available');
  const device  = await adapter.requestDevice();
  const ctx     = canvas.getContext('webgpu');
  const format  = navigator.gpu.getPreferredCanvasFormat();

  const resize = () => {
    const dpr = devicePixelRatio;
    canvas.width  = host.clientWidth  * dpr;
    canvas.height = host.clientHeight * dpr;
    ctx.configure({ device, format, alphaMode:'premultiplied', size:[canvas.width, canvas.height] });
  };
  resize();
  addEventListener('resize', resize);

  /* ───────────── 3 · SHADER & GEOMETRY ───────────── */
  const wgsl   = await loadShader('square-flat.wgsl');
  const module = device.createShaderModule({ code: wgsl });

  const s = 0.5;
  const vertices = new Float32Array([
    -s,-s,0,  0,1,1,
    s,-s,0,  0,1,1,
    s, s,0,  0,1,1,
    -s, s,0,  0,1,1,
  ]);
  const indices = new Uint16Array([0,1,2, 0,2,3]);

  const vb = device.createBuffer({ size:vertices.byteLength, usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST });
  device.queue.writeBuffer(vb,0,vertices);

  const ib = device.createBuffer({ size:indices.byteLength, usage:GPUBufferUsage.INDEX |GPUBufferUsage.COPY_DST });
  device.queue.writeBuffer(ib,0,indices);

  const pipeline = device.createRenderPipeline({
    layout:'auto',
    vertex:{
      module, entryPoint:'vs_main',
      buffers:[{
        arrayStride:24,
        attributes:[
          { shaderLocation:0, offset:0,  format:'float32x3' },
          { shaderLocation:1, offset:12, format:'float32x3' },
        ],
      }],
    },
    fragment:{ module, entryPoint:'fs_main', targets:[{ format }] },
    primitive:{ topology:'triangle-list', cullMode:'none' },
  });

  /* ───────────── 4 · RENDER LOOP ───────────── */
  function frame(){
    const enc = device.createCommandEncoder();
    const pass = enc.beginRenderPass({
      colorAttachments:[{
        view:ctx.getCurrentTexture().createView(),
        loadOp:'clear', clearValue:{ r:0,g:0,b:0,a:1 }, storeOp:'store',
      }],
    });
    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0,vb);
    pass.setIndexBuffer(ib,'uint16');
    pass.drawIndexed(6);
    pass.end();
    device.queue.submit([enc.finish()]);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
