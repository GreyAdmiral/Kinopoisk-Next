import { SortedMethod } from '@typesfolder/types';

export interface MoreButtonProps {
   page: number;
   totalPages: number;
   searchParams: {
      keyword: string;
      reversed: string;
      sorted: SortedMethod;
   };
}
