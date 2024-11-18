export function downloadCSV(text: string, fileneme: string = 'file') {
   const link = document.createElement('a');
   link.download = `${fileneme}.csv`;
   link.href = URL.createObjectURL(new Blob(['\ufeff', text], { type: 'text/csv;charset=utf-8' }));

   link.click();
   URL.revokeObjectURL(link.href);
}
