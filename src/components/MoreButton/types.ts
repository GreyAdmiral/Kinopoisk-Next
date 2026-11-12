import { MovieProps, SortedMethod } from '@typesfolder/types';

export interface MoreButtonProps {
   initMovies: MovieProps[];
   page: number;
   totalPages: number;
   searchParams: {
      keyword: string;
      reversed: string;
      sorted: SortedMethod;
   };
}
