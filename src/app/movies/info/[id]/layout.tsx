import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import type { PropsWithChildren } from 'react';
// import styles from './layout.module.scss';

export default function MovieLayout({ children }: PropsWithChildren) {
   return <MoviesCard>{children}</MoviesCard>;
}
