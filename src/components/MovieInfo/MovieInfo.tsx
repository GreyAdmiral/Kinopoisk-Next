import { isExists } from '@tools/isExist';
import type { FC } from 'react';
import type { MovieInfoProps } from './types';
import styles from './MovieInfo.module.scss';

export const MovieInfo: FC<MovieInfoProps> = ({ movie }) => {
   const separator = ' / ';
   const notFoundTitle = 'Не найдено';
   const {
      nameRu,
      nameEn,
      nameOriginal,
      description,
      shortDescription,
      year,
      countries,
      genres,
      slogan,
      ratingKinopoisk,
      ratingImdb,
      ratingAgeLimits,
   } = movie;
   const title = nameRu || nameEn || nameOriginal;
   const validatedTitle = isExists(title) ? title : notFoundTitle;
   const content = [
      {
         title: 'Год производства:',
         text: year,
      },
      {
         title: 'Страна:',
         text: countries.map((country) => country.country).join(separator),
      },
      {
         title: 'Жанр:',
         text: genres.map((genre) => genre.genre).join(separator),
      },
      {
         title: 'Слоган:',
         text: slogan,
      },
      {
         title: 'Аннотация:',
         text: shortDescription,
      },
      {
         title: 'Описание:',
         text: description,
      },
      {
         title: 'Возраст:',
         text: ratingAgeLimits ? ratingAgeLimits.toString().replace(/age(\d+)/i, '$1+') : '',
      },
   ];

   return movie ? (
      <article className={styles.movie_info}>
         <div className={styles.movie_info_wrapper}>
            <h2 className={styles.movie_info_title}>{validatedTitle}</h2>

            <div className={styles.movie_info_rating}>
               {ratingKinopoisk && <span className={styles.movie_info_rating_kip}>{`kp ${ratingKinopoisk || 0}`}</span>}
               {ratingImdb && <span className={styles.movie_info_rating_imdb}>{`imdb ${ratingImdb || 0}`}</span>}
            </div>
         </div>

         {content.map((it) =>
            it.text ? (
               <div key={it.title} className={styles.movie_info_text_row}>
                  <span className={styles.movie_info_subtitle}>{it.title}</span>
                  {it.text}
               </div>
            ) : null
         )}
      </article>
   ) : null;
};
