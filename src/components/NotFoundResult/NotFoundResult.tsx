import Link from 'next/link';
import { BackLink } from '@components/BackLink/BackLink';
import { AppRoutes } from '@/tools/costants';
import type { FC } from 'react';
import type { NotFoundResultProps } from './types';
import styles from './NotFoundResult.module.scss';

export const NotFoundResult: FC<NotFoundResultProps> = ({ message }) => {
   const title = message || 'Ничего не найдено!';
   const buttonTitle = 'На главную страницу';

   return (
      <div className={styles.not_found}>
         <h2 className={styles.not_found_message}>{title}</h2>

         <div className={styles.not_found_links}>
            <Link href={AppRoutes.HOME_ROUTE} className={styles.not_found_link}>
               {buttonTitle}
            </Link>

            <BackLink />
         </div>
      </div>
   );
};
