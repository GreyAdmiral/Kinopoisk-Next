'use client';
import { useEffect, useState } from 'react';
import { Movie } from '../Movie/Movie';
import { Services } from '@services/Kinopoisk';
import type { FC } from 'react';
import type { MovieProps } from '@typesfolder/types';
import type { MoreButtonProps } from './types';
import styles from './MoreButton.module.scss';

export const MoreButton: FC<MoreButtonProps> = ({ page, totalPages, searchParams }) => {
   const { keyword = '', reversed = '' } = searchParams;
   const buttonTitle = 'Загрузить еще';
   const loadingButtonTitle = 'Загрузка...';
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [activePage, setActivePage] = useState<number>(+page);
   const [prevReversed, setPrevReversed] = useState<boolean>(false);

   const moreButtonClickHandler = () => {
      if (activePage && activePage < totalPages) {
         setActivePage(activePage + 1);
      }
   };

   useEffect(() => {
      const ifChangeReverse = prevReversed !== !!reversed;

      if (ifChangeReverse) {
         setMovies((state) => [...state.reverse()]);
         setPrevReversed(!!reversed);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [reversed]);

   useEffect(() => {
      let isCancelled = false;

      if (activePage > 0 && activePage <= totalPages) {
         setIsLoading(true);

         Services.getMovies(`${activePage}`, keyword)
            .then((data) => {
               const { items: movies } = data;

               if (reversed) {
                  movies.reverse();
               }

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [activePage, keyword, totalPages]);

   return (
      <>
         {movies.map((movie, idx) => (
            <Movie key={`${movie.kinopoiskId}-${idx}`} movie={movie} />
         ))}

         {activePage && activePage < totalPages && (
            <div className={styles.more}>
               <button
                  className={styles.more_button}
                  onClick={moreButtonClickHandler}
                  {...(isLoading ? { disabled: true } : {})}
               >
                  {isLoading ? loadingButtonTitle : buttonTitle}
               </button>
            </div>
         )}
      </>
   );
};
