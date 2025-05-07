type CSVData = {
  headers: string[];
  rows: (string | number)[][];
};

export function exportToCSV(data: CSVData, filename: string) {
  const csvRows = [data.headers];
  csvRows.push(...data.rows);
  
  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}