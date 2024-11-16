import { FirstColorScheme } from '@/components/FirstColorScheme/FirstColorScheme';
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
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
               {children}
            </div>
         </body>
      </html>
   );
}
