import styles from './Loader.module.scss';

export const Loader = () => {
   return (
      <span className={styles.loader}>
         <span className={styles.spiner}></span>
      </span>
   );
};
