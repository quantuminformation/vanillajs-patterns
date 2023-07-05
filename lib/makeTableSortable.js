/**
 * Function to make a table sortable by clicking its headers.
 * It updates the sorting icon, the sorting direction attribute,
 * and the row colors on every click on a table header.
 */
sortableTable = (hostComponent) => {
    const tableHeaders = hostComponent.querySelectorAll(
        //'th[data-sortable="true"]'
        'th'
    );
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
            let aValue = a.cells[columnIndex].textContent.trim();
            let bValue = b.cells[columnIndex].textContent.trim();

            const isCurrency = aValue.includes("$") || aValue.includes("€") || aValue.includes("£");

            // If values are currencies, strip out non-numeric characters and convert to number
            if (isCurrency) {
                aValue = Number(aValue.replace(/[^0-9.-]+/g,""));
                bValue = Number(bValue.replace(/[^0-9.-]+/g,""));
                return aValue - bValue;
            }

            // Use localeCompare for non-currency data
            return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
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