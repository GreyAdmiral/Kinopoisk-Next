import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import type { MovieLayoutProps } from './types';

export default function MovieLayout({ children, similars, sequels }: MovieLayoutProps) {
   return (
      <MoviesCard>
         {children}
         {sequels}
         {similars}
      </MoviesCard>
   );
}
