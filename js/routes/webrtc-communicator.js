// stored in components/webrtc-communicator.js

export default (hostComponent, signalingServerUrl) => {
  let localConnection;
  let sendChannel;

  // Setup the signaling server connection and event handlers
  const signalingSocket = new WebSocket(signalingServerUrl);

  // Handle signaling server messages
  signalingSocket.onmessage = (message) => {
    const data = JSON.parse(message.data);

    switch (data.type) {
      case 'offer':
        handleOffer(data.offer);
        break;
      case 'answer':
        handleAnswer(data.answer);
        break;
      case 'candidate':
        handleCandidate(data.candidate);
        break;
      // Add additional case handlers if necessary
    }
  };

  // Initialize WebRTC peer connection
  const setupWebRTCConnection = () => {
    localConnection = new RTCPeerConnection();

    // Create a data channel for sending messages
    sendChannel = localConnection.createDataChannel('sendChannel');
    sendChannel.onopen = handleSendChannelStatusChange;
    sendChannel.onclose = handleSendChannelStatusChange;

    // Listen for remote ICE candidates
    localConnection.onicecandidate = (event) => {
      if (event.candidate) {
        signalingSocket.send(JSON.stringify({ candidate: event.candidate }));
      }
    };
  };

  // Send messages through the data channel
  const sendMessage = (message) => {
    sendChannel.send(message);
  };

  // Create offer
  const createOffer = async () => {
    const offer = await localConnection.createOffer();
    await localConnection.setLocalDescription(offer);
    signalingSocket.send(JSON.stringify({ offer: offer }));
  };

  // Handle incoming offer
  const handleOffer = async (offer) => {
    await localConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await localConnection.createAnswer();
    await localConnection.setLocalDescription(answer);
    signalingSocket.send(JSON.stringify({ answer: answer }));
  };

  // Handle incoming answer
  const handleAnswer = async (answer) => {
    await localConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  // Handle incoming ICE candidate
  const handleCandidate = async (candidate) => {
    await localConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const handleSendChannelStatusChange = (event) => {
    if (sendChannel) {
      const state = sendChannel.readyState;

      if (state === 'open') {
        // The send channel is open and ready to send messages
      } else {
        // The send channel is closed or not yet open
      }
    }
  };

  // Initialize the WebRTC connection setup
  setupWebRTCConnection();

  return {
    sendMessage,
    createOffer,
    // You can expose other functionalities as needed
  };
};
