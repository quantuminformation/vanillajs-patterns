// File: js/routes/web-tutorial.js
// Draw a 25 % cyan square; header & footer remain visible.
// Works by relying 100 % on flex-layout (no manual pixel math).

import { loadShader } from '../utils/shaderLoader.js'; // Import helper to load WGSL shader from file

export default async function WebGPUFlatSquare(host) {
  /* ───────────── 1 · LAYOUT (pure flex, no calculations) ───────────── */
  host.replaceChildren(); // Clear any children in the host container
  host.style.cssText = // Style host to expand in flex and contain an absolutely positioned canvas
      'flex:1 0 auto; position:relative; overflow:hidden; background:#000; margin:0; padding:0;';

  const canvas = Object.assign(document.createElement('canvas'), { // Create a canvas and style it
    style: 'position:absolute; width:100%; height:100%; cursor:default;',
  });
  host.appendChild(canvas); // Add canvas to host

  /* ───────────── 2 · WEBGPU INIT ───────────── */
  if (!navigator.gpu) return alert('WebGPU not supported'); // Abort if WebGPU is not available
  const adapter = await navigator.gpu.requestAdapter(); // Request GPU adapter
  if (!adapter) return alert('No GPU adapter available'); // Abort if adapter fails
  const device  = await adapter.requestDevice(); // Get logical GPU device
  const ctx     = canvas.getContext('webgpu'); // Get WebGPU rendering context from canvas
  const format  = navigator.gpu.getPreferredCanvasFormat(); // Get preferred texture format

  const resize = () => { // Resize canvas to match display resolution and DPR
    const dpr = devicePixelRatio; // Get device pixel ratio
    canvas.width  = host.clientWidth  * dpr; // Set canvas width in physical pixels
    canvas.height = host.clientHeight * dpr; // Set canvas height in physical pixels
    ctx.configure({ device, format, alphaMode:'premultiplied', size:[canvas.width, canvas.height] }); // Reconfigure context
  };
  resize(); // Run resize initially
  addEventListener('resize', resize); // React to window resizes

  /* ───────────── 3 · SHADER & GEOMETRY ───────────── */
  const wgsl   = await loadShader('square-flat.wgsl'); // Load shader source from file
  const module = device.createShaderModule({ code: wgsl }); // Create shader module from WGSL code

  const s = 0.5; // Half-size (0.5 in NDC space) for a centered square
  const vertices = new Float32Array([ // Vertex positions and colors
    -s,-s,0,  0,1,1, // Bottom-left
    s,-s,0,  0,1,1, // Bottom-right
    s, s,0,  0,1,1, // Top-right
    -s, s,0,  0,1,1, // Top-left
  ]);
  const indices = new Uint16Array([0,1,2, 0,2,3]); // Two triangles forming a square

  const vb = device.createBuffer({ // Create vertex buffer
    size:vertices.byteLength,
    usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vb,0,vertices); // Upload vertex data to GPU

  const ib = device.createBuffer({ // Create index buffer
    size:indices.byteLength,
    usage:GPUBufferUsage.INDEX |GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(ib,0,indices); // Upload index data to GPU

  const pipeline = device.createRenderPipeline({ // Create the graphics pipeline
    layout:'auto', // Auto-layout for bindings
    vertex:{ // Vertex stage configuration
      module, entryPoint:'vs_main', // Entry point in shader
      buffers:[{ // Vertex layout
        arrayStride:24, // 6 floats per vertex (3 position + 3 color)
        attributes:[
          { shaderLocation:0, offset:0,  format:'float32x3' }, // Position attribute
          { shaderLocation:1, offset:12, format:'float32x3' }, // Color attribute
        ],
      }],
    },
    fragment:{ module, entryPoint:'fs_main', targets:[{ format }] }, // Fragment shader config
    primitive:{ topology:'triangle-list', cullMode:'none' }, // Primitive config: draw triangles, no face culling
  });

  /* ───────────── 4 · RENDER LOOP ───────────── */
  function frame(){ // Render frame
    const enc = device.createCommandEncoder(); // Create GPU command encoder
    const pass = enc.beginRenderPass({ // Start a render pass
      colorAttachments:[{
        view:ctx.getCurrentTexture().createView(), // Render target
        loadOp:'clear', clearValue:{ r:0,g:0,b:0,a:1 }, storeOp:'store', // Clear screen to black
      }],
    });
    pass.setPipeline(pipeline); // Use render pipeline
    pass.setVertexBuffer(0,vb); // Bind vertex buffer
    pass.setIndexBuffer(ib,'uint16'); // Bind index buffer
    pass.drawIndexed(6); // Draw square (2 triangles)
    pass.end(); // End render pass
    device.queue.submit([enc.finish()]); // Submit work to GPU
    requestAnimationFrame(frame); // Schedule next frame
  }
  requestAnimationFrame(frame); // Kick off first frame
}
