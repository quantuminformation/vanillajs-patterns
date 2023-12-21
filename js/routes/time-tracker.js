// stored in /js/routes/time-tracker.js

export default (hostComponent) => {
  let currentDate = new Date();

  const updateCalendar = (hostComponent, currentDate) => {
    hostComponent.innerHTML = ''; // Clear any existing content

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Calculate the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get browser's locale for formatting
    const browserLocale = navigator.language;

    // Generate weekdays based on the locale, starting with Sunday
    const weekdays = [...Array(7).keys()].map((i) =>
      new Intl.DateTimeFormat(browserLocale, { weekday: 'short' }).format(new Date(1970, 0, i + 4))
    );

    // Styles
    const styles = `
    <style>
      #calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        text-align: center;
      }
      .calendar-heading {
        font-weight: bold;
        padding-bottom: 5px;
      }
      .day-cell {
        padding: 5px;
        transition: background-color 0.3s;
      }
      .day-cell.today {
        border: 2px solid #ff0000; /* Highlight today's date */
      }
      .calendar-nav {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    </style>
    `;

    // Navigation
    const nav = `
      <div class="calendar-nav">
        <button id="prev-month">&lt; Prev</button>
        <strong>${new Intl.DateTimeFormat(browserLocale, { month: 'long' }).format(
          currentDate
        )} ${year}</strong>
        <button id="next-month">Next &gt;</button>
      </div>
    `;

    // Weekday headers
    const weekdaysHeader = weekdays.map((day) => `<div class="calendar-heading">${day}</div>`).join('');

    // Empty cells before the first day of the month
    const emptyCells = Array.from({ length: firstDayOfMonth })
      .map(() => '<div class="day-cell"></div>')
      .join('');

    // Day cells for the month
    const daysCells = Array.from({ length: daysInMonth })
      .map((_, i) => {
        const day = i + 1;
        const isToday =
          day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
            ? 'today'
            : '';
        return `<div class="day-cell ${isToday}">${day}</div>`;
      })
      .join('');

    // Full grid
    const calendarGrid = `<div id="calendar-grid">${weekdaysHeader}${emptyCells}${daysCells}</div>`;

    // Combine all parts and set as innerHTML of the host component
    hostComponent.innerHTML = `${styles}${nav}${calendarGrid}`;

    // Add event listeners for navigation
    document.getElementById('prev-month').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar(hostComponent, currentDate);
    });

    document.getElementById('next-month').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar(hostComponent, currentDate);
    });
  };

  updateCalendar(hostComponent, currentDate);
};
