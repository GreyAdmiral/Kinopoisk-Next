import Link from 'next/link';
import styles from './not-found.module.scss';

export default function UndefinedPage() {
   const message = 'Такой страницы нет!';
   const buttonTitle = 'Перейти на главную страницу';

   return (
      <div className={styles.undefined_page}>
         <span>{message}</span>

         <Link href={'/'}>{buttonTitle}</Link>
      </div>
   );
}
