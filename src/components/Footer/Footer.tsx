import { Container } from '@components/Container/Container';
import styles from './Footer.module.scss';

export const Footer = () => {
   const developerLink = 'https://github.com/GreyAdmiral';
   const schoolLink = 'https://rs.school/';
   const devLinkTitleAttribut = 'Открыть репозиторий разработчика';
   const schoolLinkTitleAttribut = 'Открыть сайт школы';
   const developerNickname = 'B!n@r!0n';
   const schoolName = 'RSScool';

   return (
      <footer className={styles.footer}>
         <Container className={styles.footer}>
            <div className={styles.footer_body}>
               <div className={styles.footer_shool}>
                  Благодарность школе{' '}
                  <a href={schoolLink} title={schoolLinkTitleAttribut} target="_blank">
                     {schoolName}
                  </a>
               </div>

               <div className={styles.footer_developer}>
                  &copy;{' '}
                  <a href={developerLink} title={devLinkTitleAttribut}>
                     {developerNickname}
                  </a>
               </div>
            </div>
         </Container>
      </footer>
   );
};
