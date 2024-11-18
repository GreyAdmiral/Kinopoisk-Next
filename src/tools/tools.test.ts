import { describe, expect, test } from 'vitest';
import { downloadCSV } from './downloadCSV';
import { getCSVLine } from './getCSVLine';
import { getErrorInfo } from './getErrorInfo';
import { getFilteredFilms } from './getFilteredFilms';
import { getSchemeIconId } from './getSchemeIconId';
import { getSelectedInfo } from './getSelectedInfo';
import { getFilteredDescription } from './getFilteredDescription';
import { isExists } from './isExist';
import { MovieProps, SchemeName, SelectedMovie } from '@typesfolder/types';

describe('Тесты вспомогательных функций', () => {
   test('Тест функции downloadCSV', () => {
      expect(downloadCSV('lorem ipsum', 'testfile')).toBeUndefined();
   });

   test('Тест функции getCSVLine', () => {
      const movie: SelectedMovie = {
         id: 'abc',
         name: 'Lorem ipsum',
         year: 1234,
         type: 'film',
         posterUrl: '',
         countries: 'Russia',
         genres: 'Horror',
      };

      const expectedCSVLine = `"${movie.id}","${movie.name}","${movie.year}","${movie.type}","${movie.posterUrl}","${movie.countries}","${movie.genres}"`;
      const result = getCSVLine(movie);

      expect(result).toEqual(expectedCSVLine);
   });

   test('Тест функции getErrorInfo', () => {
      expect(getErrorInfo(401)).toBe('Wrong token.');
      expect(getErrorInfo(402)).toBe('Request limit exceeded.');
      expect(getErrorInfo(403)).toBe('Request limit exceeded.');
      expect(getErrorInfo(404)).toBe('Request limit exceeded.');
      expect(getErrorInfo(429)).toBe('Too many requests.');
      expect(getErrorInfo(500)).toBe('Looks like there was a problem.');
      expect(getErrorInfo('default')).toBe('Looks like there was a problem.');
   });

   test('Тест функции getFilteredFilms', () => {
      const movies: MovieProps[] = [
         {
            kinopoiskId: '1252447',
            imdbId: 'tt9257638',
            nameRu: 'Лорды раздевалки',
            nameEn: '',
            nameOriginal: 'Lords of the Lockerroom',
            countries: [
               {
                  country: 'США',
               },
            ],
            genres: [
               {
                  genre: 'спорт',
               },
               {
                  genre: 'для взрослых',
               },
            ],
            ratingKinopoisk: 9.4,
            ratingImdb: 9.4,
            year: 1999,
            type: 'VIDEO',
            posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/1252447.jpg',
            posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/1252447.jpg',
         },
         {
            kinopoiskId: '1201206',
            imdbId: '',
            nameRu: '',
            nameEn: '',
            nameOriginal: 'BTS: Blood Sweat & Tears',
            countries: [
               {
                  country: 'Корея Южная',
               },
            ],
            genres: [
               {
                  genre: 'музыка',
               },
               {
                  genre: 'короткометражка',
               },
            ],
            ratingKinopoisk: 9.4,
            ratingImdb: null,
            year: 2016,
            type: 'VIDEO',
            posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/1201206.jpg',
            posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/1201206.jpg',
         },
      ];
      const filteredMovies = getFilteredFilms(movies);

      expect(filteredMovies).toEqual([
         {
            kinopoiskId: '1201206',
            imdbId: '',
            nameRu: '',
            nameEn: '',
            nameOriginal: 'BTS: Blood Sweat & Tears',
            countries: [
               {
                  country: 'Корея Южная',
               },
            ],
            genres: [
               {
                  genre: 'музыка',
               },
               {
                  genre: 'короткометражка',
               },
            ],
            ratingKinopoisk: 9.4,
            ratingImdb: null,
            year: 2016,
            type: 'VIDEO',
            posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/1201206.jpg',
            posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/1201206.jpg',
         },
      ]);
      expect(filteredMovies.length).toBe(1);
   });

   test('Тест функции getSchemeIconId', () => {
      expect(getSchemeIconId('light' as SchemeName)).toBe('dark');
      expect(getSchemeIconId('dark' as SchemeName)).toBe('light');
      expect(getSchemeIconId('unknown' as SchemeName)).toBe('light');
      expect(getSchemeIconId('' as SchemeName)).toBe('light');
   });

   test('Тест функции getSelectedInfo', () => {
      const movie = {
         kinopoiskId: '12345',
         imdbId: null,
         nameRu: 'Название на русском',
         nameEn: 'Название на английском',
         nameOriginal: 'Оригинальное название',
         year: 2023,
         type: 'movie',
         posterUrl: 'poster.jpg',
         posterUrlPreview: 'poster.jpg',
         ratingKinopoisk: null,
         ratingImdb: null,
         countries: [{ country: 'Россия' }, { country: 'США' }],
         genres: [{ genre: 'Драма' }, { genre: 'Комедия' }],
      };

      const expectedResult = {
         id: '12345',
         name: 'Название на русском',
         year: 2023,
         type: 'movie',
         posterUrl: 'poster.jpg',
         countries: 'Россия / США',
         genres: 'Драма / Комедия',
      };
      const result = getSelectedInfo(movie as MovieProps);

      expect(result).toEqual(expectedResult);
   });

   test('Тест функции getFilteredDescription', () => {
      const movieDescription = {
         kinopoiskId: '305',
         kinopoiskHDId: '4b012',
         imdbId: 'tt0183649',
         nameRu: 'Phone Booth',
         nameEn: 'Phone Booth',
         nameOriginal: 'Phone Booth',
         posterUrl: '305.jpg',
         posterUrlPreview: '305.jpg',
         coverUrl: 'avatars.mds.yandex.net',
         logoUrl: '',
         reviewsCount: 157,
         ratingGoodReview: 95.0,
         ratingGoodReviewVoteCount: 139,
         ratingKinopoisk: 7.6,
         ratingKinopoiskVoteCount: 174652,
         ratingImdb: 7.1,
         ratingImdbVoteCount: 287675,
         ratingFilmCritics: 6.5,
         ratingFilmCriticsVoteCount: 188,
         ratingAwait: null,
         ratingAwaitCount: 0,
         ratingRfCritics: null,
         ratingRfCriticsVoteCount: 1,
         webUrl: 'film/305/',
         year: 2002,
         filmLength: 81,
         slogan: 'Lorem ipsum',
         description: 'Lorem ipsum dolor sit amet',
         shortDescription: 'Lorem ipsum dolor',
         editorAnnotation: null,
         isTicketsAvailable: false,
         productionStatus: null,
         type: 'FILM',
         ratingMpaa: 'r',
         ratingAgeLimits: 'age18',
         countries: [
            {
               country: 'США',
            },
         ],
         genres: [
            {
               genre: 'триллер',
            },
         ],
         startYear: null,
         endYear: null,
         serial: false,
         shortFilm: false,
         completed: false,
         hasImax: false,
         has3D: false,
         lastSync: '2024-07-14T14:12:14.77372',
      };
      const desscription = {
         nameRu: 'Phone Booth',
         nameEn: 'Phone Booth',
         nameOriginal: 'Phone Booth',
         posterUrl: '305.jpg',
         description: 'Lorem ipsum dolor sit amet',
         shortDescription: 'Lorem ipsum dolor',
         webUrl: 'film/305/',
      };

      expect(getFilteredDescription(movieDescription)).toEqual(desscription);
   });

   test('Тест функции isExists', () => {
      expect(isExists('hello')).toBeTruthy();
      expect(isExists('')).toBeFalsy();
      expect(isExists('N/A')).toBeFalsy();
      expect(isExists(undefined)).toBeFalsy();
      expect(isExists('false')).toBeTruthy();
   });
});
