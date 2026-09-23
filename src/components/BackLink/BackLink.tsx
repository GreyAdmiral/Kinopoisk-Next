'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { SPRITE_PATH } from '@tools/costants';

import styles from './BackLink.module.scss';
import type { BackLinkProps } from './types';

export const BackLink: FC<BackLinkProps> = ({ className }) => {
   const buttonTitle = 'Вернуться';
   const spriteID = 'back';
   const iconSize = 22;
   const router = useRouter();
   const [isHasHistory, setIsHasHistory] = useState<boolean>(false);
   const buttonClassName = className ? `${styles.back} ${className}` : styles.back;
   const handleClick = () => {
      router.back();
   };

   useEffect(() => {
      const prevNextHistoryLength = window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE?.[1]?.children?.length || 0;
      setIsHasHistory(window.history.length > 1 && prevNextHistoryLength > 2);
   }, []);

   if (!isHasHistory) return null;

   return (
      <button type="button" className={buttonClassName} onClick={handleClick}>
         <span className={styles.back_text}>{buttonTitle}</span>

         <svg className={styles.back_icon} width={iconSize} height={iconSize} aria-hidden="true" focusable="false">
            <use href={`${SPRITE_PATH}#${spriteID}`} />
         </svg>
      </button>
   );
};
