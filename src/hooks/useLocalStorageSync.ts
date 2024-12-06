import { useCallback, useSyncExternalStore } from 'react';

export function useLocalStorageSync(key: string, initValue: string = '') {
   const getSnapshot = () => {
      const item = localStorage.getItem(key);
      return item !== null ? item : initValue;
   };

   const getServerSnapshot = () => initValue;

   const subscribe = useCallback(
      (cb: () => void) => {
         const handleStorageChsnge = (e: StorageEvent) => {
            if (e.key === key) {
               cb();
            }
         };

         window.addEventListener('storage', handleStorageChsnge);

         return () => {
            window.removeEventListener('storage', handleStorageChsnge);
         };
      },
      [key]
   );

   const localStorageValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

   const setLocalStorageValue = (newValue: string) => {
      if (newValue) {
         localStorage.setItem(key, newValue);
      } else {
         localStorage.removeItem(key);
      }
   };

   return [localStorageValue, setLocalStorageValue] as const;
}
