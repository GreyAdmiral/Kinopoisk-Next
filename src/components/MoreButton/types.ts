import { SortedMethod } from '@typesfolder/types';

export interface MoreButtonProps {
   page: string;
   totalPages: number;
   searchParams: {
      keyword: string;
      reversed: string;
      sorted: SortedMethod;
   };
}
