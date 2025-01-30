import { useCallback, useSyncExternalStore } from 'react';
import { throttle } from '@tools/throttle';

export function useScrollY() {
   const getSnapshot = () => {
      return Math.round(scrollY);
   };

   const getServerSnapshot = () => 0;

   const subscribe = useCallback((cb: () => void) => {
      const handler = throttle(cb, 200);

      window.addEventListener('scroll', handler);

      return () => {
         window.removeEventListener('scroll', handler);
      };
   }, []);

   return useSyncExternalStore(subscribe as () => () => void, getSnapshot, getServerSnapshot);
}
