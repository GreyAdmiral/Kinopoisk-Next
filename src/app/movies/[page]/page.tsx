import { notFound } from 'next/navigation';
import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import { Movie } from '@components/Movie/Movie';
import { Pagination } from '@/components/Pagination/Pagination';
import { DownloadNotification } from '@/components/DownloadNotification/DownloadNotification';
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
         <MoviesCard>{movies && movies.map((movie) => <Movie key={movie.kinopoiskId} movie={movie} />)}</MoviesCard>
         <Pagination totalPages={totalPages} total={total} page={page} />

         <DownloadNotification />
      </>
   );
}
