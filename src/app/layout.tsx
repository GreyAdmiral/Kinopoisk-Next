import { Container } from '@components/Container/Container';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import styles from './layout.module.scss';
import '../scss/style.scss';

export const viewport: Viewport = {
   initialScale: 1,
   width: 'device-width',
};

export const metadata: Metadata = {
   title: 'Неофициальный кинопоиск',
   description: 'Неофициальный кинопоиск',
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="ru">
         <head>
            <meta name="format-detection" content="telephone=no, email=no, address=no, date=no" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="msthemecompatible" content="no" />
            <meta httpEquiv="imagetoolbar" content="no" />
            <link rel="icon" href="./favicon.ico" sizes="any" />
            <link rel="icon" href="./icon.png" type="image/png" sizes="32x32" />
            <link rel="apple-touch-icon" href="./apple-icon.png" type="image/png" sizes="32x32" />
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
