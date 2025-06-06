'use client';
import { useEffect, useState } from 'react';
import { Movie } from '@components/Movie/Movie';
import { Loader } from '@components/Loader/Loader';
import { getCensoredFilms } from '@tools/getCensoredFilms';
import { getSortedMovies } from '@tools/getSortedMovies';
import { Services } from '@services/Kinopoisk';
import type { FC } from 'react';
import type { MovieProps, SortedMethod } from '@typesfolder/types';
import type { MoreButtonProps } from './types';
import styles from './MoreButton.module.scss';
import { LoadedComponent } from '@/components/LoadedComponent/LoadedComponent';

export const MoreButton: FC<MoreButtonProps> = ({ page, totalPages, searchParams }) => {
   const { keyword = '', reversed = '', sorted = '' } = searchParams;
   const buttonTitle = 'Загрузить еще';
   const loadingButtonTitle = 'Загрузка...';
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [activePage, setActivePage] = useState<number>(+page);
   const [prevReversed, setPrevReversed] = useState<boolean>(Boolean(sorted));
   const [prevSorted, setPrevSorted] = useState<SortedMethod | string>(sorted);
   const [prevKeyword, setPrevKeyword] = useState<string>(keyword);

   const moreButtonClickHandler = () => {
      if (activePage && activePage < totalPages) {
         setActivePage(activePage + 1);
      }
   };

   useEffect(() => {
      document.documentElement.toggleAttribute('data-submite', isLoading);
   }, [isLoading]);

   useEffect(() => {
      const isReversed = Boolean(reversed);
      const ifChangeReverse = prevReversed !== isReversed;

      if (ifChangeReverse) {
         setMovies((state) => [...state.reverse()]);
         setPrevReversed(isReversed);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [reversed]);

   useEffect(() => {
      const ifChangeSortedMethod = prevSorted !== sorted;

      if (ifChangeSortedMethod) {
         setMovies((state) => [...getSortedMovies({ method: sorted as SortedMethod, movies: state })]);
         setPrevSorted(sorted);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sorted]);

   useEffect(() => {
      let isCancelled = false;

      if (activePage > 0 && activePage <= totalPages) {
         setIsLoading(true);

         if (keyword !== prevKeyword) {
            setActivePage(1);
         }

         Services.getMovies(`${activePage}`, keyword)
            .then((data) => {
               let { items: movies } = data;

               movies = getCensoredFilms(movies);

               if (sorted) {
                  movies = getSortedMovies({ method: sorted, movies: movies });
               }

               if (reversed) {
                  movies.reverse();
               }

               if (!isCancelled) {
                  setMovies((state) => {
                     if (activePage === 1 || keyword !== prevKeyword) {
                        return [...movies];
                     } else {
                        return [...state, ...movies];
                     }
                  });

                  if (keyword !== prevKeyword) {
                     setPrevKeyword(keyword);
                  }
               }
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

         <LoadedComponent />

         {activePage && activePage < totalPages && Boolean(movies.length) && (
            <div className={styles.more}>
               <button className={styles.more_button} onClick={moreButtonClickHandler} {...(isLoading ? { disabled: true } : {})}>
                  {isLoading ? loadingButtonTitle : buttonTitle}
               </button>
            </div>
         )}

         {activePage && activePage < totalPages && !movies.length && (
            <div className={styles.more_loader}>
               <Loader />
            </div>
         )}
      </>
   );
};
