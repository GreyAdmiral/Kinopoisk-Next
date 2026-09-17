import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MoviePoster } from '@components/MoviePoster/MoviePoster';
import { ScrollArrows } from '@components/ScrollArrows/ScrollArrows';
import { Services } from '@services/Kinopoisk';
import { brandTitle } from '@tools/costants';
import { getFilteredPlayers } from '@tools/getFilteredPlayers';
import { getDataFrameLinks } from '@tools/getFrameLinks';

import { MovieInfo } from '@/components/MovieInfo/MovieInfo';
import { MovieLinks } from '@/components/MovieLinks/MovieLinks';

import styles from './page.module.scss';
import type { Props } from './types';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { id } = await params;
   const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/movies/info/${id}`;
   const hotScreenShot = `https://mini.s-shot.ru/?${pageUrl}`;
   const unknownTitle = 'Неизвестный фильм';
   const movie = await Services.getMovie(id);
   const { nameRu, nameEn, nameOriginal, description, shortDescription, year, posterUrl, posterUrlPreview } = movie || {};
   const title = nameRu || nameEn || nameOriginal || unknownTitle;
   const yearString = year ? ` (${year})` : '';
   const defaultDescription = `Смотреть онлайн ${title}${yearString}`;

   return {
      title: `${title}${yearString} смотреть онлайн бесплатно`,
      description: description || shortDescription || defaultDescription,
      openGraph: {
         images: [
            {
               url: `${posterUrl || posterUrlPreview || hotScreenShot}`,
            },
         ],
         siteName: brandTitle,
         title: `${title}${yearString} смотреть онлайн бесплатно на «${brandTitle}»`,
         type: 'video.movie',
         locale: 'ru',
         url: pageUrl,
      },
   };
}

export default async function MoviePage({ params }: Props) {
   const { id } = await params;
   const schemeTypeAttr = 'https://schema.org/Movie';
   const movie = await Services.getMovie(id);
   const frames = await Services.getDataFrames(id);
   const framesLinks = getFilteredPlayers(getDataFrameLinks(frames));

   if (!id || !movie) {
      notFound();
   }

   const { nameRu, nameEn, nameOriginal, posterUrl, posterUrlPreview, webUrl, year } = movie;
   const title = nameRu || nameEn || nameOriginal;

   return (
      <>
         <div className={styles.movie} itemScope itemType={schemeTypeAttr}>
            <div className={styles.movie_left_sidebar}>
               <MoviePoster posterUrl={posterUrl || posterUrlPreview} title={title} />
            </div>

            <div className={styles.movie_content}>
               <MovieInfo movie={movie} />
               <MovieLinks id={id} webUrl={webUrl} title={title} year={year} frames={framesLinks} />
            </div>
         </div>

         <ScrollArrows />
      </>
   );
}
