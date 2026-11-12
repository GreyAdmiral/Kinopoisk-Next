'use server';

import { RequestOptions, Services } from '@services/Kinopoisk';
import type { MoviesProps } from '@typesfolder/types';

export async function loadHomeMovies(page: number, keyword?: string, options: RequestOptions = {}): Promise<MoviesProps> {
   const result = keyword
      ? await Services.getMovies(String(page), keyword, options)
      : await Services.getBestFilms(String(page), options);

   return result;
}
