export default (hostComponent) => {
  // Get the WebGL context
  const canvas = hostComponent.appendChild(document.createElement('canvas'));
  const gl = canvas.getContext('webgl');

  // Create shaders
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `);
  gl.compileShader(fragmentShader);

  // Create program
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Set up the positions attribute
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    -0.5, 0.5,
    -0.5, 0.5,
    0.5, -0.5,
    0.5, 0.5
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Draw
  const resize = () => {
    canvas.width = hostComponent.clientWidth;
    canvas.height = hostComponent.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  window.addEventListener('resize', resize);
  resize();

  const render = () => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  };
  render();
};
