

/**
 * Function to convert CSV data into a table.
 * It creates a table, headers, and rows based on CSV data and
 * limits the number of rows based on the provided limit.
 *
 * @param {Array} csvData - An array of objects representing the CSV data.
 * @param {number} limit - The maximum number of rows to include in the table.
 * @return {HTMLElement} - The created table element.
 */
csvDataToTable = (csvData, limit) => {
  if (!Array.isArray(csvData)) {
    console.warn('Invalid data format. Data should be an array.');
    return null;
  }

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Apply classes to table
  table.classList.add('w-full', 'overflow-x-auto', 'table-fixed');

  // Extract column names from the first row
  const columnNames = Object.keys(csvData[0]);

  // Create table header row
  const headerRow = document.createElement('tr');
  for (const columnName of columnNames) {
    const th = document.createElement('th');
    th.textContent = columnName;
    // Apply classes to th
    th.classList.add('overflow-hidden', 'overflow-ellipsis');
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body rows
  let rowCount = 0;
  for (const row of csvData) {
    // Break loop if limit is reached
    if (rowCount === limit) {
      break;
    }

    const tr = document.createElement('tr');
    tr.addEventListener('mouseover', () => {
      tr.style.backgroundColor = '#ddd'; // Change to the color you want on mouse over
    });
    tr.addEventListener('mouseout', () => {
      tr.style.backgroundColor = ''; // Change back to original color on mouse out
    });
    for (const columnName of columnNames) {
      const td = document.createElement('td');
      if (row.hasOwnProperty(columnName)) {
        td.textContent = row[columnName];
      } else {
        console.warn(`Invalid data format. Missing attribute '${columnName}' in a row.`);
      }
      // Apply classes to td
      td.classList.add('overflow-hidden', 'overflow-ellipsis');
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    rowCount++; // increment row count
  }
  table.appendChild(tbody);

  return table;
};
