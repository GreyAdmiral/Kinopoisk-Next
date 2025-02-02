import { country, genre, MovieProps } from '@typesfolder/types';

export function getCensoredFilms(array: MovieProps[] = []): MovieProps[] {
   const censored = {
      nameRu: ['Лорды раздевалки'],
      // genres: ['для взрослых'],
   };

   const censoredArray: Array<[string, string[]]> = Object.entries(censored);

   if (!censoredArray.length) {
      return array;
   }

   return array.filter(
      (it: MovieProps) =>
         !censoredArray.some(([key, value]) => {
            const movieLocal = it[key as keyof MovieProps];

            if (Array.isArray(movieLocal)) {
               return value.some((el: string) =>
                  movieLocal.some((it) => (it as genre).genre === el || (it as country).country === el)
               );
            } else {
               return value.includes(movieLocal as string);
            }
         })
   );
}
