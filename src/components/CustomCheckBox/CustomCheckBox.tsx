'use client';
import { useEffect, useRef, useState } from 'react';
import { useSessionStorageSync } from '@hooks/useSessionStorageSync';
import { getSelectedInfo } from '@tools/getSelectedInfo';
import { getSavedMovies } from '@tools/getSavedMovies';
import type { FC, ChangeEvent } from 'react';
import type { CustomCheckBoxProps } from './types';
import type { SelectedMovie } from '@typesfolder/types';
import styles from './CustomCheckBox.module.scss';

export const CustomCheckBox: FC<CustomCheckBoxProps> = ({ movie }) => {
   const [selectedMovies, setSelectedMovies] = useSessionStorageSync('selectedMovies', JSON.stringify([]));
   const [isChecked, setIsChecked] = useState<boolean>(
      JSON.parse(selectedMovies).some(([, m]: [unknown, SelectedMovie]) => m.id === movie.kinopoiskId)
   );
   const inputRef = useRef<HTMLLabelElement>(null);

   function checkBoxHandler(e: ChangeEvent) {
      e.stopPropagation();

      setIsChecked((state) => !state);
   }

   useEffect(() => {
      const { current } = inputRef;

      function resetHandler(e: Event) {
         e.stopPropagation();

         setIsChecked(false);
      }

      current?.addEventListener('ResetAllCheckbox', resetHandler);

      return () => {
         current?.removeEventListener('ResetAllCheckbox', resetHandler);
      };
   }, []);

   useEffect(() => {
      const savedMovies: Array<[string, SelectedMovie]> = getSavedMovies('selectedMovies');
      const savedMoviesMap = savedMovies.length ? new Map(savedMovies) : new Map();
      inputRef.current?.toggleAttribute('data-checked', isChecked);

      if (isChecked) {
         savedMoviesMap.set(movie.kinopoiskId, getSelectedInfo(movie));
      } else {
         savedMoviesMap.delete(movie.kinopoiskId);
      }

      const moviesString = [...savedMoviesMap.entries()];
      setSelectedMovies(JSON.stringify(moviesString));
      document.body.dispatchEvent(new CustomEvent('FilmsChoice', { detail: moviesString }));
   }, [isChecked, movie, setSelectedMovies]);

   return (
      <label
         ref={inputRef}
         id={`label-${movie.kinopoiskId}`}
         title={isChecked ? 'Отменить выбор фильма' : 'Выбрать фильм'}
         className={styles.custom_checkbox}
         onClick={(e) => {
            e.stopPropagation();
         }}
      >
         <input
            type="checkbox"
            name={movie.kinopoiskId}
            id={`checkbox-${movie.kinopoiskId}`}
            checked={isChecked}
            onChange={checkBoxHandler}
         />
         <span></span>
      </label>
   );
};
