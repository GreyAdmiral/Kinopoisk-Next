import { Container } from '@components/Container/Container';
import styles from './Footer.module.scss';

export const Footer = () => {
   return (
      <footer className={styles.footer}>
         <Container className={styles.footer}>
            <div className={styles.footer_body}>
               Проект создан в рамках программы обучения школы{' '}
               <a href="https://rs.school/" title="Открыть сайт школы" target="_blank">
                  RSScool
               </a>
            </div>
         </Container>
      </footer>
   );
};
