'use client';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import type { PaginationButtonProps } from './types';
import styles from './PaginationButton.module.scss';

export const PaginationButton: FC<PaginationButtonProps> = ({ page, children, className, ...props }) => {
   const path = `/movies/${page}`;
   const router = useRouter();
   const clickHandler = () => {
      router.push(path);
   };

   return (
      <button
         className={`${styles.pagination_button}${className ? ' ' + className : ''}`}
         {...props}
         onClick={clickHandler}
      >
         {children}
      </button>
   );
};
