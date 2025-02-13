import { notFound } from 'next/navigation';
import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import { Movie } from '@components/Movie/Movie';
import { QueryShow } from '@/components/QueryShow/QueryShow';
import { Pagination } from '@components/Pagination/Pagination';
import { MoreButton } from '@components/MoreButton/MoreButton';
import { DownloadNotification } from '@components/DownloadNotification/DownloadNotification';
import { ScrollArrows } from '@components/ScrollArrows/ScrollArrows';
import { NotFoundResult } from '@/components/NotFoundResult/NotFoundResult';
import { ErrorComponent } from '@/components/ErrorComponent/ErrorComponent';
import { LoadedComponent } from '@/components/LoadedComponent/LoadedComponent';
import { getCensoredFilms } from '@/tools/getCensoredFilms';
import { getSortedMovies } from '@tools/getSortedMovies';
import { defaulSortedMethod } from '@tools/costants';
import { Services } from '@services/Kinopoisk';
import type { Metadata } from 'next';
import type { Props } from './types';

export async function generateMetadata({
   params: { page = '' },
   searchParams: { keyword = '' },
}: Props): Promise<Metadata> {
   let title = `Неофициальный кинопоиск | Страница «${page}»`;
   let description = `Неофициальный кинопоиск - ищите фильмы по ключевым словам и наслаждайтесь просмотром совершенно бесплатно!`;

   if (keyword) {
      title += ` | Поиск по словам «${decodeURIComponent(keyword)}»`;
   }

   return {
      title: title,
      description: description,
   };
}

export default async function MoviesPage({ params: { page = '' }, searchParams }: Props) {
   const { keyword = '', reversed = '', sorted = defaulSortedMethod } = searchParams;
   let { total, totalPages, items: movies, error } = await Services.getMovies(page, keyword);
   const isMoviesLength = Boolean(movies.length);

   if (!Number.isInteger(+page) || !Number.isFinite(+page)) {
      notFound();
   }

   if (isMoviesLength) {
      movies = getCensoredFilms(movies);

      if (sorted) {
         movies = getSortedMovies({ method: sorted, movies: movies });
      }

      if (reversed) {
         movies.reverse();
      }
   }

   return (
      <>
         <MoviesCard>
            {isMoviesLength && (
               <>
                  <QueryShow query={'(min-width: 769px)'}>
                     {movies.map((movie, idx) => (
                        <Movie key={`${movie.kinopoiskId}-${idx}`} movie={movie} />
                     ))}

                     <LoadedComponent />
                  </QueryShow>

                  <QueryShow query={'(max-width: 768.5px)'}>
                     <MoreButton page={page} searchParams={searchParams} totalPages={totalPages} />
                  </QueryShow>
               </>
            )}

            {!isMoviesLength && keyword && <NotFoundResult />}
            {error && <ErrorComponent message={error} />}
         </MoviesCard>

         <QueryShow query={'(min-width: 769px)'}>
            {isMoviesLength && (
               <Pagination totalPages={totalPages} total={total} page={page} searchParams={searchParams} />
            )}
         </QueryShow>

         <DownloadNotification />
         {isMoviesLength && <ScrollArrows />}
      </>
   );
}
