import { NotFoundResult } from '@/components/NotFoundResult/NotFoundResult';
import styles from './not-found.module.scss';

export default function NotFoundPage() {
   const message = 'Такой страницы нет!';

   return (
      <div className={styles.undefined_page}>
         <NotFoundResult message={message} />
      </div>
   );
}
