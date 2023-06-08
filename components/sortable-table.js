export default (hostComponent) => {
  const tableHeaders = hostComponent.querySelectorAll('th[data-sortable="true"]');
  tableHeaders.forEach((header) => {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const iconWrapper = document.createElement('span');

    header.addEventListener('click', () => {
      sortTable(header);
      updateIcon(header);
      updateRowColors(hostComponent);
    });
    header.style.cursor = 'pointer';
    header.setAttribute('data-sort-direction', 'asc');

    icon.setAttribute('class', 'h-4 w-4 inline-block ml-1');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('stroke', 'currentColor');
    iconPath.setAttribute('stroke-linecap', 'round');
    iconPath.setAttribute('stroke-linejoin', 'round');
    iconPath.setAttribute('stroke-width', '2');
    icon.appendChild(iconPath);
    iconWrapper.appendChild(icon);
    header.appendChild(iconWrapper);
  });

  const sortTable = (header) => {
    const columnIndex = header.cellIndex;
    const sortDirection = header.getAttribute('data-sort-direction');
    const tbody = hostComponent.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      const aValue = a.cells[columnIndex].textContent.trim();
      const bValue = b.cells[columnIndex].textContent.trim();
      return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
    });

    if (sortDirection === 'asc') {
      rows.reverse();
      header.setAttribute('data-sort-direction', 'desc');
    } else {
      header.setAttribute('data-sort-direction', 'asc');
    }

    rows.forEach((row) => tbody.appendChild(row));
  };

  const updateIcon = (header) => {
    const icon = header.querySelector('svg');
    const sortDirection = header.getAttribute('data-sort-direction');
    const iconPath = icon.querySelector('path');
    iconPath.setAttribute('d', sortDirection === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7');
  };

  const updateRowColors = (hostComponent) => {
    const tableRows = hostComponent.querySelectorAll('tbody tr');
    tableRows.forEach((row, index) => {
      row.classList.toggle('bg-gray-100', index % 2 === 0);
    });
  };

  updateRowColors(hostComponent);
};
