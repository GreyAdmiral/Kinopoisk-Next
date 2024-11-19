'use client';
import { DialogNotification } from '../DialogNotification/DialogNotification';
import { useEffect, useState } from 'react';
import { getCSVLine } from '@tools/getCSVLine';
import { downloadCSV } from '@tools/downloadCSV';
import { getSavedMovies } from '@tools/getSavedMovies';
import type { MouseEvent } from 'react';
import styles from './DownloadNotification.module.scss';

export const DownloadNotification = () => {
   const resetButtonTitle = 'Сбросить выбор';
   const downloadButtonTitle = 'Сохранить';
   const [isVisible, setIsVisible] = useState<boolean>(false);
   const [checkedMoviesCounter, setCheckedMoviesCounter] = useState<number>(0);

   const dialogClosehandker = () => {
      const allCheckbox = document.querySelectorAll('article label[data-checked]');

      allCheckbox.forEach((label) => {
         label.dispatchEvent(new CustomEvent('ResetAllCheckbox'));
      });
   };

   const downloadSelectedInfo = function (e: MouseEvent) {
      e.stopPropagation();
      const savedMovies = getSavedMovies('selectedMovies');
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
      function filmsChoiceHandler(e: Event) {
         e.stopPropagation();
         const { detail: checkedMovies } = e as CustomEvent;
         const checkedMoviesLength = checkedMovies.length;

         setCheckedMoviesCounter(checkedMoviesLength);
         setIsVisible(checkedMoviesLength ? true : false);
      }

      document.body.addEventListener('FilmsChoice', filmsChoiceHandler);

      return () => {
         document.body.removeEventListener('FilmsChoice', filmsChoiceHandler);
      };
   }, []);

   return isVisible ? (
      <DialogNotification isOpenNotification={isVisible}>
         <div className={styles.notification_text}>{`Выбрано фильмов: ${checkedMoviesCounter}`}</div>

         <div className={styles.notification_buttons}>
            <button className={styles.notification_button} onClick={dialogClosehandker}>
               {resetButtonTitle}
            </button>

            <button className={styles.notification_button} onClick={downloadSelectedInfo}>
               {downloadButtonTitle}
            </button>
         </div>
      </DialogNotification>
   ) : null;
};
