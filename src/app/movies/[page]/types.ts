import { SortedMethod } from '@typesfolder/types';

export type Props = {
   params: {
      page: string;
   };
   searchParams: {
      keyword: string;
      reversed: string;
      sorted: SortedMethod;
   };
};
