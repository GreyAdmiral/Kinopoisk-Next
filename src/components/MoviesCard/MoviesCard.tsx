import type { PropsWithChildren } from 'react';
import styles from './MoviesCard.module.scss';

export const MoviesCard = ({ children }: PropsWithChildren) => {
   return <div className={styles.movies_card}>{children}</div>;
};
