import Link from 'next/link';
import { BackLink } from '@components/BackLink/BackLink';
import styles from './not-found.module.scss';

export default function NotFoundPage() {
   const message = 'Такой страницы нет!';
   const buttonTitle = 'На главную страницу';

   return (
      <div className={styles.undefined_page}>
         <span className={styles.undefined_page_message}>{message}</span>

         <div className={styles.undefined_page_links}>
            <Link href={'/'} className={styles.undefined_page_link}>
               {buttonTitle}
            </Link>
            <BackLink />
         </div>
      </div>
   );
}
