'use client';
import { useEffect, useState } from 'react';
import { DialogNotification } from '@components/DialogNotification/DialogNotification';
import { useSessionStorageSync } from '@hooks/useSessionStorageSync';
import { getCSVLine } from '@tools/getCSVLine';
import { downloadCSV } from '@tools/downloadCSV';
import type { MouseEvent } from 'react';
import type { SavedMovies } from '@typesfolder/types';
import styles from './DownloadNotification.module.scss';

export const DownloadNotification = () => {
   const resetButtonTitle = 'Сбросить выбор';
   const downloadButtonTitle = 'Сохранить';
   const [isVisible, setIsVisible] = useState<boolean>(false);
   const [checkedMoviesCounter, setCheckedMoviesCounter] = useState<number>(0);
   const [selectedMovies, setSelectedMovies] = useSessionStorageSync('selectedMovies', JSON.stringify([]));

   const dialogCloseHandler = () => {
      const allCheckbox = document.querySelectorAll('article label[data-checked]');

      allCheckbox.forEach((label) => {
         label.dispatchEvent(new CustomEvent('ResetAllCheckbox'));
      });

      setSelectedMovies(JSON.stringify([]));
   };

   const downloadSelectedInfo = function (e: MouseEvent) {
      e.stopPropagation();
      const savedMovies: SavedMovies = JSON.parse(selectedMovies);
      const text = savedMovies.reduce((acc, [, it], idx, arr) => {
         let string = getCSVLine(it);

         if (idx !== arr.length - 1) {
            string += '\n';
         }

         return acc + string;
      }, '');

      downloadCSV(text, `${checkedMoviesCounter}_movies`);
   };

   useEffect(() => {
      const savedMovies: SavedMovies = JSON.parse(selectedMovies);
      const savedMoviesCounter = savedMovies.length;

      setCheckedMoviesCounter(savedMoviesCounter);
      setIsVisible(Boolean(savedMoviesCounter));
   }, [selectedMovies]);

   useEffect(() => {
      function filmsChoiceHandler(e: Event) {
         e.stopPropagation();
         const { detail: checkedMovies } = e as CustomEvent;
         const checkedMoviesLength = checkedMovies.length;

         setCheckedMoviesCounter(checkedMoviesLength);
         setIsVisible(Boolean(checkedMoviesLength));
      }

      document.body.addEventListener('FilmsChoice', filmsChoiceHandler);

      return () => {
         document.body.removeEventListener('FilmsChoice', filmsChoiceHandler);
      };
   }, []);

   return isVisible ? (
      <DialogNotification isOpenNotification={Boolean(checkedMoviesCounter)}>
         <div className={styles.notification_text}>{`Выбрано фильмов: ${checkedMoviesCounter}`}</div>

         <div className={styles.notification_buttons}>
            <button className={styles.notification_button} onClick={dialogCloseHandler}>
               {resetButtonTitle}
            </button>

            <button className={styles.notification_button} onClick={downloadSelectedInfo}>
               {downloadButtonTitle}
            </button>
         </div>
      </DialogNotification>
   ) : null;
};
