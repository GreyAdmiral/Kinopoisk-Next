import Link from 'next/link';
import Image from 'next/image';
import { CustomCheckBox } from '@components/CustomCheckBox/CustomCheckBox';
import { getStringFromValue } from '@/tools/getStringFromValue';
import { BLUR_PLACEHOLDER_IMAGE } from '@tools/costants';
import { brandTitle } from '@tools/costants';
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
   const schemeTypeAttr = 'https://schema.org/Movie';
   const alternateText = 'Постер фильма';
   const linkTitle = 'Подробнее...';
   const {
      kinopoiskId,
      nameRu,
      nameEn,
      nameOriginal,
      ratingKinopoisk,
      ratingImdb,
      year,
      type,
      posterUrl,
      posterUrlPreview,
      countries,
      genres,
   } = movie;

   const movieTitle = nameRu || nameEn || nameOriginal;
   const poster = posterUrlPreview || posterUrl || loadingImage;
   const linkLabelAttribut = `Информация о фильме ${movieTitle}`;
   // const linkAlias = encodeURI(getAlias(nameEn || nameOriginal || nameRu));
   const content = [
      {
         title: 'Год выпуска: ',
         text: year,
      },
      {
         title: 'Страна: ',
         text: getStringFromValue(countries, 'country'),
      },
      {
         title: 'Жанр: ',
         text: getStringFromValue(genres, 'genre'),
      },
      {
         title: 'Тип: ',
         text: videoTypesTranslator[type],
      },
   ];

   return (
      <article className={styles.movie} id={kinopoiskId} itemType={schemeTypeAttr}>
         <meta itemProp="brand" content={brandTitle}></meta>
         <meta itemProp="name" content={movieTitle}></meta>
         <meta itemProp="isAccessibleForFree" content="true"></meta>

         <div className={styles.movie_header}>
            <h2 className={styles.movie_title} itemProp="name">
               {movieTitle}
            </h2>

            <div className={styles.movie_rating}>
               {ratingKinopoisk && <span className={styles.movie_rating_kip}>{`kp ${ratingKinopoisk || 0}`}</span>}
               {ratingImdb && <span className={styles.movie_rating_imdb}>{`imdb ${ratingImdb || 0}`}</span>}
            </div>
         </div>

         <div className={styles.movie_body}>
            <div className={styles.movie_image}>
               <Image
                  src={poster}
                  // quality={95} // * Включить на нормальном хостинге
                  fill={true}
                  sizes="360px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER_IMAGE}
                  loading="lazy"
                  unoptimized={true} // * Выключить на нормальном хостинге
                  alt={nameOriginal || alternateText}
                  // key={kinopoiskId + nameRu + nameEn + nameOriginal}
                  itemProp="image"
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
                     href={`/movies/info/${kinopoiskId}`}
                     // as={`/movies/info/${linkAlias}`}
                     className={styles.movie_link}
                     aria-label={linkLabelAttribut}
                  >
                     {linkTitle}
                  </Link>
               </div>
            </div>

            <CustomCheckBox key={movieTitle + kinopoiskId + year} movie={movie} />
         </div>
      </article>
   );
};
