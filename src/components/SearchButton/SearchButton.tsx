'use client';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { ButtonSkeleton } from '@components/ButtonSkeleton/ButtonSkeleton';
import { SPRITE_PATH } from '@tools/costants';
import clsx from 'clsx';

import styles from './SearchButton.module.scss';

export const SearchButton = () => {
   const buttonsIconSize = 20;
   const searchIconID = 'search';
   const attributeName = 'data-submite';
   const [mounted, setMounted] = useState<boolean>(false);
   const { pending } = useFormStatus();

   useEffect(() => {
      setMounted(true);
   }, []);

   useEffect(() => {
      document.documentElement.toggleAttribute(attributeName, pending);

      return () => {
         document.documentElement.removeAttribute(attributeName);
      };
   }, [pending]);

   if (!mounted) return <ButtonSkeleton iconSize={buttonsIconSize} className={styles.button} />;

   return (
      <button
         id="submiter"
         name="submiter"
         type="submit"
         form="search"
         aria-label="Поиск"
         className={clsx([styles.button_submit, styles.button])}
         disabled={pending}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use href={`${SPRITE_PATH}#${searchIconID}`} />
         </svg>
      </button>
   );
};
