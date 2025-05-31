// File: js/routes/web-tutorial.js
// Draw a 25 % cyan square; header & footer remain visible.
// Works by relying 100 % on flex‐layout (no manual pixel math).

import { loadShader } from '../utils/shaderLoader.js'; // Helper to load WGSL from /wgsl

export default async function WebGPUFlatSquare(host) {
  /* ───────────── 1 · LAYOUT (pure flex, no calculations) ───────────── */
  host.replaceChildren(); // Remove any existing children in the host container
  host.style.cssText =
      'flex:1 0 auto; position:relative; overflow:hidden; background:#000; margin:0; padding:0;';
  // “host” now grows to fill the space between header & footer, and can contain an absolutely positioned canvas

  const canvas = Object.assign(document.createElement('canvas'), {
    style: 'position:absolute; width:100%; height:100%; cursor:default;',
  });
  host.appendChild(canvas); // Insert the canvas into “host”

  /* ───────────── 2 · WEBGPU INIT ───────────── */
  if (!navigator.gpu) return alert('WebGPU not supported');      // Abort if no WebGPU
  const adapter = await navigator.gpu.requestAdapter();         // Request a GPU adapter
  if (!adapter) return alert('No GPU adapter available');       // Abort if none
  const device  = await adapter.requestDevice();                 // Acquire a logical GPU device
  const ctx     = canvas.getContext('webgpu');                   // Get WebGPU rendering context
  const format  = navigator.gpu.getPreferredCanvasFormat();     // Recommended swapchain format

  const resize = () => {                                         // Resize handler
    const dpr = devicePixelRatio;                                // Device‐pixel ratio
    canvas.width  = host.clientWidth  * dpr;                     // Physical pixel width
    canvas.height = host.clientHeight * dpr;                     // Physical pixel height
    ctx.configure({
      device,
      format,
      alphaMode: 'premultiplied',
      size: [canvas.width, canvas.height],
    });                                                           // Reconfigure the swapchain
  };
  resize();                                                      // Initial sizing
  addEventListener('resize', resize);                            // Update on window resize

  /* ───────────── 3 · SHADER & GEOMETRY ───────────── */
  const wgsl   = await loadShader('square-flat.wgsl');           // Load WGSL from /wgsl/square-flat.wgsl
  const module = device.createShaderModule({ code: wgsl });      // Create GPUShaderModule

  const s = 0.5; // Half‐size in NDC space (±0.5 covers 50 % of viewport)
  // Vertex data: [x, y, z, r, g, b] for 4 corners of a square
  const vertices = new Float32Array([
    -s, -s, 0,   0, 0, 1,  // bottom‐left  (cyan)
    s, -s, 0,   0, 1, 0,  // bottom‐right (cyan)
    s,  s, 0,   1,0, 0,  // top‐right    (cyan)
    -s,  s, 0,   1, 1,1,  // top‐left     (cyan)
  ]);
  // Indices to form two triangles (0→1→2 and 0→2→3) from those 4 vertices
  const indices = new Uint16Array([0, 1, 2,  0, 2, 3,]);

  // Create and upload vertex buffer
  const vb = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vb, 0, vertices);

  // Create and upload index buffer
  const ib = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(ib, 0, indices);

  // Create render pipeline
  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs_main',
      buffers: [{
        arrayStride: 24, // 3 floats for position + 3 floats for color = 6×4 bytes = 24 bytes
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
    primitive: {
      topology: 'triangle-list',
      cullMode: 'none',
    },
  });

  /* ───────────── 4 · RENDER LOOP ───────────── */
  function frame() {
    const enc = device.createCommandEncoder();                // Begin command encoding
    const pass = enc.beginRenderPass({                        // Start a render pass
      colorAttachments: [{
        view: ctx.getCurrentTexture().createView(),            // Current swapchain texture
        loadOp: 'clear',
        clearValue: { r: 0, g: 0, b: 0, a: 1 },                // Clear to opaque black
        storeOp: 'store',
      }],
    });
    pass.setPipeline(pipeline);                                // Bind pipeline
    pass.setVertexBuffer(0, vb);                               // Bind the vertex buffer
    pass.setIndexBuffer(ib, 'uint16');                         // Bind the index buffer
    pass.drawIndexed(6);                                       // Draw 6 indices (2 triangles)
    pass.end();                                                // End the render pass
    device.queue.submit([enc.finish()]);                       // Submit to GPU queue
    requestAnimationFrame(frame);                              // Next frame
  }
  requestAnimationFrame(frame);                                // Kick off rendering
}
