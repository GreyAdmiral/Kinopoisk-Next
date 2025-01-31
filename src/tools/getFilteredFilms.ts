import { MovieProps } from '@typesfolder/types';

export function getFilteredFilms(array: MovieProps[] = []) {
   return array.filter((it: MovieProps) => !it.genres.some((el) => el.genre === 'для взрослых'));
}
