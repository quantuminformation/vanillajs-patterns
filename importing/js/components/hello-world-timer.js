// File: js/components/hello-world-timer.js
// Purpose: This component displays the current time and updates it every second.

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
