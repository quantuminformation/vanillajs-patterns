// File: js/components/webgpu-spinning-cube.js
/**
 * Spinning 5 m cube above a STATIC Tron-style grid.
 * Canvas *always* fills the strip between header & footer.
 *
 * ▶ CLICK canvas → pointer-lock
 *   • Mouse / track-pad / ← → ↑ ↓  → look around (yaw / pitch)
 *   • W / S                     → move fwd / back (fly)
 *   • A / D                     → strafe left / right
 * ▶ F = full-screen toggle
 * ◀ ESC releases pointer-lock
 *
 * Sliders
 *  • Grid size  (0 – 1000 m)
 *  • Camera height (0 – 100 m)
 *  • Move speed  (0 – 50 m s⁻¹)
 */
export default async function WebGPUSpinningCube(host) {
  /* ───────────────────────── 1 · LAYOUT ───────────────────────── */
  const setHostFrame = () => {
    const h = document.querySelector('nav[data-component="nav"]')?.getBoundingClientRect().height ?? 0;
    const f = document.querySelector('footer')?.getBoundingClientRect().height ?? 0;
    host.style.top = h + 'px';
    host.style.bottom = f + 'px';
  };
  host.style.position = 'fixed';
  host.style.left = host.style.right = '0';
  host.style.background = '#000';
  host.style.margin = '0';
  host.style.overflow = 'hidden';
  setHostFrame();
  ['resize', 'orientationchange', 'fullscreenchange'].forEach((ev) => addEventListener(ev, setHostFrame));

  /* remove any width/height that the router left inline */
  host.style.removeProperty('width');
  host.style.removeProperty('height');

  /* ───────────────────────── 2 · CANVAS & UI ──────────────────── */
  const canvas = Object.assign(document.createElement('canvas'), {
    style: 'position:absolute;inset:0;width:100%;height:100%;cursor:pointer;',
  });
  const hud = Object.assign(document.createElement('div'), {
    style:
      'position:absolute;top:1rem;left:1rem;z-index:2;color:#0af;font-family:monospace;white-space:pre;pointer-events:none',
    textContent: 'Click to lock & control',
  });
  const ui = Object.assign(document.createElement('div'), {
    style:
      'position:absolute;top:1rem;right:1rem;z-index:2;color:#fff;font-family:sans-serif;background:rgba(0,0,0,.45);padding:.5rem;border-radius:.5rem;text-align:right',
  });
  ui.innerHTML = `
    <label>Grid size (m): <input id="gridSize"  type="range" min="0"  max="1000" value="100"></label><br>
    <label>Camera height (m): <input id="camHeight" type="range" min="0"  max="100"  value="1.6" step="0.1"></label><br>
    <label>Move speed (m/s):  <input id="moveSpeed" type="range" min="0"  max="50"   value="10"  step="0.1"></label><br>
    <button id="fsBtn">Full Screen (F)</button>
  `;
  host.replaceChildren(canvas, hud, ui);
  const gridSlider = ui.querySelector('#gridSize');
  const heightSlider = ui.querySelector('#camHeight');
  const speedSlider = ui.querySelector('#moveSpeed');
  const fsBtn = ui.querySelector('#fsBtn');

  fsBtn.onclick = () => (document.fullscreenElement ? document.exitFullscreen() : host.requestFullscreen());
  addEventListener('keydown', (e) => {
    if (e.code === 'KeyF') fsBtn.click();
  });

  /* ───────────────────────── 3 · WEBGPU INIT ──────────────────── */
  if (!navigator.gpu) {
    hud.textContent = 'WebGPU not supported';
    return;
  }
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    hud.textContent = 'GPU adapter unavailable';
    return;
  }
  const device = await adapter.requestDevice();
  const ctx = canvas.getContext('webgpu');
  const format = navigator.gpu.getPreferredCanvasFormat();

  const configCanvas = () => {
    const dpr = devicePixelRatio;
    canvas.width = host.clientWidth * dpr;
    canvas.height = host.clientHeight * dpr;
    ctx.configure({ device, format, alphaMode: 'premultiplied', size: [canvas.width, canvas.height] });
  };
  ['resize', 'orientationchange', 'fullscreenchange'].forEach((ev) => addEventListener(ev, configCanvas));
  configCanvas();

  /* ───────────────────────── 4 · SHADER / GEO ─────────────────── */
  const wgsl = await (await fetch('/wgsl/spinning-cube.wgsl')).text();
  const mod = device.createShaderModule({ code: wgsl });

  const cubeV = new Float32Array([
    -1, -1, -1, 1, 0, 0, 1, -1, -1, 0, 1, 0, 1, 1, -1, 0, 0, 1, -1, 1, -1, 1, 1, 0, -1, -1, 1, 1, 0, 1, 1, -1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 0, 0, 0,
  ]);
  const cubeI = new Uint16Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 1, 5, 0, 5, 4, 2, 3, 7, 2, 7, 6, 0, 3, 7, 0, 7, 4, 1, 2, 6, 1, 6,
    5,
  ]);
  const cubeVB = device.createBuffer({
    size: cubeV.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  const cubeIB = device.createBuffer({
    size: cubeI.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(cubeVB, 0, cubeV);
  device.queue.writeBuffer(cubeIB, 0, cubeI);

  /* ───────────────────────── 5 · UNIFORMS / PIPELINES ─────────── */
  const ubGrid = device.createBuffer({ size: 64, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
  const ubCube = device.createBuffer({ size: 64, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
  const bgl = device.createBindGroupLayout({
    entries: [{ binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }],
  });
  const layout = device.createPipelineLayout({ bindGroupLayouts: [bgl] });
  const bgGrid = device.createBindGroup({
    layout: bgl,
    entries: [{ binding: 0, resource: { buffer: ubGrid } }],
  });
  const bgCube = device.createBindGroup({
    layout: bgl,
    entries: [{ binding: 0, resource: { buffer: ubCube } }],
  });

  const vert = {
    module: mod,
    entryPoint: 'vs_main',
    buffers: [
      {
        arrayStride: 24,
        attributes: [
          { shaderLocation: 0, offset: 0, format: 'float32x3' },
          { shaderLocation: 1, offset: 12, format: 'float32x3' },
        ],
      },
    ],
  };
  const cubePipe = device.createRenderPipeline({
    layout,
    vertex: vert,
    fragment: { module: mod, entryPoint: 'fs_main', targets: [{ format }] },
    primitive: { topology: 'triangle-list', cullMode: 'back' },
    depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' },
  });
  const gridPipe = device.createRenderPipeline({
    layout,
    vertex: vert,
    fragment: { module: mod, entryPoint: 'fs_main', targets: [{ format }] },
    primitive: { topology: 'line-list' },
    depthStencil: { format: 'depth24plus', depthWriteEnabled: false, depthCompare: 'less' },
  });
  let depth = device.createTexture({
    size: [canvas.width, canvas.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  /* ───────────────────────── 6 · MATH ─────────────────────────── */
  const M4 = {
    persp: (f, ar, n, fa) => {
      const t = 1 / Math.tan(f / 2),
        d = 1 / (n - fa);
      return new Float32Array([t / ar, 0, 0, 0, 0, t, 0, 0, 0, 0, (fa + n) * d, -1, 0, 0, 2 * fa * n * d, 0]);
    },
    T: (x, y, z) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]),
    Rx: (a) => {
      const c = Math.cos(a),
        s = Math.sin(a);
      return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
    },
    Ry: (a) => {
      const c = Math.cos(a),
        s = Math.sin(a);
      return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
    },
    mul: (A, B) => {
      const r = new Float32Array(16);
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
          let s = 0;
          for (let k = 0; k < 4; k++) s += A[k * 4 + j] * B[i * 4 + k];
          r[i * 4 + j] = s;
        }
      return r;
    },
  };

  /* ───────────────────────── 7 · GRID VBO ─────────────────────── */
  let gridVB = null,
    gridSegs = 0;
  const rebuildGrid = (ext) => {
    const step = 2,
      v = [];
    for (let z = -ext; z <= ext; z += step) v.push(-ext, 0, z, 0, 0.7, 1, ext, 0, z, 0, 0.7, 1);
    for (let x = -ext; x <= ext; x += step) v.push(x, 0, -ext, 0, 0.7, 1, x, 0, ext, 0, 0.7, 1);
    const arr = new Float32Array(v);
    gridSegs = arr.length / 6;
    gridVB?.destroy?.();
    gridVB = device.createBuffer({
      size: arr.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(gridVB, 0, arr);
  };
  rebuildGrid(+gridSlider.value);
  gridSlider.oninput = () => rebuildGrid(+gridSlider.value);

  /* ───────────────────────── 8 · CAMERA & INPUT ───────────────── */
  const cam = { pos: [0, +heightSlider.value, 30], yaw: 0, pitch: 0, speed: +speedSlider.value };
  heightSlider.oninput = () => (cam.pos[1] = +heightSlider.value);
  speedSlider.oninput = () => (cam.speed = +speedSlider.value);
  const keys = {};
  addEventListener('keydown', (e) => {
    if (document.pointerLockElement === canvas) e.preventDefault();
    keys[e.code] = true;
  });
  addEventListener('keyup', (e) => (keys[e.code] = false));

  canvas.onclick = () => canvas.requestPointerLock();
  addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === canvas) {
      const sens = 0.002;
      cam.yaw -= e.movementX * sens;
      cam.pitch -= e.movementY * sens;
      cam.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cam.pitch));
    }
  });
  document.addEventListener('pointerlockchange', () => {
    hud.textContent = document.pointerLockElement === canvas ? 'Esc to release' : 'Click to lock & control';
  });

  /* ───────────────────────── 9 · MAIN LOOP ───────────────────── */
  const cubeScale = new Float32Array([2.5, 0, 0, 0, 0, 2.5, 0, 0, 0, 0, 2.5, 0, 0, 0, 0, 1]);
  let prev = 0;
  function loop(t) {
    const dt = (t - prev) / 1000;
    prev = t;

    if (depth.width !== canvas.width || depth.height !== canvas.height) {
      depth.destroy();
      depth = device.createTexture({
        size: [canvas.width, canvas.height],
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
      });
    }

    /* movement (fly) */
    if (document.pointerLockElement === canvas) {
      /* look with arrow keys too */
      const lr = 1.5 * dt;
      if (keys.ArrowLeft) cam.yaw += lr;
      if (keys.ArrowRight) cam.yaw -= lr;
      if (keys.ArrowUp) cam.pitch += lr;
      if (keys.ArrowDown) cam.pitch -= lr;
      cam.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cam.pitch));

      /* WASD fly */
      let forward = 0,
        strafe = 0;
      if (keys.KeyW) forward += 1;
      if (keys.KeyS) forward -= 1;
      if (keys.KeyA) strafe -= 1;
      if (keys.KeyD) strafe += 1;
      if (forward || strafe) {
        const len = Math.hypot(forward, strafe);
        if (len) {
          forward /= len;
          strafe /= len;
        }

        // forward vector
        const fx = Math.sin(cam.yaw) * Math.cos(cam.pitch),
          fy = -Math.sin(cam.pitch),
          fz = Math.cos(cam.yaw) * Math.cos(cam.pitch);
        // right vector (horizontal)
        const rx = Math.cos(cam.yaw),
          rz = -Math.sin(cam.yaw);

        cam.pos[0] += (fx * forward + rx * strafe) * cam.speed * dt;
        cam.pos[1] += fy * forward * cam.speed * dt;
        cam.pos[2] += (fz * forward + rz * strafe) * cam.speed * dt;
      }
    }

    hud.textContent =
      `Yaw:${cam.yaw.toFixed(2)} Pitch:${cam.pitch.toFixed(2)}\n` +
      `Pos:${cam.pos.map((v) => v.toFixed(1)).join(', ')}  Speed:${cam.speed}`;

    const proj = M4.persp(Math.PI / 4, canvas.width / canvas.height, 0.1, 1000);
    const view = M4.mul(
      M4.Rx(-cam.pitch),
      M4.mul(M4.Ry(-cam.yaw), M4.T(-cam.pos[0], -cam.pos[1], -cam.pos[2])),
    );

    const enc = device.createCommandEncoder();
    const pass = enc.beginRenderPass({
      colorAttachments: [
        {
          view: ctx.getCurrentTexture().createView(),
          loadOp: 'clear',
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          storeOp: 'store',
        },
      ],
      depthStencilAttachment: {
        view: depth.createView(),
        depthLoadOp: 'clear',
        depthClearValue: 1,
        depthStoreOp: 'store',
      },
    });

    device.queue.writeBuffer(ubGrid, 0, M4.mul(proj, view));
    pass.setPipeline(gridPipe);
    pass.setBindGroup(0, bgGrid);
    pass.setVertexBuffer(0, gridVB);
    pass.draw(gridSegs);

    const rot = M4.mul(M4.Ry(t / 1000), M4.Rx(t / 1400));
    const model = M4.mul(rot, cubeScale);
    device.queue.writeBuffer(ubCube, 0, M4.mul(proj, M4.mul(view, model)));
    pass.setPipeline(cubePipe);
    pass.setBindGroup(0, bgCube);
    pass.setVertexBuffer(0, cubeVB);
    pass.setIndexBuffer(cubeIB, 'uint16');
    pass.drawIndexed(cubeI.length);

    pass.end();
    device.queue.submit([enc.finish()]);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
