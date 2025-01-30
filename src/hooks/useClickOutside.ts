import { MutableRefObject, useEffect } from 'react';

export const useClickOutside = (ref: MutableRefObject<HTMLTemplateElement | null>, callback: () => void) => {
   const handleClick = (e: Event) => {
      e.stopPropagation();
      const target = e.target as HTMLTemplateElement;

      if (ref.current && !ref.current.contains(target)) {
         callback();
      }
   };

   useEffect(() => {
      document.addEventListener('click', handleClick);

      return () => {
         document.removeEventListener('click', handleClick);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [callback, ref]);
};
