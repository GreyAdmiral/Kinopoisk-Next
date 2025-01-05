import Link from 'next/link';
import { BackLink } from '@components/BackLink/BackLink';
import styles from './NotFoundResult.module.scss';

export const NotFoundResult = () => {
   const title = 'Ничего не найдено!';
   const buttonTitle = 'На главную страницу';

   return (
      <div className={styles.not_found}>
         <h2 className={styles.not_found_message}>{title}</h2>

         <div className={styles.not_found_links}>
            <Link href={'/'} className={styles.not_found_link}>
               {buttonTitle}
            </Link>
            <BackLink />
         </div>
      </div>
   );
};
