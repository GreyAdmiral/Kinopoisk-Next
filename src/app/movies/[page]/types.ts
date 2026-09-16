import { SortedMethod } from '@typesfolder/types';

export type Props = {
   params: Promise<{
      page: string;
   }>;
   searchParams: Promise<{
      keyword: string;
      reversed: string;
      sorted: SortedMethod;
   }>;
};
