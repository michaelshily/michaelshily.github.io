// Function to fetch and process the Excel file
function fetchExcel() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'list.xlsx', true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function (e) {
    if (xhr.status === 200) {
      const data = new Uint8Array(xhr.response);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convert worksheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Create HTML table
      const table = document.getElementById('excelTable');
      table.innerHTML = '';

      // Add table headers
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const headers = jsonData[0];
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Add table rows
      const tbody = document.createElement('tbody');
      for (let i = 1; i < jsonData.length; i++) {
        const row = document.createElement('tr');
        const rowData = jsonData[i];
        rowData.forEach(cellData => {
          const td = document.createElement('td');
          td.textContent = cellData;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      }
      table.appendChild(tbody);
    }
  };

  xhr.send();
}

// Call the fetchExcel function to load the data
fetchExcel();
