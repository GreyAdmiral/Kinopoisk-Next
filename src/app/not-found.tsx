import styles from './not-found.module.scss';

export default function UndefinedPage() {
   return (
      <div className={styles.undefined_page}>
         <span>Такой страницы нет!</span>
      </div>
   );
}
