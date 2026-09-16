'use client';
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { SPRITE_PATH } from '@tools/costants';
import styles from './SearchButton.module.scss';

export const SearchButton = () => {
   const buttonsIconSize = 20;
   const searchIconID = 'search';
   const status = useFormStatus();

   useEffect(() => {
      document.documentElement.toggleAttribute('data-submite', status.pending);
   }, [status.pending]);

   return (
      <button
         id="submiter"
         name="submiter"
         type="submit"
         form="search"
         aria-label="Поиск"
         className={clsx([styles.button_submit, styles.button])}
         disabled={status.pending}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${searchIconID}`} />
         </svg>
      </button>
   );
};
