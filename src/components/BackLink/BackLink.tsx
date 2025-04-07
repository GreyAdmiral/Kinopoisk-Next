'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SPRITE_PATH } from '@tools/costants';
import type { FC } from 'react';
import type { BackLinkProps } from './types';
import styles from './BackLink.module.scss';

export const BackLink: FC<BackLinkProps> = ({ className }) => {
   const buttonTitle = 'Вернуться';
   const spriteID = 'back';
   const iconSize = 22;
   const router = useRouter();
   const [isHasHistory, setIsHasHistory] = useState<boolean>(false);
   const clickHandler = () => {
      router.back();
   };

   useEffect(() => {
      setIsHasHistory(window.history.length > 1 && window.history.state.__PRIVATE_NEXTJS_INTERNALS_TREE[1].children.length > 2);
   }, []);

   if (!isHasHistory) {
      return null;
   }

   return (
      <button className={`${styles.back}${className ? ' ' + className : ''}`} onClick={clickHandler}>
         <span className={styles.back_text}>{buttonTitle}</span>

         <svg className={styles.back_icon} width={iconSize} height={iconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${spriteID}`} />
         </svg>
      </button>
   );
};
