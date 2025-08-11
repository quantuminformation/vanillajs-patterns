// File: routes/contact.js
// Purpose: A simple contact form allowing users to send a message

export default (hostComponent) => {
  hostComponent.innerHTML = '';

  const indexHTML = `
    <h1>Get in Touch</h1>
    <p>I’d love to hear from you! Whether it’s a question, feedback, or just to say hello, drop me a message below and I’ll reply as soon as I can.</p>

    <form
      action="https://formsubmit.co/2e11f6902fdaf5c68eb3324966b05372"
      method="POST"
      class="centered"
      style="margin-top: 2rem;"
    >
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4" required></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  `;

  hostComponent.innerHTML = indexHTML;
};
