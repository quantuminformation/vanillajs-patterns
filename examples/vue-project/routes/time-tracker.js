export default (hostComponent) => {
  // Clear any existing content in the hostComponent
  hostComponent.innerHTML = '';

  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const browserLocale = navigator.language;

  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(browserLocale, { weekday: 'short' }).format(new Date(1970, 0, i + 1))
  );

  // Breaking up the template into multiple variables
  const styles = `
  <style>
    #calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1rem;
      align-items: center;
    }
    .calendar-heading {
      font-weight: bold;
    }
  </style>
  `;

  const header = `<h1>${new Intl.DateTimeFormat(browserLocale, { month: 'long' }).format(
    currentDate
  )} ${year}</h1>`;

  const weekdaysHTML = weekdays.map((day) => `<div class="calendar-heading">${day}</div>`).join('');

  const emptyDays = Array(firstDay)
    .fill()
    .map(() => '<div></div>')
    .join('');

  const monthDays = Array(daysInMonth)
    .fill()
    .map((_, i) => `<div>${i + 1}</div>`)
    .join('');

  const calendarGrid = `
  <div id="calendar-grid">
    ${weekdaysHTML}
    ${emptyDays}
    ${monthDays}
  </div>
  `;

  const indexHTML = styles + header + calendarGrid;

  hostComponent.innerHTML = indexHTML;
};
