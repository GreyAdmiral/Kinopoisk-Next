import { Loader } from '@/components/Loader/Loader';
import styles from './loading.module.scss';

export default function LoadingMovies() {
   return (
      <div className={styles.loader_container}>
         <Loader />
      </div>
   );
}
