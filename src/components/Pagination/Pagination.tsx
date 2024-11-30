import Link from 'next/link';
import { PaginationButton } from '../PaginationButton/PaginationButton';
import type { FC } from 'react';
import type { PaginationProps } from './types';
import styles from './Pagination.module.scss';

export const Pagination: FC<PaginationProps> = ({ totalPages, page }) => {
   const nextPageTitle = '❱';
   const backPageTitle = '❰';
   const forwardPageTitle = '►';
   const backwardPageTitle = '◄';
   const nextPageTitleAttribut = 'Следующая страница';
   const backPageTitleAttribut = 'Предыдущая страница';
   const forwardPageTitleAttribut = 'Первая страница';
   const backwardPageTitleAttribut = 'Последняя страница';

   return totalPages ? (
      <div className={styles.pagination}>
         <div className={styles.pagination_buttons}>
            <PaginationButton
               page="1"
               aria-label={backwardPageTitleAttribut}
               className={styles.pagination_link}
               {...(+page === 1 ? { tabIndex: -1 } : {})}
            >
               {backwardPageTitle}
            </PaginationButton>

            <PaginationButton
               page={`${+page - 1}`}
               aria-label={backPageTitleAttribut}
               className={styles.pagination_link}
               {...(+page === 1 ? { tabIndex: -1 } : {})}
            >
               {backPageTitle}
            </PaginationButton>
         </div>

         {Array.from({ length: totalPages }, (_, idx: number) => {
            const pageKey = idx.toString().repeat(10);
            const pageNumber = idx + 1;
            const linkUrl = `/movies/${pageNumber}`;
            const isActive = pageNumber === +page;

            return (
               <Link
                  key={pageKey}
                  href={linkUrl}
                  className={styles.pagination_link}
                  {...(isActive ? { tabIndex: -1 } : {})}
               >
                  {pageNumber}
               </Link>
            );
         })}

         <div className={styles.pagination_buttons}>
            <PaginationButton
               page={`${+page + 1}`}
               aria-label={nextPageTitleAttribut}
               className={styles.pagination_link}
               {...(+page === totalPages ? { tabIndex: -1 } : {})}
            >
               {nextPageTitle}
            </PaginationButton>

            <PaginationButton
               page={`${totalPages}`}
               aria-label={forwardPageTitleAttribut}
               className={styles.pagination_link}
               {...(+page === totalPages ? { tabIndex: -1 } : {})}
            >
               {forwardPageTitle}
            </PaginationButton>
         </div>
      </div>
   ) : null;
};
