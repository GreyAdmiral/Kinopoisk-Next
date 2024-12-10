'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useScrollY } from '@hooks/useScrollY';
import { getDocumentHeight } from '@tools/getDocumentSizes';
import { smoothScroll } from '@tools/smoothScroll';
import { SPRITE_PATH } from '@tools/costants';
import type { FC } from 'react';
import type { ScrollArrowsProps } from './type';
import styles from './ScrollArrows.module.scss';

export const ScrollArrows: FC<ScrollArrowsProps> = () => {
   const spriteID = 'arrow';
   const arrowSize = 40;
   const documentScrollY = useScrollY();
   const [isUpArrowHidden, setIsUpArrowHidden] = useState<boolean>(false);
   const [isDownArrowHidden, setIsDownArrowHidden] = useState<boolean>(true);

   const arrowUpHandler = () => {
      smoothScroll({ top: 0 });
   };

   const arrowDownHandler = () => {
      smoothScroll({
         top: getDocumentHeight(),
      });
   };

   useEffect(() => {
      setIsUpArrowHidden(documentScrollY < 550);
      setIsDownArrowHidden(documentScrollY + window.innerHeight >= getDocumentHeight() - 325);
   }, [documentScrollY]);

   return (
      <div className={styles.scroll_buttons}>
         <svg
            className={classNames([
               styles.scroll_buttons_arrow,
               { [styles.scroll_buttons_arrow_hidden]: isUpArrowHidden },
            ])}
            width={arrowSize}
            height={arrowSize}
            onClick={arrowUpHandler}
         >
            <use xlinkHref={`${SPRITE_PATH}#${spriteID}`} />
         </svg>

         <svg
            className={classNames([
               styles.scroll_buttons_arrow,
               { [styles.scroll_buttons_arrow_hidden]: isDownArrowHidden },
            ])}
            width={arrowSize}
            height={arrowSize}
            onClick={arrowDownHandler}
         >
            <use xlinkHref={`${SPRITE_PATH}#${spriteID}`} />
         </svg>
      </div>
   );
};
