'use client';
import { useEffect, useState } from 'react';
import { useLocalStorageSync } from '@hooks/useLocalStorageSync';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getSchemeIconId } from '@tools/getSchemeIconId';
import { SCHEMES, SPRITE_PATH } from '@tools/costants';
import styles from './ColorSchemeButton.module.scss';

export const ColorSchemeButton = () => {
   const buttonsIconSize = 24;
   const [saveScheme, setSaveScheme] = useLocalStorageSync('userScheme', '');
   const isAutoDark = useMediaQuery('(prefers-color-scheme: dark)');
   const [activeScheme, setActiveScheme] = useState<string>('');

   function writeSchemeName() {
      setSaveScheme(activeScheme === SCHEMES.DARK ? SCHEMES.LIGHT : SCHEMES.DARK);
      setActiveScheme(activeScheme === SCHEMES.DARK ? SCHEMES.LIGHT : SCHEMES.DARK);
      (document.activeElement as HTMLTemplateElement).blur();
   }

   useEffect(() => {
      const scheme = saveScheme ? saveScheme : isAutoDark ? SCHEMES.DARK : SCHEMES.LIGHT;

      if (scheme) {
         setActiveScheme(scheme);
      }
   }, [isAutoDark, saveScheme]);

   useEffect(() => {
      if (activeScheme) {
         document.documentElement.dataset.theme = activeScheme;
      }
   }, [activeScheme]);

   return (
      <button
         type="button"
         className={styles.scheme_button}
         onClick={writeSchemeName}
         title={`Выбрать ${activeScheme == SCHEMES.LIGHT ? 'тёмную' : 'светлую'} тему`}
         aria-label={`Выбрать ${activeScheme == SCHEMES.LIGHT ? 'тёмную' : 'светлую'} тему`}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${getSchemeIconId(activeScheme)}`} />
         </svg>
      </button>
   );
};
