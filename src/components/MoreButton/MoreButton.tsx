'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { loadHomeMovies } from '@actions/loadHomeMovies';
import { ErrorComponent } from '@components/ErrorComponent/ErrorComponent';
import { LoadedComponent } from '@components/LoadedComponent/LoadedComponent';
import { Loader } from '@components/Loader/Loader';
import { Movie } from '@components/Movie/Movie';
import { prepareMovies } from '@tools/prepareMovies';
import type { MovieProps } from '@typesfolder/types';

import styles from './MoreButton.module.scss';
import type { MoreButtonProps } from './types';

export const MoreButton: FC<MoreButtonProps> = ({ page, totalPages, searchParams, initMovies }) => {
   const BUTTON_TITLE = 'Загрузить еще';
   const LOADING_BUTTON_TITLE = 'Загрузка...';
   const { keyword = '', reversed = '', sorted = '' } = searchParams;

   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [activePage, setActivePage] = useState<number>(page ?? 1);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const canLoadMore = activePage < totalPages;
   const hasMovies = movies.length > 0;
   const isContent = !error && hasMovies;

   const moreButtonClickHandler = useCallback(async () => {
      const nextPage = activePage + 1;
      if (nextPage > totalPages) return;

      setIsLoading(true);

      try {
         const data = await loadHomeMovies(nextPage, keyword);
         if (data.error) throw data.error;
         const prepared = prepareMovies(data.items, { sorted, reversed });

         setMovies((prev) => [...prev, ...prepared]);
         setActivePage(nextPage);
      } catch (err) {
         console.error(err);
         setError(err as string);
      } finally {
         setIsLoading(false);
      }
   }, [activePage, totalPages, keyword, sorted, reversed]);

   useEffect(() => {
      setMovies(initMovies ?? []);
   }, []);

   return (
      <>
         {isContent && movies.map((movie, idx) => <Movie key={`${movie.kinopoiskId}-${idx}`} movie={movie} />)}
         <LoadedComponent />

         {canLoadMore && isContent && (
            <div className={styles.more}>
               <button className={styles.more_button} onClick={moreButtonClickHandler} disabled={isLoading}>
                  {isLoading ? LOADING_BUTTON_TITLE : BUTTON_TITLE}
               </button>
            </div>
         )}

         {canLoadMore && !isContent && (
            <div className={styles.more_loader}>
               <Loader />
            </div>
         )}

         {error && !isLoading && <ErrorComponent message={error} />}
      </>
   );
};
