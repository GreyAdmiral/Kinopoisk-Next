import type { PropsWithChildren, ReactNode } from 'react';

export type Props = {
   params: {
      page: string;
      id: string;
   };
};

export type GetMovieProps = {
   id: string;
};

export interface MovieLayoutProps extends PropsWithChildren {
   similars: ReactNode;
   sequels: ReactNode;
}
