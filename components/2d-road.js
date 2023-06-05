export default (hostComponent) => {
  // Create a canvas and get the 2D context
  const canvas = document.createElement('canvas');
  hostComponent.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Function to resize canvas
  const resizeCanvas = () => {
    canvas.width = hostComponent.clientWidth;
    canvas.height = hostComponent.clientHeight;
  }

  // Initially resize the canvas
  resizeCanvas();

  // Resize the canvas whenever the window size changes
  window.addEventListener('resize', resizeCanvas);

  // Draw the initial state of the road
  const drawRoad = (offsetY) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the road
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the road markings
    const markingHeight = 20;
    const markingSpacing = 40;
    const totalMarkings = Math.ceil(canvas.height / (markingHeight + markingSpacing)) + 1;

    ctx.fillStyle = 'white';
    for (let i = 0; i < totalMarkings; i++) {
      const y = i * (markingHeight + markingSpacing) - offsetY;
      ctx.fillRect(canvas.width / 2 - 2, y, 4, markingHeight);
    }
  };

  // Animate the road
  let offsetY = 0;
  const animateRoad = () => {
    drawRoad(offsetY);
    offsetY = (offsetY + 2) % 60; // Increase speed by increasing the '2' here
    requestAnimationFrame(animateRoad);
  };

  // Start the animation
  animateRoad();
};
