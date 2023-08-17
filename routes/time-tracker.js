// stored in /routes/time-tracker.js

export default (hostComponent) => {
  // Clear any existing content in the hostComponent
  hostComponent.innerHTML = '';

  // Define the month and year you want to render
  const month = 7; // July
  const year = 2023;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  //@language=HTML
  const indexHTML = `
  <style>
    #calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr); /* 7 columns for 7 days in a week */
      gap: 1rem;
      align-items: center;
    }
    .calendar-heading {
      font-weight: bold;
    }
    @media screen and (max-width: 600px) {
      #calendar-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <h1>${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month))} ${year}</h1>

  <div id="calendar-grid">
    <div class="calendar-heading">Sun</div>
    <div class="calendar-heading">Mon</div>
    <div class="calendar-heading">Tue</div>
    <div class="calendar-heading">Wed</div>
    <div class="calendar-heading">Thu</div>
    <div class="calendar-heading">Fri</div>
    <div class="calendar-heading">Sat</div>
    ${Array(firstDay).fill().map(() => '<div></div>').join('')}
    ${Array(daysInMonth).fill().map((_, i) => `<div>${i + 1}</div>`).join('')}
  </div>
  `;

  // Append the new content to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
