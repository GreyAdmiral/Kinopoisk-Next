'use client';
import { useEffect } from 'react';

export const LoadedComponent = () => {
   useEffect(() => {
      const isSubmit = document.documentElement.hasAttribute('data-submite');

      if (isSubmit) {
         document.body.dispatchEvent(new CustomEvent('loaded'));
      }
   });

   return null;
};
