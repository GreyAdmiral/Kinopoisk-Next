'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Loader } from '@components/Loader/Loader';
import { Movie } from '@components/Movie/Movie';
import { Services } from '@services/Kinopoisk';
import { prepareMovies } from '@tools/prepareMovies';
import type { MovieProps } from '@typesfolder/types';

import { LoadedComponent } from '@/components/LoadedComponent/LoadedComponent';

import styles from './MoreButton.module.scss';
import type { MoreButtonProps } from './types';

const BUTTON_TITLE = 'Загрузить еще';
const LOADING_BUTTON_TITLE = 'Загрузка...';

export const MoreButton: FC<MoreButtonProps> = ({ page, totalPages, searchParams }) => {
   const { keyword = '', reversed = '', sorted = '' } = searchParams;

   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [activePage, setActivePage] = useState<number>(+page);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setMovies([]);
      setActivePage(1);
   }, [keyword, sorted, reversed]);

   useEffect(() => {
      if (activePage < 1 || activePage > totalPages) return;

      const controller = new AbortController();
      setIsLoading(true);

      Services.getMovies(String(activePage), keyword, { signal: controller.signal })
         .then((data) => {
            const prepared = prepareMovies(data.items, { sorted, reversed });
            setMovies((state) => (activePage === 1 ? prepared : [...state, ...prepared]));
         })
         .catch((err: Error) => {
            if (err.name !== 'AbortError') console.error(err.message);
         })
         .finally(() => {
            if (!controller.signal.aborted) setIsLoading(false);
         });

      return () => controller.abort();
   }, [activePage, keyword, sorted, reversed, totalPages]);

   const moreButtonClickHandler = useCallback(() => {
      setActivePage((p) => Math.min(p + 1, totalPages));
   }, [totalPages]);

   const canLoadMore = activePage < totalPages;
   const hasMovies = movies.length > 0;

   return (
      <>
         {movies.map((movie, idx) => (
            <Movie key={`${movie.kinopoiskId}-${idx}`} movie={movie} />
         ))}

         <LoadedComponent />

         {canLoadMore && hasMovies && (
            <div className={styles.more}>
               <button className={styles.more_button} onClick={moreButtonClickHandler} disabled={isLoading}>
                  {isLoading ? LOADING_BUTTON_TITLE : BUTTON_TITLE}
               </button>
            </div>
         )}

         {canLoadMore && !hasMovies && (
            <div className={styles.more_loader}>
               <Loader />
            </div>
         )}
      </>
   );
};
