import Link from 'next/link';
import Image from 'next/image';
import { CustomCheckBox } from '@components/CustomCheckBox/CustomCheckBox';
// import { getAlias } from '@tools/getAlias';
import type { FC } from 'react';
import type { Props } from './types';
import styles from './Movie.module.scss';
import loadingImage from '@assets/images/loading.svg?url';

export const Movie: FC<Props> = ({ movie }) => {
   const separator = ' / ';
   const alternateText = 'Постер фильма';
   const linkTitle = 'Подробнее...';
   const linkTitleAttribut = 'Посмотреть подробности';
   const movieTitle = movie.nameRu || movie.nameEn || movie.nameOriginal;
   // const linkAlias = encodeURI(getAlias(movie.nameEn || movie.nameOriginal || movie.nameRu));
   const content = [
      {
         title: 'Год выпуска: ',
         text: movie.year,
      },
      {
         title: 'Страна: ',
         text: movie.countries.map((country) => country.country).join(separator),
      },
      {
         title: 'Жанр: ',
         text: movie.genres.map((genre) => genre.genre).join(separator),
      },
      {
         title: 'Тип: ',
         text: movie.type,
      },
   ];

   return (
      <article className={styles.movie} id={movie.kinopoiskId}>
         <div className={styles.movie_header}>
            <h2 className={styles.movie_title}>{movieTitle}</h2>

            <div className={styles.movie_rating}>
               {movie.ratingKinopoisk && (
                  <span className={styles.movie_rating_kip}>{`kp ${movie.ratingKinopoisk || 0}`}</span>
               )}
               {movie.ratingImdb && <span className={styles.movie_rating_imdb}>{`imdb ${movie.ratingImdb || 0}`}</span>}
            </div>
         </div>

         <div className={styles.movie_body}>
            <div className={styles.movie_image}>
               <Image
                  src={movie.posterUrlPreview || loadingImage}
                  fill={true}
                  unoptimized={true}
                  placeholder="empty"
                  loading="lazy"
                  alt={movie.nameOriginal || alternateText}
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
                     title={linkTitleAttribut}
                  >
                     {linkTitle}
                  </Link>
               </div>
            </div>

            <CustomCheckBox movie={movie} />
         </div>
      </article>
   );
};
