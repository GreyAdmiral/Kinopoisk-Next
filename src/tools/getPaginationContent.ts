export function getPaginationContent(currentPage: number, totalPages: number) {
   const firstPage = 1;
   const lastPage = totalPages;

   if (lastPage <= 7) {
      return Array.from({ length: lastPage }, (_, index) => index + 1);
   }

   if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, 'dots', lastPage];
   }

   if (currentPage >= lastPage - 2) {
      return [firstPage, 'dots', lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
   }

   return [firstPage, 'dots', currentPage - 1, currentPage, currentPage + 1, 'dots', lastPage];
}
