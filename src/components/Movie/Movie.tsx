import Link from 'next/link';
import Image from 'next/image';
import { CustomCheckBox } from '@components/CustomCheckBox/CustomCheckBox';
import { getStringFromValue } from '@/tools/getStringFromValue';
import { BLUR_PLACEHOLDER_IMAGE } from '@tools/costants';
// import { getAlias } from '@tools/getAlias';
import type { FC } from 'react';
import type { Props } from './types';
import styles from './Movie.module.scss';
import videotypes from '@data/videotypes.json';
import loadingImage from '@assets/images/loading.svg?url';

const videoTypesTranslator = new Proxy(videotypes, {
   get(target: Record<string, string>, prop: string) {
      if (prop in target) {
         return target[prop];
      } else {
         return prop ?? '';
      }
   },
});

export const Movie: FC<Props> = ({ movie }) => {
   const alternateText = 'Постер фильма';
   const linkTitle = 'Подробнее...';
   const movieTitle = movie.nameRu || movie.nameEn || movie.nameOriginal;
   const linkLabelAttribut = `Информация о фильме ${movieTitle}`;
   // const linkAlias = encodeURI(getAlias(movie.nameEn || movie.nameOriginal || movie.nameRu));
   const content = [
      {
         title: 'Год выпуска: ',
         text: movie.year,
      },
      {
         title: 'Страна: ',
         text: getStringFromValue(movie.countries, 'country'),
      },
      {
         title: 'Жанр: ',
         text: getStringFromValue(movie.genres, 'genre'),
      },
      {
         title: 'Тип: ',
         text: videoTypesTranslator[movie.type],
      },
   ];

   return (
      <article className={styles.movie} id={movie.kinopoiskId}>
         <div className={styles.movie_header}>
            <h2 className={styles.movie_title}>{movieTitle}</h2>

            <div className={styles.movie_rating}>
               {movie.ratingKinopoisk && <span className={styles.movie_rating_kip}>{`kp ${movie.ratingKinopoisk || 0}`}</span>}
               {movie.ratingImdb && <span className={styles.movie_rating_imdb}>{`imdb ${movie.ratingImdb || 0}`}</span>}
            </div>
         </div>

         <div className={styles.movie_body}>
            <div className={styles.movie_image}>
               <Image
                  src={movie.posterUrlPreview || movie.posterUrl || loadingImage}
                  // quality={95} // * Включить на нормальном хостинге
                  fill={true}
                  sizes="360px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER_IMAGE}
                  loading="lazy"
                  unoptimized={true} // * Выключить на нормальном хостинге
                  alt={movie.nameOriginal || alternateText}
                  // key={movie.kinopoiskId + movie.nameRu + movie.nameEn + movie.nameOriginal}
               />
            </div>

            <div className={styles.movie_text}>
               <div className={styles.movie_text_title}>
                  {content.map((it) => (
                     <div key={it.title} className={styles.movie_text_row}>
                        <span>{it.title}</span>
                        {it.text}
                     </div>
                  ))}

                  <Link
                     href={`/movies/info/${movie.kinopoiskId}`}
                     // as={`/movies/info/${linkAlias}`}
                     className={styles.movie_link}
                     aria-label={linkLabelAttribut}
                  >
                     {linkTitle}
                  </Link>
               </div>
            </div>

            <CustomCheckBox key={movieTitle + movie.kinopoiskId + movie.year} movie={movie} />
         </div>
      </article>
   );
};
