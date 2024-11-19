import { notFound } from 'next/navigation';
import { MovieInfo } from '@/components/MovieInfo/MovieInfo';
import { MovieLinks } from '@/components/MovieLinks/MovieLinks';
import { MoviePoster } from '@components/MoviePoster/MoviePoster';
import { Services } from '@services/Kinopoisk';
import type { Props } from './types';
import styles from './page.module.scss';

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

            {/* <div className={styles.movie_hero_trailer}></div> */}
         </div>

         <div className={styles.movie_content}>
            <MovieInfo movie={movie} />
            <MovieLinks id={id} webUrl={webUrl} />
         </div>
      </div>
   );
}
