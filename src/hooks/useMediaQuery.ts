import { useSyncExternalStore } from 'react';

export const useMediaQuery = (media: string, serverSnapshotInitial: boolean = false) => {
   const getSnapshot = () => window.matchMedia(media).matches;
   const getServerSnapshot = () => serverSnapshotInitial;
   const subscribe = (mediaChange: EventListener) => {
      const matchMedia = window.matchMedia(media);
      matchMedia.addEventListener('change', mediaChange);

      return () => {
         matchMedia.removeEventListener('change', mediaChange);
      };
   };

   return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
