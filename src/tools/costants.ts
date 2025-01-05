import type { CustomSelectOption, SortedMethod } from '@typesfolder/types';

export const AppRoutes = {
   HOME_ROUTE: '/',
   SEARCH_ROUTE: '/search',
   PAGE_ROUTE: '/movies',
   INFO_ROUTE: '/movie',
   ERROR_ROUTE: '/error',
} as const;

export const SCHEMES = {
   LIGHT: 'light',
   DARK: 'dark',
   DEFAULT: 'light',
};

export const SPRITE_PATH = '/images/sprite.svg';

export const SORT_LIST: CustomSelectOption[] = [
   {
      id: 'years',
      content: 'По году выпуска',
      value: 'year',
   },
   {
      id: 'title',
      content: 'По названию',
      value: 'title',
   },
   {
      id: 'country',
      content: 'По стране',
      value: 'country',
   },
   {
      id: 'genre',
      content: 'По жанру',
      value: 'genre',
   },
   {
      id: 'type',
      content: 'По типу',
      value: 'type',
   },
   {
      id: 'reiting-kp',
      content: 'По рейтингу KP',
      value: 'ratingKinopoisk',
   },
   {
      id: 'reiting-imdb',
      content: 'По рейтингу IMDB',
      value: 'ratingImdb',
   },
];

export const DEFAULT_SORT_POINT_NUMBER = 1;
export const defaulSortedMethod: SortedMethod = SORT_LIST[DEFAULT_SORT_POINT_NUMBER - 1].value || '';
