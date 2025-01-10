import { Container } from '@components/Container/Container';
import styles from './Footer.module.scss';

export const Footer = () => {
   const developerlink = 'https://github.com/GreyAdmiral';
   const shoolLink = 'https://rs.school/';
   const devLinkTitleAttribut = 'Открыть репозиторий разработчика';
   const shoolLinkTitleAttribut = 'Открыть сайт школы';
   const developerNickName = 'B!n@r!0n';
   const shoolName = 'RSScool';

   return (
      <footer className={styles.footer}>
         <Container className={styles.footer}>
            <div className={styles.footer_body}>
               <div className={styles.footer_shool}>
                  Благодарность школе{' '}
                  <a href={shoolLink} title={shoolLinkTitleAttribut} target="_blank">
                     {shoolName}
                  </a>
               </div>

               <div className={styles.footer_developer}>
                  &copy;{' '}
                  <a href={developerlink} title={devLinkTitleAttribut}>
                     {developerNickName}
                  </a>
               </div>
            </div>
         </Container>
      </footer>
   );
};
