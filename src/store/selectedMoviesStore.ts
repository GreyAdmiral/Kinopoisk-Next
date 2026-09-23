import { getSelectedInfo } from '@tools/getSelectedInfo';
import type { MovieProps, SavedMovies, SelectedMovie } from '@typesfolder/types';

import type { Cb } from './types';

const STORAGE_KEY = 'selectedMovies';
const EMPTY: SavedMovies = [];

function readFromStorage(): SavedMovies {
   if (typeof window === 'undefined') return EMPTY;

   try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return EMPTY;
      const parsed: unknown = JSON.parse(raw);

      return Array.isArray(parsed) ? (parsed as SavedMovies) : EMPTY;
   } catch {
      return EMPTY;
   }
}

const listeners = new Set<Cb>();
let snapshot: SavedMovies = readFromStorage();
let snapshotIds: ReadonlySet<string> = new Set(snapshot.map(([id]) => id));

function emit(): void {
   listeners.forEach((listener) => listener());
}

function setSnapshot(next: SavedMovies): void {
   if (next.length === snapshot.length && next.every(([id], i) => id === snapshot[i][0])) {
      return;
   }

   snapshot = next;
   snapshotIds = new Set(next.map(([id]) => id));

   if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
   }

   emit();
}

export const selectedMoviesStore = {
   subscribe(listener: Cb): Cb {
      listeners.add(listener);

      return () => {
         listeners.delete(listener);
      };
   },

   getSnapshot(): SavedMovies {
      return snapshot;
   },

   getServerSnapshot(): SavedMovies {
      return EMPTY;
   },

   has(id: string): boolean {
      return snapshotIds.has(String(id));
   },

   toggle(movie: MovieProps): void {
      const map = new Map<string, SelectedMovie>(snapshot);
      const key = String(movie.kinopoiskId);

      if (map.has(key)) {
         map.delete(key);
      } else {
         map.set(key, getSelectedInfo(movie));
      }

      setSnapshot([...map.entries()]);
   },

   reset(): void {
      if (snapshot.length === 0) return;
      setSnapshot(EMPTY);
   },
};
