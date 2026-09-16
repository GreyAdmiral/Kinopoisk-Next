import { getCensoredFilms } from './getCensoredFilms';
import { getSortedMovies } from './getSortedMovies';
import type { MovieProps, SortedMethod } from '@typesfolder/types';

type Options = {
   sorted?: SortedMethod | string;
   reversed?: string | boolean;
};

export function prepareMovies(movies: MovieProps[], { sorted, reversed }: Options): MovieProps[] {
   let result = getCensoredFilms(movies);

   if (sorted) {
      result = getSortedMovies({ method: sorted as SortedMethod, movies: result });
   }

   if (reversed) {
      result = [...result].reverse();
   }

   return result;
}
