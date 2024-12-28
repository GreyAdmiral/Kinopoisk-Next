import type { MoviesCardProps } from './types';
import styles from './MoviesCard.module.scss';

export const MoviesCard = ({ className, children }: MoviesCardProps) => {
   return <div className={className ? `${styles.movies_card} ${className}` : styles.movies_card}>{children}</div>;
};
