export interface PaginationProps {
   totalPages: number;
   total: number;
   page: string;
   searchParams: {
      keyword: string;
      reversed: string;
   };
}
