import type { CustomSelectOption, SortedMethod } from '@typesfolder/types';

export const brandTitle = 'Неофициальный Кинопоиск';

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
      breakpoint: '(min-width: 450px)',
   },
   {
      id: 'reiting-imdb',
      content: 'По рейтингу IMDB',
      value: 'ratingImdb',
      breakpoint: '(min-width: 450px)',
   },
];

export const DEFAULT_SORT_POINT_NUMBER = 1;
export const defaulSortedMethod: SortedMethod = SORT_LIST[DEFAULT_SORT_POINT_NUMBER - 1].value || '';

export const BLUR_PLACEHOLDER_IMAGE =
   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA70lEQVR4AQXBTUvCcADA4Z/7z9xcmbEpdSg6CBYGRUcr6WJvUESfqHN07Jt47hBdBV/AFg2FYTGd2DZzmJiz54ndnpUX51cldvcvSWoqufwGcVlgmlX01CpLmsbD4xMiZ2zeS8MQNRgQX1Gweg6/owGvLxUyxjq2+4VtO8haPIGKxKfdxfpzmUgKruMSxX4QiqDfs2i1A+RwMmM+hsr4nbSvcnNaZHnqE8yTNDpvROGU7FYSueX3MUcuqbUExYsd9jICY66yyOrUm22aHY/vmYec304jRIRuaJROjmg8V/G8IXflawoHhxx/1KjVu/wDycJbrJ7yuz0AAAAASUVORK5CYII=';
