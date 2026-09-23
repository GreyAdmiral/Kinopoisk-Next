'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import { AppRoutes } from '@tools/costants';

import styles from './PaginationButton.module.scss';
import type { PaginationButtonProps } from './types';

export const PaginationButton: FC<PaginationButtonProps> = ({ page, queryParams, children, className, ...props }) => {
   const path = `${AppRoutes.PAGE_ROUTE}/${page}${queryParams ? `?${queryParams}` : ''}`;
   const router = useRouter();
   const clickHandler = () => {
      router.push(path);
   };

   return (
      <button className={`${styles.pagination_button}${className ? ' ' + className : ''}`} {...props} onClick={clickHandler}>
         {children}
      </button>
   );
};
