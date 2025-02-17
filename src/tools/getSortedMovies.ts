import { getStringFromValue } from './getStringFromValue';
import type { MovieProps, SortedMethod } from '@typesfolder/types';

interface Arguments {
   method: SortedMethod;
   movies: MovieProps[];
}

function getBooleanSortedNumber(a: unknown, b: unknown): number {
   const isNumberA = !Number.isNaN(Number(a));
   const isNumberB = !Number.isNaN(Number(b));

   if (isNumberA && !isNumberB) {
      return 1;
   } else if (!isNumberA && isNumberB) {
      return -1;
   }

   return 0;
}

export function getSortedMovies({ method, movies }: Arguments): MovieProps[] {
   const notEmptyArray = (method: SortedMethod) => movies.filter((it) => (it as Record<string, unknown>)[method]);
   const emptyArray = (method: SortedMethod) => movies.filter((it) => !(it as Record<string, unknown>)[method]);
   let result: MovieProps[] = [...emptyArray(method), ...notEmptyArray(method)];

   switch (method) {
      case 'country':
         result = result.sort((a, b) =>
            a.countries && b.countries
               ? getStringFromValue(a.countries, 'country').localeCompare(getStringFromValue(b.countries, 'country'))
               : getBooleanSortedNumber(a.countries, b.countries)
         );
         break;

      case 'genre':
         result = result.sort((a, b) =>
            a.genres && b.genres
               ? getStringFromValue(a.genres, 'genre').localeCompare(getStringFromValue(b.genres, 'genre'))
               : getBooleanSortedNumber(a.genres, b.genres)
         );
         break;

      case 'ratingImdb':
         result = result.sort((a, b) =>
            a.ratingImdb && b.ratingImdb
               ? +a.ratingImdb - +b.ratingImdb
               : getBooleanSortedNumber(a.ratingImdb, b.ratingImdb)
         );
         break;

      case 'ratingKinopoisk':
         result = result.sort((a, b) =>
            a.ratingKinopoisk && b.ratingKinopoisk
               ? +a.ratingKinopoisk - +b.ratingKinopoisk
               : getBooleanSortedNumber(a.ratingKinopoisk, b.ratingKinopoisk)
         );
         break;

      case 'title':
         result = result.sort((a, b) => {
            const aTitle = a.nameRu || a.nameEn || a.nameOriginal;
            const bTitle = b.nameRu || b.nameEn || b.nameOriginal;

            return aTitle && bTitle ? aTitle.localeCompare(bTitle) : getBooleanSortedNumber(aTitle, bTitle);
         });
         break;

      case 'type':
         result = result.sort((a, b) =>
            a.type && b.type ? a.type.localeCompare(b.type) : getBooleanSortedNumber(a.type, b.type)
         );
         break;

      case 'year':
         result = result.sort((a, b) =>
            a.year && b.year ? +a.year - +b.year : getBooleanSortedNumber(a.year, b.year)
         );
         break;

      default:
         return movies;
   }

   return result;
}
