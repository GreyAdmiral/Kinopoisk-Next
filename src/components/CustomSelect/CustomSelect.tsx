'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { QueryShow } from '@/components/QueryShow/QueryShow';
import { useClickOutside } from '@hooks/useClickOutside';
import type { FC, SyntheticEvent } from 'react';
import type { CustomSelectProps } from './types';
import type { CustomSelectOption } from '@typesfolder/types';
import styles from './CustomSelect.module.scss';

const CustomSelectKeysCodes = ['Escape'];

export const CustomSelect: FC<CustomSelectProps> = ({
   list,
   defaultPointNumber,
   notActivePointTitle,
   beforeSelectCb,
   afterSelectCb,
}) => {
   const infoLabel = '/movies/info/';
   const defaultNotActivePointTitle = notActivePointTitle || '---';
   const queries = useSearchParams();
   const sorted = queries.get('sorted');
   const activeIndex = list.findIndex(({ value }) => value === sorted);
   const defaultPoint = ~activeIndex
      ? list[activeIndex]
      : list.length && defaultPointNumber
        ? list[defaultPointNumber - 1]
        : null;
   const hiddenTabIndex = 1;
   const listID = useId();
   const selectRef = useRef(null);
   const [activePoint, setActivePoint] = useState<CustomSelectOption | null>(defaultPoint);
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const path = usePathname();
   const router = useRouter();
   const isInfo = path.includes(infoLabel);

   const keydownHandler = useCallback((e: KeyboardEvent) => {
      e.stopPropagation();

      if (CustomSelectKeysCodes.includes(e.code)) {
         setIsOpen(false);
         (document.activeElement as HTMLTemplateElement).blur();
      }
   }, []);

   const CustomSelectClickHandler = (e: SyntheticEvent) => {
      e.stopPropagation();

      setIsOpen((state) => !state);
   };

   const CustomSelectItemClickHandler = (e: SyntheticEvent) => {
      e.stopPropagation();
      const [pointID] = (e.target as HTMLButtonElement).id.split('-#-').reverse();
      const point = list.find((it) => it.id === pointID);

      if (beforeSelectCb) {
         beforeSelectCb();
      }

      setActivePoint(point!);
      setIsOpen(false);

      if (afterSelectCb) {
         afterSelectCb();
      }
   };

   useClickOutside(selectRef, () => {
      setIsOpen(false);
   });

   useEffect(() => {
      if (isOpen) {
         document.body.addEventListener('keydown', keydownHandler);
      }

      return () => {
         if (isOpen) {
            document.body.removeEventListener('keydown', keydownHandler);
         }
      };
   }, [isOpen, keydownHandler]);

   useEffect(() => {
      const params = new URLSearchParams(queries);

      if (activePoint && activePoint.value) {
         params.set('sorted', activePoint.value);
      } else if (params.has('sorted')) {
         params.delete('sorted');
      }

      if (!isInfo) {
         router.push(`${path}${params.size ? `?${params.toString()}` : ''}`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [activePoint, path, queries, router]);

   return (
      <div ref={selectRef} className={styles.select}>
         <input
            type="hidden"
            name="sorted"
            form="search"
            aria-hidden="true"
            tabIndex={hiddenTabIndex}
            value={activePoint?.value || ''}
         />
         <button
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-controls={listID}
            aria-expanded={isOpen}
            {...(activePoint ? { 'aria-activedescendant': `${listID}-#-option-#-${activePoint.id}` } : {})}
            disabled={isInfo}
            className={styles.select_current}
            onClick={CustomSelectClickHandler}
         >
            {activePoint?.content || defaultNotActivePointTitle}
         </button>

         {isOpen && (
            <div id={listID} role="listbox" className={styles.select_list}>
               {list.map(({ id, content, value, breakpoint }) => {
                  const getButton = (key?: string) => {
                     return (
                        <button
                           key={key}
                           id={`${listID}-#-option-#-${id}`}
                           type="button"
                           role="option"
                           aria-selected={activePoint?.id === id}
                           data-value={value}
                           {...(activePoint?.id === id ? { tabIndex: -1 } : {})}
                           className={styles.select_list_item}
                           onClick={CustomSelectItemClickHandler}
                        >
                           {content || ''}
                        </button>
                     );
                  };

                  return breakpoint ? (
                     <QueryShow query={breakpoint} key={content + value}>
                        {getButton()}
                     </QueryShow>
                  ) : (
                     getButton(content + value)
                  );
               })}
            </div>
         )}
      </div>
   );
};
