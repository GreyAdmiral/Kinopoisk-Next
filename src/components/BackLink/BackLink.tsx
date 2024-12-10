'use client';
import { SPRITE_PATH } from '@tools/costants';
import type { FC } from 'react';
import type { BackLinkProps } from './types';
import styles from './BackLink.module.scss';

export const BackLink: FC<BackLinkProps> = ({ className }) => {
   const buttonTitle = 'Вернуться';
   const spriteID = 'back';
   const iconSize = 22;
   const clickHandler = () => {
      window.history.back();
   };

   return (
      <button className={`${styles.back}${className ? ' ' + className : ''}`} onClick={clickHandler}>
         <span className={styles.back_text}>{buttonTitle}</span>

         <svg className={styles.back_icon} width={iconSize} height={iconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${spriteID}`} />
         </svg>
      </button>
   );
};
