import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import type { MovieLayoutProps } from './types';
// import styles from './layout.module.scss';

export default function MovieLayout({ children, similars, sequels }: MovieLayoutProps) {
   return (
      <MoviesCard>
         {children}
         {sequels}
         {similars}
      </MoviesCard>
   );
}
