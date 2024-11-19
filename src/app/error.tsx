'use client';
import styles from './error.module.scss';

interface ErrorProps {
   error: Error | null;
}

export default function ErrorPage({ error }: ErrorProps) {
   const buttonTitle = 'Обновить страницу';

   return (
      <div className={styles.error}>
         <p>{error ? error?.message : 'Неизвестная ошибка!'}</p>

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
