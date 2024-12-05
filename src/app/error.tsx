'use client';
import styles from './error.module.scss';

interface ErrorProps {
   error: Error | null;
}

export default function ErrorPage({ error }: ErrorProps) {
   const buttonTitle = 'Обновить страницу';
   const defaultErrorTitle = 'Неизвестная ошибка!';

   return (
      <div className={styles.error}>
         <p>{error ? error?.message : defaultErrorTitle}</p>

         <button
            type="button"
            onClick={() => {
               window.location.reload();
            }}
         >
            {buttonTitle}
         </button>
      </div>
   );
}
