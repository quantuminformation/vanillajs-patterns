export default (hostComponent) => {
  const updateCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    hostComponent.innerHTML = currentTime;
  };

  // Update the current time immediately
  updateCurrentTime();

  // Update the current time every second
  setInterval(updateCurrentTime, 1000);
};
