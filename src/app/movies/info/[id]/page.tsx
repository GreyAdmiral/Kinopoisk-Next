import { notFound } from 'next/navigation';
import { MovieInfo } from '@/components/MovieInfo/MovieInfo';
import { MovieLinks } from '@/components/MovieLinks/MovieLinks';
import { MoviePoster } from '@components/MoviePoster/MoviePoster';
import { Services } from '@services/Kinopoisk';
import type { Metadata } from 'next';
import type { Props } from './types';
import styles from './page.module.scss';

export async function generateMetadata({ params: { id = '' } }: Props): Promise<Metadata> {
   const movie = await Services.getMovie(id);
   const { nameRu, nameEn, nameOriginal } = movie;
   const title = nameRu || nameEn || nameOriginal;

   return {
      title: `Неофициальный кинопоиск | «${title}»`,
      description: `Неофициальный кинопоиск. Страница фильма «${title}».`,
   };
}

export default async function MoviePage({ params: { id = '' } }: Props) {
   const movie = await Services.getMovie(id);

   if (!movie || !id) {
      notFound();
   }

   const { nameRu, nameEn, nameOriginal, posterUrl, webUrl } = movie;
   const title = nameRu || nameEn || nameOriginal;

   return (
      <div className={styles.movie}>
         <div className={styles.movie_left_sidebar}>
            <MoviePoster posterUrl={posterUrl} title={title} />
         </div>

         <div className={styles.movie_content}>
            <MovieInfo movie={movie} />
            <MovieLinks id={id} webUrl={webUrl} />
         </div>
      </div>
   );
}
