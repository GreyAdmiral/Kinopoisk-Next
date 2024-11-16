'use client';
import styles from './error.module.scss';

interface ErrorProps {
   error: Error | null;
}

export default function ErrorPage({ error }: ErrorProps) {
   return (
      <div className={styles.error}>
         <p>{error ? `Ошибка: ${error.message}` : 'Неизвестная ошибка!'}</p>
         <p>{error ? `Причина: ${error.cause}` : 'Причина не установлена!'}</p>

         <button
            type="button"
            onClick={() => {
               window.location.reload();
            }}
         >
            Обновить страницу
         </button>
      </div>
   );
}
