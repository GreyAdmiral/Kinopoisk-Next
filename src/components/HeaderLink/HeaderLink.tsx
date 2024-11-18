'use client';
import Link from 'next/link';
import { AppRoutes } from '@tools/costants';
import styles from './HeaderLink.module.scss';

export const HeaderLink = () => {
   const headerTitle = 'Неофициальный кинопоиск';
   const headerTitleAttribut = 'Перейти на главную страницу';

   return (
      <Link href={AppRoutes.HOME_ROUTE} className={styles.header_title_link} title={headerTitleAttribut}>
         {headerTitle}
      </Link>
   );
};
