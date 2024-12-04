import { useCallback, useSyncExternalStore } from 'react';
import { throttle } from '@tools/throttle';

export function useScrollY() {
   const getSnapshot = () => {
      return Math.round(scrollY);
   };

   const getServerSnapshot = () => 0;

   const subscribe = useCallback((cb: () => void) => {
      const handler = () => {
         cb();
      };

      const memoHandler = throttle(handler, 200);

      window.addEventListener('scroll', memoHandler);

      return () => {
         window.removeEventListener('scroll', memoHandler);
      };
   }, []);

   return useSyncExternalStore(subscribe as () => () => void, getSnapshot, getServerSnapshot);
}
