'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { SPRITE_PATH, THEMES } from '@tools/costants';
import { getSchemeIconId } from '@tools/getSchemeIconId';

import styles from './ColorSchemeButton.module.scss';

export const ColorSchemeButton = () => {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState<boolean>(false);
   const ariaText = theme === THEMES.LIGHT ? 'тёмную' : 'светлую';
   const buttonsIconSize = 24;

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   return (
      <button
         type="button"
         className={styles.scheme_button}
         onClick={() => setTheme(getSchemeIconId(theme ?? THEMES.DEFAULT))}
         title={`Выбрать ${ariaText} тему`}
         aria-label={`Выбрать ${ariaText} тему`}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${getSchemeIconId(theme ?? THEMES.DEFAULT)}`} />
         </svg>
      </button>
   );
};
