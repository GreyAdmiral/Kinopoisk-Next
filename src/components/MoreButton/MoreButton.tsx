'use client';
import { useEffect, useState } from 'react';
import { Movie } from '../Movie/Movie';
import { Services } from '@services/Kinopoisk';
import type { FC } from 'react';
import type { MovieProps } from '@typesfolder/types';
import type { MoreButtonProps } from './types';
import styles from './MoreButton.module.scss';

export const MoreButton: FC<MoreButtonProps> = ({ page, totalPages }) => {
   const buttonTitle = 'Загрузить еще';
   const loadingButtonTitle = 'Загрузка...';
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [activePage, setActivePage] = useState<number>(+page);

   const moreButtonClickHandler = () => {
      if (activePage && activePage < totalPages) {
         setActivePage(activePage + 1);
      }
   };

   useEffect(() => {
      let isCancelled = false;

      if (activePage > 1 && activePage <= totalPages) {
         setIsLoading(true);

         Services.getMovies(`${activePage}`)
            .then((data) => {
               const { items: movies } = data;

               !isCancelled && setMovies((state) => [...state, ...movies]);
            })
            .catch((err: Error) => {
               !isCancelled && console.error(err.message);
            })
            .finally(() => {
               setIsLoading(false);
            });
      }

      return () => {
         isCancelled = true;
      };
   }, [activePage, totalPages]);

   return (
      <>
         {movies.map((movie, idx) => (
            <Movie key={`${movie.kinopoiskId}-${idx}`} movie={movie} />
         ))}

         {activePage && activePage < totalPages && (
            <div className={styles.more}>
               <button className={styles.more_button} onClick={moreButtonClickHandler}>
                  {isLoading ? loadingButtonTitle : buttonTitle}
               </button>
            </div>
         )}
      </>
   );
};
