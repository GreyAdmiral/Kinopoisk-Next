import { SelectedMovie } from '@typesfolder/types';
import { isJSON } from './isJSON';

export function getSavedMovies(key: string): Array<[string, SelectedMovie]> {
   const savedMoviesString = sessionStorage.getItem(key) || '';
   return isJSON(savedMoviesString) ? JSON.parse(savedMoviesString) : [];
}
