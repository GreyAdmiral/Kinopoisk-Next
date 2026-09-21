import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DownloadNotification } from '@components/DownloadNotification/DownloadNotification';
import { MoreButton } from '@components/MoreButton/MoreButton';
import { Movie } from '@components/Movie/Movie';
import { MoviesCard } from '@components/MoviesCard/MoviesCard';
import { Pagination } from '@components/Pagination/Pagination';
import { ScrollArrows } from '@components/ScrollArrows/ScrollArrows';
import { Services } from '@services/Kinopoisk';
import { brandTitle, DEFAULT_SORTED_METHOD } from '@tools/costants';

import { ErrorComponent } from '@/components/ErrorComponent/ErrorComponent';
import { LoadedComponent } from '@/components/LoadedComponent/LoadedComponent';
import { NotFoundResult } from '@/components/NotFoundResult/NotFoundResult';
import { QueryShow } from '@/components/QueryShow/QueryShow';
import { prepareMovies } from '@/tools/prepareMovies';

import type { Props } from './types';

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
   const { page = '' } = await params;
   const { keyword = '' } = await searchParams;
   const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/movies/${page}`;
   const hotScreenShot = `https://mini.s-shot.ru/?${encodeURIComponent(pageUrl)}`;
   const description = `${brandTitle} - ищите фильмы по ключевым словам и наслаждайтесь просмотром совершенно бесплатно!`;
   const title = keyword ? `${brandTitle} | Поиск по словам «${keyword}»` : brandTitle;

   return {
      title: title,
      description: description,
      openGraph: {
         images: [
            {
               url: `${hotScreenShot}`,
            },
         ],
         siteName: brandTitle,
         title: title,
         type: 'website',
         locale: 'ru',
         url: pageUrl,
      },
   };
}

export default async function MoviesPage({ params, searchParams }: Props) {
   const { page } = await params;
   const { keyword = '', reversed = '', sorted = DEFAULT_SORTED_METHOD } = await searchParams;
   const pageNumber = Number(page);

   if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      notFound();
   }

   const { total, totalPages, items: rawMovies, error } = await Services.getMovies(page, keyword);

   if (!error && totalPages > 0 && pageNumber > totalPages) {
      notFound();
   }

   const movies = rawMovies.length ? prepareMovies(rawMovies, { sorted, reversed }) : rawMovies;
   const hasMovies = movies.length > 0;
   const desktopQuery = '(min-width: 769px)';
   const mobileQuery = '(max-width: 768.5px)';

   return (
      <>
         <MoviesCard>
            {hasMovies && (
               <>
                  <QueryShow query={desktopQuery}>
                     {movies.map((movie, idx) => (
                        <Movie key={`${movie.kinopoiskId}-${idx}`} movie={movie} />
                     ))}

                     <LoadedComponent />
                  </QueryShow>

                  <QueryShow query={mobileQuery}>
                     <MoreButton
                        key={`${keyword}-${sorted}-${reversed}`}
                        page={page}
                        searchParams={{ keyword: keyword, reversed, sorted }}
                        totalPages={totalPages}
                     />
                  </QueryShow>
               </>
            )}

            {!hasMovies && keyword && <NotFoundResult />}
            {error && <ErrorComponent message={error} />}
         </MoviesCard>

         <QueryShow query={desktopQuery}>
            {hasMovies && (
               <Pagination
                  totalPages={totalPages}
                  total={total}
                  page={page}
                  searchParams={{ keyword: keyword, reversed, sorted }}
               />
            )}
         </QueryShow>

         <DownloadNotification />
         {hasMovies && <ScrollArrows />}
      </>
   );
}
