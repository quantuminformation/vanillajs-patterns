export default (hostComponent) => {
  const container = document.createElement('div');
  container.className = 'subscribe-container';

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <form
      action="https://buttondown.com/api/emails/embed-subscribe/nkatsikanis"
      method="post"
      target="popupwindow"
      onsubmit="window.open('https://buttondown.com/nkatsikanis', 'popupwindow')"
      class="embeddable-buttondown-form"
    >
      <label for="bd-email">Enter your email</label>
      <input type="email" name="email" id="bd-email" />
      <input type="submit" value="Subscribe" />
      <p>
        <a href="https://buttondown.com/refer/nkatsikanis" target="_blank">Powered by Buttondown.</a>
      </p>
    </form>
  `;
  const formEl = wrapper.firstElementChild;

  const supportsNotifications =
    'Notification' in window &&
    !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (supportsNotifications) {
    const notifBtn = document.createElement('button');
    notifBtn.className = 'wireframe';

    function updateText() {
      if (localStorage.getItem('notify-blog') === 'true') {
        notifBtn.textContent = 'Thanks for enabling notifications';
      } else {
        notifBtn.textContent = 'Enable Notifications';
      }
    }

    updateText();

    notifBtn.addEventListener('click', async () => {
      if (localStorage.getItem('notify-blog') === 'true') {
        localStorage.removeItem('notify-blog');
        updateText();
        return;
      }

      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        localStorage.setItem('notify-blog', 'true');
        updateText();
      }
    });

    container.append(notifBtn, formEl);
  } else {
    container.appendChild(formEl);
  }

  hostComponent.appendChild(container);
};
