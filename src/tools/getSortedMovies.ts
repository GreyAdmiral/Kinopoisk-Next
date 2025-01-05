import type { MovieProps, SortedMethod } from '@typesfolder/types';
import { getCountriesString, getGenresString } from './getStringFromMovieField';

interface Arguments {
   method: SortedMethod;
   movies: MovieProps[];
}

function getBooleanSortedNumber(a: unknown, b: unknown): number {
   if (a && !b) {
      return 1;
   } else if (!a && b) {
      return -1;
   }

   return 0;
}

export function getSortedMovies({ method, movies }: Arguments): MovieProps[] {
   let result: MovieProps[] = [];

   switch (method) {
      case 'country':
         result = movies.sort((a, b) =>
            a.countries && b.countries
               ? getCountriesString(a.countries).localeCompare(getCountriesString(b.countries))
               : getBooleanSortedNumber(a.countries, b.countries)
         );
         break;

      case 'genre':
         result = movies.sort((a, b) =>
            a.genres && b.genres
               ? getGenresString(a.genres).localeCompare(getGenresString(b.genres))
               : getBooleanSortedNumber(a.genres, b.genres)
         );
         break;

      case 'ratingImdb':
         result = movies.sort((a, b) =>
            a.ratingImdb && b.ratingImdb
               ? +a.ratingImdb - +b.ratingImdb
               : getBooleanSortedNumber(a.ratingImdb, b.ratingImdb)
         );
         break;

      case 'ratingKinopoisk':
         result = movies.sort((a, b) =>
            a.ratingKinopoisk && b.ratingKinopoisk
               ? +a.ratingKinopoisk - +b.ratingKinopoisk
               : getBooleanSortedNumber(a.ratingKinopoisk, b.ratingKinopoisk)
         );
         break;

      case 'title':
         result = movies.sort((a, b) => {
            const aTitle = a.nameRu || a.nameEn || a.nameOriginal;
            const bTitle = b.nameRu || b.nameEn || b.nameOriginal;

            return aTitle && bTitle ? aTitle.localeCompare(bTitle) : getBooleanSortedNumber(aTitle, bTitle);
         });
         break;

      case 'type':
         result = movies.sort((a, b) =>
            a.type && b.type ? a.type.localeCompare(b.type) : getBooleanSortedNumber(a.type, b.type)
         );
         break;

      case 'year':
         result = movies.sort((a, b) =>
            a.year && b.year ? +a.year - +b.year : getBooleanSortedNumber(a.year, b.year)
         );
         break;

      default:
         result = movies;
         break;
   }

   return result;
}
