export default (hostComponent) => {
  const canvas = hostComponent.appendChild(document.createElement('canvas'));
  const gl = canvas.getContext('webgl');

  // Define the positions for the vertices
  const positions = [
    -1.0, -1.0, -5.0,   // Back left
    1.0, -1.0, -5.0,   // Back right
    -1.0, -1.0,  5.0,   // Front left
    1.0, -1.0,  5.0,   // Front right
  ];

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Vertex shader program
  const vsSource = `
    attribute vec3 aVertexPosition;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * vec4(aVertexPosition, 1.0);
    }
  `;

  // Fragment shader program
  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

  // Create shader program
  const shaderProgram = createShaderProgram(gl, vsSource, fsSource);
  gl.useProgram(shaderProgram);

  // Look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  // Set the clear color to black
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Compute the projection matrix
  const fieldOfView = 45 * Math.PI / 180; // in radians
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = perspective(fieldOfView, aspect, zNear, zFar);

  // Set the projection matrix
  const projectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
  gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

  // Draw the road
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

// Function to create shader program
function createShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

// Function to create shader
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// Function to create perspective matrix
function perspective(fieldOfViewInRadians, aspect, near, far) {
  var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
  var rangeInv = 1.0 / (near - far);
  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0
  ];
}
