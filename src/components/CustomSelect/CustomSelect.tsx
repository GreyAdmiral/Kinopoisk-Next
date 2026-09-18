'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FC, MouseEvent } from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { useClickOutside } from '@hooks/useClickOutside';
import type { CustomSelectOption } from '@typesfolder/types';

import { QueryShow } from '@/components/QueryShow/QueryShow';

import styles from './CustomSelect.module.scss';
import type { CustomSelectProps } from './types';

const INFO_PATH = '/movies/info/';
const DEFAULT_NOT_ACTIVE_TITLE = '---';

export const CustomSelect: FC<CustomSelectProps> = ({
   list,
   defaultPointNumber,
   notActivePointTitle = DEFAULT_NOT_ACTIVE_TITLE,
   beforeSelectCb,
   afterSelectCb,
}) => {
   const searchParams = useSearchParams();
   const searchParamsString = searchParams.toString();
   const pathname = usePathname();
   const router = useRouter();
   const listId = useId();
   const selectRef = useRef<HTMLDivElement>(null);
   const [isOpen, setIsOpen] = useState(false);
   const isInfoPage = pathname.includes(INFO_PATH);
   const sortedValue = searchParams.get('sorted') ?? '';

   const activePoint = useMemo<CustomSelectOption | null>(() => {
      const found = list.find(({ value }) => value === sortedValue);
      if (found) {
         return found;
      }

      if (defaultPointNumber && defaultPointNumber > 0 && list.length >= defaultPointNumber) {
         return list[defaultPointNumber - 1] ?? null;
      }

      return null;
   }, [list, sortedValue, defaultPointNumber]);

   const closeSelect = useCallback(() => {
      setIsOpen(false);
   }, []);

   const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (isInfoPage) return;
      setIsOpen((open) => !open);
   };

   const handleOptionClick = (e: MouseEvent<HTMLButtonElement>, point: CustomSelectOption) => {
      e.stopPropagation();

      beforeSelectCb?.();
      setIsOpen(false);
      afterSelectCb?.();

      if (isInfoPage) return;
      if (point.value === sortedValue) return;

      const params = new URLSearchParams(searchParamsString);
      params.set('sorted', point.value);
      router.push(`${pathname}?${params.toString()}`);
   };

   const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      setIsOpen(false);
      if (document.activeElement instanceof HTMLElement) {
         document.activeElement.blur();
      }
   }, []);

   useClickOutside(selectRef, closeSelect);

   useEffect(() => {
      if (!isOpen) return;

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
   }, [isOpen, handleKeyDown]);

   return (
      <div ref={selectRef} className={styles.select}>
         <input type="hidden" name="sorted" form="search" aria-hidden="true" value={activePoint?.value ?? ''} />

         <button
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-controls={listId}
            aria-expanded={isOpen}
            {...(activePoint ? { 'aria-activedescendant': `${listId}-option-${activePoint.id}` } : {})}
            disabled={isInfoPage}
            className={styles.select_current}
            onClick={handleToggle}
         >
            {activePoint?.content || notActivePointTitle}
         </button>

         {isOpen && (
            <div id={listId} role="listbox" className={styles.select_list}>
               {list.map((point) => {
                  const { id, content, value, breakpoint } = point;
                  const optionId = `${listId}-option-${id}`;

                  const renderOption = (key?: string) => (
                     <button
                        key={key}
                        id={optionId}
                        type="button"
                        role="option"
                        aria-selected={activePoint?.id === id}
                        data-value={value}
                        tabIndex={activePoint?.id === id ? -1 : undefined}
                        className={styles.select_list_item}
                        onClick={(e) => handleOptionClick(e, point)}
                     >
                        {content || ''}
                     </button>
                  );

                  return breakpoint ? (
                     <QueryShow query={breakpoint} key={`${content}-${value}`}>
                        {renderOption()}
                     </QueryShow>
                  ) : (
                     renderOption(`${content}-${value}`)
                  );
               })}
            </div>
         )}
      </div>
   );
};
