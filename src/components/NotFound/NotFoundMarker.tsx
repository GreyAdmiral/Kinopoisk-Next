'use client';

import { useEffect } from 'react';

import { notFoundStore } from './notFoundStore';

export const NotFoundMarker = () => {
   useEffect(() => {
      notFoundStore.set(true);

      return () => {
         notFoundStore.set(false);
      };
   }, []);

   return null;
};
