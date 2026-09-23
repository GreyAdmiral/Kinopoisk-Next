import { useCallback, useSyncExternalStore } from 'react';

import { selectedMoviesStore } from '@store/selectedMoviesStore';

const isSelected = (id: string) => selectedMoviesStore.has(id);
const getServerSnapshotFalse = () => false;

export function useIsMovieSelected(this: unknown, id: string): boolean {
   const getSnapshot = useCallback(isSelected.bind(this, id), [id]);

   return useSyncExternalStore(selectedMoviesStore.subscribe, getSnapshot, getServerSnapshotFalse);
}

export function useSelectedMovies() {
   const selectedMovies = useSyncExternalStore(
      selectedMoviesStore.subscribe,
      selectedMoviesStore.getSnapshot,
      selectedMoviesStore.getServerSnapshot
   );

   return {
      selectedMovies,
      count: selectedMovies.length,
      isSelected,
      toggleMovie: selectedMoviesStore.toggle,
      resetSelection: selectedMoviesStore.reset,
   };
}
