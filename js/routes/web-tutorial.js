export default async function WebGPUFlatSquare(host) {
  host.style.cssText = 'position:fixed;left:0;right:0;top:0;bottom:0;margin:0;overflow:hidden;background:#000';
  host.replaceChildren();

  const canvas = Object.assign(document.createElement('canvas'), {
    style: 'position:absolute;inset:0;width:100%;height:100%;cursor:default;',
  });
  host.appendChild(canvas);

  if (!navigator.gpu) return alert('WebGPU not supported');
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) return alert('No GPU adapter available');
  const device = await adapter.requestDevice();
  const ctx = canvas.getContext('webgpu');
  const format = navigator.gpu.getPreferredCanvasFormat();

  const resize = () => {
    const dpr = devicePixelRatio;
    canvas.width = host.clientWidth * dpr;
    canvas.height = host.clientHeight * dpr;
    ctx.configure({
      device,
      format,
      alphaMode: 'premultiplied',
      size: [canvas.width, canvas.height],
    });
  };
  resize();
  addEventListener('resize', resize);

  const wgsl = `
    struct VertexInput {
      @location(0) position: vec3<f32>,
      @location(1) color: vec3<f32>,
    };

    struct VertexOutput {
      @builtin(position) Position: vec4<f32>,
      @location(0) fragColor: vec3<f32>,
    };

    @vertex
    fn vs_main(input: VertexInput) -> VertexOutput {
      var out: VertexOutput;
      out.Position = vec4(input.position, 1.0);
      out.fragColor = input.color;
      return out;
    }

    @fragment
    fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
      return vec4(in.fragColor, 1.0);
    }
  `;
  const mod = device.createShaderModule({ code: wgsl });

  // Scale square to 25% of viewport (0.5 NDC width/height)
  const size = 0.5;
  const squareVerts = new Float32Array([
    // x, y, z       r, g, b
    -size, -size, 0,   0, 1, 1,
    size, -size, 0,   0, 1, 1,
    size,  size, 0,   0, 1, 1,
    -size,  size, 0,   0, 1, 1,
  ]);
  const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

  const vb = device.createBuffer({
    size: squareVerts.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vb, 0, squareVerts);

  const ib = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(ib, 0, indices);

  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: mod,
      entryPoint: 'vs_main',
      buffers: [{
        arrayStride: 24,
        attributes: [
          { shaderLocation: 0, offset: 0, format: 'float32x3' },
          { shaderLocation: 1, offset: 12, format: 'float32x3' },
        ],
      }],
    },
    fragment: {
      module: mod,
      entryPoint: 'fs_main',
      targets: [{ format }],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'none',
    },
  });

  function frame() {
    const enc = device.createCommandEncoder();
    const pass = enc.beginRenderPass({
      colorAttachments: [{
        view: ctx.getCurrentTexture().createView(),
        loadOp: 'clear',
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        storeOp: 'store',
      }],
    });
    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, vb);
    pass.setIndexBuffer(ib, 'uint16');
    pass.drawIndexed(6);
    pass.end();
    device.queue.submit([enc.finish()]);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
