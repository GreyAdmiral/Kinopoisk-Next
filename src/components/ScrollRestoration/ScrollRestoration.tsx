'use client';

import { useEffect } from 'react';

export const ScrollRestoration = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return null;
};
