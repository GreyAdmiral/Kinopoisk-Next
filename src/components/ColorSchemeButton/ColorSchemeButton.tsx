'use client';
import { useEffect, useState } from 'react';
import { useLocalStorageSync } from '@hooks/useLocalStorageSync';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getSchemeIconId } from '@tools/getSchemeIconId';
import { SCHEMES } from '@tools/costants';
import { SchemeName } from '@typesfolder/types';
import styles from './ColorSchemeButton.module.scss';

export const ColorSchemeButton = () => {
   const [saveScheme, setSaveScheme] = useLocalStorageSync('userScheme', '');
   const isAutoDark = useMediaQuery('(prefers-color-scheme: dark)');
   const [scheme, setScheme] = useState(saveScheme ? saveScheme : isAutoDark ? SCHEMES.DARK : SCHEMES.LIGHT);

   function writeSchemeName() {
      setSaveScheme(scheme === SCHEMES.DARK ? SCHEMES.LIGHT : SCHEMES.DARK);
      setScheme(scheme === SCHEMES.DARK ? SCHEMES.LIGHT : SCHEMES.DARK);
      (document.activeElement as HTMLTemplateElement).blur();
   }

   useEffect(() => {
      if (scheme) {
         document.documentElement.dataset.theme = scheme;
      }
   }, [scheme]);

   return (
      <button
         type="button"
         className={styles.scheme_button}
         onClick={writeSchemeName}
         title={`Выбрать ${scheme == SCHEMES.LIGHT ? 'тёмную' : 'светлую'} тему`}
         aria-label={`Выбрать ${scheme == SCHEMES.LIGHT ? 'тёмную' : 'светлую'} тему`}
      >
         <svg>
            <use xlinkHref={`/images/sprite.svg#${getSchemeIconId(scheme as SchemeName)}`} />
         </svg>
      </button>
   );
};
