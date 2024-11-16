'use client';
import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLocalStorageSync } from '@/hooks/useLocalStorageSync';

export const FirstColorScheme = () => {
   const [saveScheme] = useLocalStorageSync('userScheme', '');
   const isAutoDark = useMediaQuery('(prefers-color-scheme: dark)');

   useEffect(() => {
      const schemeName = `${saveScheme ? saveScheme : isAutoDark ? 'dark' : 'light'}`;
      document.documentElement.dataset.theme = schemeName;
   }, [isAutoDark, saveScheme]);

   return null;
};
