'use client';
import Link from 'next/link';
import { AppRoutes, brandTitle } from '@tools/costants';
import styles from './HeaderLink.module.scss';

export const HeaderLink = () => {
   const headerTitleAttribute = 'Перейти на главную страницу';

   return (
      <Link href={AppRoutes.HOME_ROUTE} className={styles.header_title_link} title={headerTitleAttribute}>
         {brandTitle}
      </Link>
   );
};
