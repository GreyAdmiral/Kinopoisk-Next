import Link from 'next/link';
import Image from 'next/image';
import { CustomCheckBox } from '@components/CustomCheckBox/CustomCheckBox';
import { getCountriesString, getGenresString } from '@tools/getStringFromMovieField';
// import { getAlias } from '@tools/getAlias';
import type { FC } from 'react';
import type { Props } from './types';
import styles from './Movie.module.scss';
import loadingImage from '@assets/images/loading.svg?url';

export const Movie: FC<Props> = ({ movie }) => {
   const alternateText = 'Постер фильма';
   const linkTitle = 'Подробнее...';
   const linkTitleAttribut = 'Посмотреть подробности';
   const movieTitle = movie.nameRu || movie.nameEn || movie.nameOriginal;
   // const linkAlias = encodeURI(getAlias(movie.nameEn || movie.nameOriginal || movie.nameRu));
   const blurPlaceholderImage =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA70lEQVR4AQXBTUvCcADA4Z/7z9xcmbEpdSg6CBYGRUcr6WJvUESfqHN07Jt47hBdBV/AFg2FYTGd2DZzmJiz54ndnpUX51cldvcvSWoqufwGcVlgmlX01CpLmsbD4xMiZ2zeS8MQNRgQX1Gweg6/owGvLxUyxjq2+4VtO8haPIGKxKfdxfpzmUgKruMSxX4QiqDfs2i1A+RwMmM+hsr4nbSvcnNaZHnqE8yTNDpvROGU7FYSueX3MUcuqbUExYsd9jICY66yyOrUm22aHY/vmYec304jRIRuaJROjmg8V/G8IXflawoHhxx/1KjVu/wDycJbrJ7yuz0AAAAASUVORK5CYII=';
   const content = [
      {
         title: 'Год выпуска: ',
         text: movie.year,
      },
      {
         title: 'Страна: ',
         text: getCountriesString(movie.countries),
      },
      {
         title: 'Жанр: ',
         text: getGenresString(movie.genres),
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
                  unoptimized={true}
                  // quality={100}
                  fill={true}
                  // sizes="138px"
                  placeholder="blur"
                  blurDataURL={blurPlaceholderImage}
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

            <CustomCheckBox key={movieTitle + movie.kinopoiskId + movie.year} movie={movie} />
         </div>
      </article>
   );
};
