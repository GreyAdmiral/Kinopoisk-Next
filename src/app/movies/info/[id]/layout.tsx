import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import type { MovieLayoutProps } from './types';

export default function MovieLayout({ children, similars, sequels, reviews }: MovieLayoutProps) {
   return (
      <MoviesCard>
         {children}
         {sequels}
         {similars}
         {reviews}
      </MoviesCard>
   );
}
