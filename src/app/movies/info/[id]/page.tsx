import { notFound } from 'next/navigation';
import { MovieInfo } from '@/components/MovieInfo/MovieInfo';
import { MovieLinks } from '@/components/MovieLinks/MovieLinks';
import { MoviePoster } from '@components/MoviePoster/MoviePoster';
import { ScrollArrows } from '@components/ScrollArrows/ScrollArrows';
import { Services } from '@services/Kinopoisk';
import { brandTitle } from '@tools/costants';
import type { Metadata } from 'next';
import type { Props } from './types';
import styles from './page.module.scss';

export async function generateMetadata({ params: { id = '' } }: Props): Promise<Metadata> {
   const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/movies/info/${id}`;
   const hotScreenShot = `https://mini.s-shot.ru/?${pageUrl}`;
   const unknownTitle = 'Неизвестный фильм';
   const movie = await Services.getMovie(id);
   const { nameRu, nameEn, nameOriginal, description, shortDescription, posterUrl, posterUrlPreview } = movie || {};
   const title = nameRu || nameEn || nameOriginal;
   let defaultDescription = `Неофициальный кинопоиск.`;

   if (title) {
      defaultDescription += ` Страница «${title}»`;
   }

   return {
      title: `${title || unknownTitle} | Неофициальный кинопоиск`,
      description: description || shortDescription || defaultDescription,
      openGraph: {
         images: [
            {
               url: `${posterUrl || posterUrlPreview || hotScreenShot}`,
            },
         ],
         siteName: brandTitle,
         type: 'website',
         locale: 'ru',
         url: pageUrl,
      },
   };
}

export default async function MoviePage({ params: { id = '' } }: Props) {
   const schemeTypeAttr = 'https://schema.org/Movie';
   const movie = await Services.getMovie(id);

   if (!id || !movie) {
      notFound();
   }

   const { nameRu, nameEn, nameOriginal, posterUrl, posterUrlPreview, webUrl } = movie;
   const title = nameRu || nameEn || nameOriginal;

   return (
      <>
         <div className={styles.movie} itemScope itemType={schemeTypeAttr}>
            <div className={styles.movie_left_sidebar}>
               <MoviePoster posterUrl={posterUrl || posterUrlPreview} title={title} />
            </div>

            <div className={styles.movie_content}>
               <MovieInfo movie={movie} />
               <MovieLinks id={id} webUrl={webUrl} />
            </div>
         </div>

         <ScrollArrows />
      </>
   );
}
