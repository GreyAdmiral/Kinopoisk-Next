'use client';
import type { FC } from 'react';
import type { ReloadButtonProps } from './types';
import styles from './ReloadButton.module.scss';

export const ReloadButton: FC<ReloadButtonProps> = ({ className }) => {
   const buttonTitle = 'Обновить страницу';
   const clickHandler = () => {
      window.location.reload();
   };

   return (
      <button className={`${styles.reload}${className ? ' ' + className : ''}`} onClick={clickHandler}>
         {buttonTitle}
      </button>
   );
};
