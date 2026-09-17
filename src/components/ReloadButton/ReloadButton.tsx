'use client';
import type { FC } from 'react';

import styles from './ReloadButton.module.scss';
import type { ReloadButtonProps } from './types';

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
