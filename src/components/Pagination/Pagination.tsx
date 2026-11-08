import Link from 'next/link';
import type { FC } from 'react';

import { AppRoutes } from '@tools/costants';
import { getPaginationContent } from '@tools/getPaginationContent';

import { PaginationButton } from '../PaginationButton/PaginationButton';

import styles from './Pagination.module.scss';
import type { PaginationProps } from './types';

export const Pagination: FC<PaginationProps> = ({ totalPages, page, searchParams }) => {
   const nextPageTitle = '❱';
   const backPageTitle = '❰';
   const forwardPageTitle = '►';
   const backwardPageTitle = '◄';
   const nextPageTitleAttribut = 'Следующая страница';
   const backPageTitleAttribut = 'Предыдущая страница';
   const forwardPageTitleAttribut = 'Последняя страница';
   const backwardPageTitleAttribut = 'Первая страница';
   const { keyword = '', reversed = '', sorted = '' } = searchParams;
   const queries = new URLSearchParams();

   Object.entries({ keyword, reversed, sorted }).forEach(([key, value]) => {
      if (value) {
         queries.set(key, value);
      }
   });

   const queryParams = queries.toString();
   const pagesScheme = getPaginationContent(page, totalPages);

   return totalPages ? (
      <div className={styles.pagination}>
         <div className={styles.pagination_buttons}>
            <PaginationButton
               page="1"
               queryParams={queryParams}
               aria-label={backwardPageTitleAttribut}
               className={styles.pagination_link}
               {...(+page === 1 ? { tabIndex: -1 } : {})}
            >
               {backwardPageTitle}
            </PaginationButton>

            <PaginationButton
               page={`${+page - 1}`}
               queryParams={queryParams}
               aria-label={backPageTitleAttribut}
               className={styles.pagination_link}
               {...(+page === 1 ? { tabIndex: -1 } : {})}
            >
               {backPageTitle}
            </PaginationButton>
         </div>

         {pagesScheme.map((it, idx) => {
            const pageKey = idx.toString().repeat(10);

            if (it === 'dots') {
               return (
                  <span key={pageKey} className={styles.pagination_link} aria-hidden={true}>
                     ...
                  </span>
               );
            }

            if (Number.isInteger(it)) {
               const linkUrl = `${AppRoutes.PAGE_ROUTE}/${it}${queryParams ? `?${queryParams}` : ''}`;
               const isActive = it === page;

               return (
                  <Link
                     key={pageKey}
                     href={linkUrl}
                     className={styles.pagination_link}
                     aria-label={`На страницу ${it}`}
                     {...(isActive ? { tabIndex: -1 } : {})}
                  >
                     {it}
                  </Link>
               );
            }

            return null;
         })}

         <div className={styles.pagination_buttons}>
            <PaginationButton
               page={`${+page + 1}`}
               queryParams={queryParams}
               aria-label={nextPageTitleAttribut}
               className={styles.pagination_link}
               {...(+page === totalPages ? { tabIndex: -1 } : {})}
            >
               {nextPageTitle}
            </PaginationButton>

            <PaginationButton
               page={`${totalPages}`}
               queryParams={queryParams}
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
