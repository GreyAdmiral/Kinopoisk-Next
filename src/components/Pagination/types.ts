import { SortedMethod } from '@typesfolder/types';

export interface PaginationProps {
   totalPages: number;
   page: number;
   searchParams: {
      keyword: string;
      reversed: string;
      sorted: SortedMethod;
   };
}
