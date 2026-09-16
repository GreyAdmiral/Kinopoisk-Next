'use client';
import { FormEventHandler, Suspense, useEffect, useState, useTransition } from 'react';
import clsx from 'clsx';
import { Loader } from '@components/Loader/Loader';
import { FormInput } from '@components/FormInput/FormInput';
import { SortDirectButton } from '@components/SortDirectButton/SortDirectButton';
import { searchAction } from '@tools/actions';
import { SPRITE_PATH } from '@tools/costants';
import styles from './Search.module.scss';
import { useRouter } from 'next/navigation';

export const Search = () => {
   const searchIconID = 'search';
   const buttonsIconSize = 20;
   const router = useRouter();
   const [isSubmite, setIsSubmite] = useState(false);
   const [isPending, startTransition] = useTransition();

   const submitHandler: FormEventHandler = (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);

      setIsSubmite(true);

      startTransition(async () => {
         const path = await searchAction(data);
         router.push(path);
         setIsSubmite(false);
      });
   };
   const loadedHandler = () => {
      setIsSubmite(false);
   };

   useEffect(() => {
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
            type="submit"
            form="search"
            aria-label="Поиск"
            className={clsx([styles.search_button_submit, styles.search_button])}
            disabled={isSubmite || isPending || undefined}
         >
            <svg width={buttonsIconSize} height={buttonsIconSize}>
               <use xlinkHref={`${SPRITE_PATH}#${searchIconID}`} />
            </svg>
         </button>
      </form>
   );
};
