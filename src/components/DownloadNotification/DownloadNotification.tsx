'use client';

import type { MouseEvent } from 'react';
import { useCallback } from 'react';

import { DialogNotification } from '@components/DialogNotification/DialogNotification';
import { useSelectedMovies } from '@hooks/useSelectedMovies';
import { downloadCSV } from '@tools/downloadCSV';
import { getCSVLine } from '@tools/getCSVLine';

import styles from './DownloadNotification.module.scss';

export const DownloadNotification = () => {
   const resetTitle = 'Сбросить выбор';
   const downloadTitle = 'Сохранить';
   const { selectedMovies, count, resetSelection } = useSelectedMovies();
   const handleDownload = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
         e.stopPropagation();

         const text = selectedMovies.map(([, item]) => getCSVLine(item)).join('\n');
         downloadCSV(text, `${count}_movies`);
      },
      [selectedMovies, count]
   );

   if (!count) return null;

   return (
      <DialogNotification isOpenNotification>
         <div className={styles.notification_text}>{`Выбрано фильмов: ${count}`}</div>

         <div className={styles.notification_buttons}>
            <button type="button" className={styles.notification_button} onClick={resetSelection}>
               {resetTitle}
            </button>

            <button type="button" className={styles.notification_button} onClick={handleDownload}>
               {downloadTitle}
            </button>
         </div>
      </DialogNotification>
   );
};
