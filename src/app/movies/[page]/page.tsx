import { notFound } from 'next/navigation';
import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import { Movie } from '@components/Movie/Movie';
import { QueryShow } from '@/components/QueryShow/QueryShow';
import { Pagination } from '@components/Pagination/Pagination';
import { MoreButton } from '@components/MoreButton/MoreButton';
import { DownloadNotification } from '@components/DownloadNotification/DownloadNotification';
import { Services } from '@services/Kinopoisk';
import type { Props } from './types';
// import styles from './page.module.scss';

export default async function MoviesPage({ params: { page = '' }, searchParams: { search } }: Props) {
   const { total, totalPages, items: movies } = await Services.getMovies(page);

   if (!movies || !Number.isInteger(+page) || !Number.isFinite(+page)) {
      notFound();
   }

   console.log('search: ', search); // ! Log

   return (
      <>
         <MoviesCard>
            {movies && (
               <>
                  {movies.map((movie, idx) => (
                     <Movie key={`${movie.kinopoiskId}-${idx}`} movie={movie} />
                  ))}

                  <QueryShow query={'(max-width: 768.5px)'}>
                     <MoreButton page={page} totalPages={totalPages} />
                  </QueryShow>
               </>
            )}
         </MoviesCard>

         <QueryShow query={'(min-width: 769px)'}>
            <Pagination totalPages={totalPages} total={total} page={page} />
         </QueryShow>

         <DownloadNotification />
      </>
   );
}
