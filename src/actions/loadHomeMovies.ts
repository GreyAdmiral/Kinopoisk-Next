'use server';

import { type RequestOptions, Services } from '@services/Kinopoisk';

export async function loadHomeMovies(page: number, keyword?: string, options: RequestOptions = {}) {
   const result = keyword
      ? await Services.getMovies(String(page), keyword, options)
      : await Services.getBestFilms(String(page), options);

   return result;
}
