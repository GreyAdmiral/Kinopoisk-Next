'use client';
import { FormEventHandler, Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Loader } from '@components/Loader/Loader';
import { FormInput } from '@components/FormInput/FormInput';
import { SortDirectButton } from '@components/SortDirectButton/SortDirectButton';
import { searchAction } from '@tools/actions';
import { SPRITE_PATH } from '@tools/costants';
import type { MouseEventHandler } from 'react';
import styles from './Search.module.scss';

export const Search = () => {
   const searchIconID = 'search';
   const buttonsIconSize = 20;
   const [isSubmite, setIsSubmite] = useState(false);

   const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
   };

   const submitHandler: FormEventHandler = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const target = e.target as HTMLFormElement;

      setIsSubmite(true);
      await searchAction(new FormData(target));
   };

   useEffect(() => {
      const loadedHandler = () => {
         setIsSubmite(false);
      };

      document.body.addEventListener('loaded', loadedHandler);

      return () => {
         document.body.removeEventListener('loaded', loadedHandler);
      };
   }, []);

   useEffect(() => {
      document.documentElement.toggleAttribute('data-submite', isSubmite);
   }, [isSubmite]);

   return (
      <form id="search" name="search" onSubmit={submitHandler} className={styles.search}>
         <SortDirectButton className={styles.search_button} />

         <Suspense key={searchIconID} fallback={<Loader />}>
            <FormInput name="keyword" className={styles.search_input_field} />
         </Suspense>

         <button
            id="submiter"
            name="submiter"
            type="button"
            form="search"
            aria-label="Поиск"
            className={clsx([styles.search_button_submit, styles.search_button])}
            disabled={isSubmite || undefined}
            onClick={clickHandler}
         >
            <svg width={buttonsIconSize} height={buttonsIconSize}>
               <use xlinkHref={`${SPRITE_PATH}#${searchIconID}`} />
            </svg>
         </button>
      </form>
   );
};
