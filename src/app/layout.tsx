import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

import { Container } from '@components/Container/Container';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { brandTitle } from '@tools/costants';

import styles from './layout.module.scss';

import '../scss/style.scss';

export const viewport: Viewport = {
   initialScale: 1,
   width: 'device-width',
};

export const metadata: Metadata = {
   title: brandTitle,
   description: `${brandTitle} - ищите фильмы по ключевым словам и наслаждайтесь просмотром совершенно бесплатно!`,
   openGraph: {
      siteName: brandTitle,
      title: brandTitle,
      type: 'website',
      locale: 'ru',
   },
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="ru" data-scroll-behavior="smooth" suppressHydrationWarning>
         <head>
            <meta name="format-detection" content="telephone=no, email=no, address=no, date=no" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="msthemecompatible" content="no" />
            <meta httpEquiv="imagetoolbar" content="no" />
            <meta httpEquiv="x-dns-prefetch-control" content="on" />
            <link rel="icon" href="./favicon.ico" sizes="any" />
            <link rel="icon" href="./icon.png" type="image/png" sizes="32x32" />
            <link rel="apple-touch-icon" href="./apple-icon.png" type="image/png" sizes="32x32" />
            <meta name="google-site-verification" content="VdP2Dd5WH3Hq5s7VyyfX19eu0T2OEOE-onUIAzCwXzs" />
         </head>

         <body>
            <ThemeProvider enableSystem>
               <div id="root" className="wrapper">
                  <Header />

                  <div className={styles.main}>
                     <Container>
                        <div className={styles.main_body}>{children}</div>
                     </Container>
                  </div>

                  <Footer />
               </div>
            </ThemeProvider>
         </body>
      </html>
   );
}
