import { useSyncExternalStore } from 'react';

export function useSessionStorageSync(key: string, initValue: string = '') {
   const getSnapshot = () => {
      const item = sessionStorage.getItem(key);
      return item !== null ? item : initValue;
   };

   const getServerSnapshot = () => initValue;

   const subscribe = (cb: () => void) => {
      const handleStorageChsnge = (e: StorageEvent) => {
         if (e.key === key) {
            cb();
         }
      };

      window.addEventListener('storage', handleStorageChsnge);

      return () => {
         window.removeEventListener('storage', handleStorageChsnge);
      };
   };

   const sessionStorageValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

   const setSessionStorageValue = (newValue: string) => {
      if (newValue) {
         const value = typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
         sessionStorage.setItem(key, value);
      } else {
         sessionStorage.removeItem(key);
      }
   };

   return [sessionStorageValue, setSessionStorageValue] as const;
}
