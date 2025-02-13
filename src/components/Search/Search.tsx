'use client';
import { FormEventHandler, Suspense, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '@components/Loader/Loader';
import { FormInput } from '@components/FormInput/FormInput';
import { SortDirectButton } from '@components/SortDirectButton/SortDirectButton';
import { searchAction } from '@tools/actions';
import { SPRITE_PATH } from '@tools/costants';
import styles from './Search.module.scss';

export const Search = () => {
   const searchIconID = 'search';
   const buttonsIconSize = 20;
   const [isSubmite, setIsSubmite] = useState(false);

   const submitHandler: FormEventHandler = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const { target } = e;

      setIsSubmite(true);
      await searchAction(new FormData(target as HTMLFormElement));
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

         <Suspense fallback={<Loader />}>
            <FormInput name="keyword" className={styles.search_input_field} />
         </Suspense>

         <button
            id="submiter"
            name="submiter"
            type="submit"
            form="search"
            aria-label="Поиск"
            className={classNames([styles.search_button_submit, styles.search_button])}
            disabled={isSubmite || undefined}
         >
            <svg width={buttonsIconSize} height={buttonsIconSize}>
               <use xlinkHref={`${SPRITE_PATH}#${searchIconID}`} />
            </svg>
         </button>
      </form>
   );
};
