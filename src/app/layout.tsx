import { Container } from '@components/Container/Container';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import styles from './layout.module.scss';
import '../scss/style.scss';

export const metadata: Metadata = {
   title: 'Неофициальный кинопоиск',
   description: 'Неофициальный кинопоиск',
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="ru">
         <head>
            <link rel="icon" href="./favicon.ico" sizes="any" />
            <link rel="icon" href="./icon?<generated>" type="image/<generated>" sizes="<generated>" />
            <link rel="apple-touch-icon" href="./apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
         </head>

         <body>
            <div id="root" className="wrapper">
               <Header />

               <div className={styles.main}>
                  <Container>
                     <div className={styles.main_body}>{children}</div>
                  </Container>
               </div>

               <Footer />
            </div>
         </body>
      </html>
   );
}
