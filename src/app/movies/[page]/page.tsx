import type { Props, FetchOptions } from './types';
import type { MoviesProps } from '@typesfolder/types';
import styles from './page.module.scss';

async function getMovies(number: string): Promise<MoviesProps> {
   const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}?page=${number}`;
   const options: FetchOptions = {
      method: 'GET',
      headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY!, 'Content-Type': 'application/json' },
   };

   let movies = [];

   try {
      const res = await fetch(baseUrl, options);

      if (!res.ok) {
         throw new Error('Ошибка получения страниц!');
      }

      movies = await res.json();
   } catch (err) {
      console.error(err);
   }

   return movies;
}

export default async function MoviesPage({ params: { page }, searchParams: { search } }: Props) {
   const { total, totalPages, items: movies } = await getMovies(page);

   console.log('search: ', search); // ! Log
   console.log('total: ', total); // ! Log
   console.log('totalPages: ', totalPages); // ! Log

   return (
      <>
         <div className={styles.movies}>
            {movies.length &&
               movies.map((movie) => <div key={movie.kinopoiskId}>{JSON.stringify(movie, null, 3)}</div>)}
         </div>
      </>
   );
}
