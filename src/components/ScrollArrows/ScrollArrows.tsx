'use client';
import type { FC, KeyboardEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useScrollY } from '@hooks/useScrollY';
import { SPRITE_PATH } from '@tools/costants';
import { getDocumentHeight } from '@tools/getDocumentSizes';
import { smoothScroll } from '@tools/smoothScroll';
import clsx from 'clsx';

import styles from './ScrollArrows.module.scss';
import type { ScrollArrowsProps } from './type';

const SPRITE_ID = 'arrow';
const ARROW_SIZE = 40;

/** Минимальный «излишек» высоты документа, при котором стрелки имеют смысл. */
const MIN_OVERFLOW = 550;
/** Порог сверху: ниже него верхняя стрелка скрывается. */
const TOP_THRESHOLD = 550;
/** Отступ от низа документа, при котором нижняя стрелка скрывается. */
const BOTTOM_THRESHOLD = 325;

export const ScrollArrows: FC<ScrollArrowsProps> = () => {
   const documentScrollY = useScrollY();
   const [isUpHidden, setIsUpHidden] = useState(true);
   const [isDownHidden, setIsDownHidden] = useState(true);

   const recalc = useCallback(() => {
      const docHeight = getDocumentHeight();
      const viewport = window.innerHeight;
      const hasOverflow = docHeight >= viewport + MIN_OVERFLOW;

      if (!hasOverflow) {
         setIsUpHidden(true);
         setIsDownHidden(true);
         return;
      }

      setIsUpHidden(documentScrollY < TOP_THRESHOLD);
      setIsDownHidden(documentScrollY + viewport >= docHeight - BOTTOM_THRESHOLD);
   }, [documentScrollY]);

   useEffect(() => {
      recalc();
   }, [recalc]);

   useEffect(() => {
      if (typeof ResizeObserver === 'undefined') return;

      const observer = new ResizeObserver(() => recalc());
      observer.observe(document.documentElement);

      return () => observer.disconnect();
   }, [recalc]);

   useEffect(() => {
      const mql = window.matchMedia('(min-height: 0px)');
      mql.addEventListener('change', recalc);

      return () => mql.removeEventListener('change', recalc);
   }, [recalc]);

   const scrollToTop = useCallback(() => {
      smoothScroll({ top: 0 });
   }, []);

   const scrollToBottom = useCallback(() => {
      smoothScroll({ top: getDocumentHeight() });
   }, []);

   const handleKey = (handler: () => void) => (e: KeyboardEvent<SVGSVGElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         handler();
      }
   };

   return (
      <div className={styles.scroll_buttons}>
         <svg
            className={clsx(styles.scroll_buttons_arrow, {
               [styles.scroll_buttons_arrow_hidden]: isUpHidden,
            })}
            width={ARROW_SIZE}
            height={ARROW_SIZE}
            role="button"
            tabIndex={0}
            aria-label="Прокрутить вверх"
            onClick={scrollToTop}
            onKeyDown={handleKey(scrollToTop)}
         >
            <use href={`${SPRITE_PATH}#${SPRITE_ID}`} />
         </svg>

         <svg
            className={clsx(styles.scroll_buttons_arrow, {
               [styles.scroll_buttons_arrow_hidden]: isDownHidden,
            })}
            width={ARROW_SIZE}
            height={ARROW_SIZE}
            role="button"
            tabIndex={0}
            aria-label="Прокрутить вниз"
            onClick={scrollToBottom}
            onKeyDown={handleKey(scrollToBottom)}
         >
            <use href={`${SPRITE_PATH}#${SPRITE_ID}`} />
         </svg>
      </div>
   );
};
