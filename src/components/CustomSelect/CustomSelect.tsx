'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FC, MouseEvent } from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { QueryShow } from '@components/QueryShow/QueryShow';
import { useClickOutside } from '@hooks/useClickOutside';
import type { CustomSelectOption } from '@typesfolder/types';

import styles from './CustomSelect.module.scss';
import type { CustomSelectProps, OptionProps } from './types';

const INFO_PATH = '/movies/info/';
const DEFAULT_NOT_ACTIVE_TITLE = '---';
const KEYS_FOR_REACTION = ['Escape', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'];

const Option: FC<OptionProps> = ({ point, listId, ariaSelected, ...rest }) => {
   const { id, content, value, breakpoint } = point;
   const optionId = `${listId}-option-${id}`;
   const renderOption = () => (
      <button id={optionId} type="button" role="option" aria-selected={ariaSelected} data-value={value} {...rest}>
         {content || ''}
      </button>
   );

   if (!breakpoint) return renderOption();

   return (
      <QueryShow query={breakpoint} key={`${content}-${value}`}>
         {renderOption()}
      </QueryShow>
   );
};

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
   const listRef = useRef<HTMLDivElement>(null);
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

   const getOptionElements = useCallback(() => {
      if (!listRef.current) return [];

      return Array.from(listRef.current.querySelectorAll<HTMLButtonElement>(':scope [role="option"]:not(:disabled)'));
   }, []);

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

      if (beforeSelectCb) beforeSelectCb();
      setIsOpen(false);
      if (afterSelectCb) afterSelectCb();

      if (isInfoPage || point.value === sortedValue) return;

      const params = new URLSearchParams(searchParamsString);
      params.set('sorted', point.value);
      router.push(`${pathname}?${params.toString()}`);
   };

   const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
         const isReaction = KEYS_FOR_REACTION.includes(e.key);
         if (!isReaction) return;

         if (e.key == 'Escape') {
            setIsOpen(false);

            if (document.activeElement instanceof HTMLElement) {
               document.activeElement.blur();
            }

            return;
         }

         const options = getOptionElements();
         if (!options.length) return;

         e.preventDefault();

         const currentIndex = options.findIndex((option) => option === document.activeElement);
         const selectedIndex = options.findIndex((option) => option.getAttribute('aria-selected') === 'true');
         const length = options.length;
         let nextIndex = 0;

         switch (e.key) {
            case 'Tab':
            case 'ArrowDown': {
               nextIndex = !~currentIndex ? (selectedIndex + 1) % length : (currentIndex + 1) % length;
               if (nextIndex === selectedIndex) nextIndex = (nextIndex + 1) % length;
               break;
            }

            case 'ArrowUp': {
               nextIndex = !~currentIndex ? length - 1 : (length + (currentIndex - 1)) % length;
               if (nextIndex === selectedIndex) nextIndex = (length + (nextIndex - 1)) % length;
               break;
            }

            case 'Home': {
               nextIndex = 0;
               break;
            }

            case 'End': {
               nextIndex = length - 1;
               break;
            }
         }

         options[nextIndex]?.focus();
      },
      [getOptionElements]
   );

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
            <div ref={listRef} id={listId} role="listbox" className={styles.select_list}>
               {list.map((point) => {
                  const { id, content, value } = point;
                  return (
                     <Option
                        key={`${content}-${value}`}
                        point={point}
                        listId={listId}
                        ariaSelected={activePoint?.id === id}
                        tabIndex={activePoint?.id === id ? -1 : undefined}
                        className={styles.select_list_item}
                        onClick={(e) => handleOptionClick(e, point)}
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
};
