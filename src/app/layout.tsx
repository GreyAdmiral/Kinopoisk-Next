import { FirstColorScheme } from '@/components/FirstColorScheme/FirstColorScheme';
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
         <FirstColorScheme />

         <body>
            <div id="root" className="wrapper">
               <Header />

               <div className={styles.main}>
                  <Container className={styles.main}>
                     <div className={styles.main_body}>{children}</div>
                  </Container>
               </div>

               <Footer />
            </div>
         </body>
      </html>
   );
}
