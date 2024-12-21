import { notFound } from 'next/navigation';
import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import { Movie } from '@components/Movie/Movie';
import { QueryShow } from '@/components/QueryShow/QueryShow';
import { Pagination } from '@components/Pagination/Pagination';
import { MoreButton } from '@components/MoreButton/MoreButton';
import { DownloadNotification } from '@components/DownloadNotification/DownloadNotification';
import { ScrollArrows } from '@components/ScrollArrows/ScrollArrows';
import { Services } from '@services/Kinopoisk';
import type { Metadata } from 'next';
import type { Props } from './types';

export async function generateMetadata({
   params: { page = '' },
   searchParams: { keyword = '' },
}: Props): Promise<Metadata> {
   let title = `Неофициальный кинопоиск | Страница «${page}»`;
   let description = `Неофициальный кинопоиск. Страница «${page}».`;

   if (keyword) {
      title += ` | Поиск по словам «${decodeURIComponent(keyword)}»`;
      description += ` Поиск по словам «${decodeURIComponent(keyword)}»`;
   }

   return {
      title: title,
      description: description,
   };
}

export default async function MoviesPage({ params: { page = '' }, searchParams: { keyword = '' } }: Props) {
   const { total, totalPages, items: movies } = await Services.getMovies(page, keyword);

   if (!movies || !Number.isInteger(+page) || !Number.isFinite(+page)) {
      notFound();
   }

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
            <Pagination totalPages={totalPages} total={total} page={page} keyword={keyword} />
         </QueryShow>

         <DownloadNotification />
         <ScrollArrows />
      </>
   );
}
