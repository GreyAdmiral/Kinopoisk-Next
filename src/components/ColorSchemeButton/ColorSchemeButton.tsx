'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { ButtonSkeleton } from '@components/ButtonSkeleton/ButtonSkeleton';
import { SPRITE_PATH, THEMES } from '@tools/costants';
import { getSchemeIconId } from '@tools/getSchemeIconId';

import styles from './ColorSchemeButton.module.scss';

export const ColorSchemeButton = () => {
   const { resolvedTheme, setTheme } = useTheme();
   const [mounted, setMounted] = useState<boolean>(false);
   const ariaText = resolvedTheme === THEMES.LIGHT ? 'тёмную' : 'светлую';
   const buttonsIconSize = 24;

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return <ButtonSkeleton iconSize={buttonsIconSize} className={styles.scheme_button} />;

   return (
      <button
         type="button"
         className={styles.scheme_button}
         onClick={() => setTheme(getSchemeIconId(resolvedTheme as string))}
         title={`Выбрать ${ariaText} тему`}
         aria-label={`Выбрать ${ariaText} тему`}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use href={`${SPRITE_PATH}#${getSchemeIconId(resolvedTheme as string)}`} />
         </svg>
      </button>
   );
};
