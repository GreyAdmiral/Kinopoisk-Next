'use client';

import type { ChangeEvent, FC } from 'react';
import { useCallback } from 'react';

import { useIsMovieSelected } from '@hooks/useSelectedMovies';
import { selectedMoviesStore } from '@store/selectedMoviesStore';

import styles from './CustomCheckBox.module.scss';
import type { CustomCheckBoxProps } from './types';

export const CustomCheckBox: FC<CustomCheckBoxProps> = ({ movie }) => {
   const checked = useIsMovieSelected(movie.kinopoiskId);
   const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         e.stopPropagation();
         selectedMoviesStore.toggle(movie);
      },
      [movie]
   );

   return (
      <label
         id={`label-${movie.kinopoiskId}`}
         title={checked ? 'Отменить выбор фильма' : 'Выбрать фильм'}
         className={styles.custom_checkbox}
         data-checked={checked || undefined}
         onClick={(e) => e.stopPropagation()}
      >
         <input
            type="checkbox"
            name={String(movie.kinopoiskId)}
            id={`checkbox-${movie.kinopoiskId}`}
            checked={checked}
            onChange={handleChange}
         />
         <span />
      </label>
   );
};
