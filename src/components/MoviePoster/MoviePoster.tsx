import Image from 'next/image';
import { isExists } from '@tools/isExist';
import type { FC } from 'react';
import type { MoviePosterProps } from './types';
import styles from './MoviePoster.module.scss';
import loadingImage from '@assets/images/loading.svg?url';

export const MoviePoster: FC<MoviePosterProps> = ({ posterUrl, title }) => {
   const notFoundTitle = 'Не найдено';
   const alternateText = 'Постер фильма';
   const posterWidth = 304;
   const posterHeight = 456;
   const validatedTitle = isExists(title) ? title : notFoundTitle;
   const blurPlaceholderImage =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA70lEQVR4AQXBTUvCcADA4Z/7z9xcmbEpdSg6CBYGRUcr6WJvUESfqHN07Jt47hBdBV/AFg2FYTGd2DZzmJiz54ndnpUX51cldvcvSWoqufwGcVlgmlX01CpLmsbD4xMiZ2zeS8MQNRgQX1Gweg6/owGvLxUyxjq2+4VtO8haPIGKxKfdxfpzmUgKruMSxX4QiqDfs2i1A+RwMmM+hsr4nbSvcnNaZHnqE8yTNDpvROGU7FYSueX3MUcuqbUExYsd9jICY66yyOrUm22aHY/vmYec304jRIRuaJROjmg8V/G8IXflawoHhxx/1KjVu/wDycJbrJ7yuz0AAAAASUVORK5CYII=';

   return (
      <div className={styles.movie_left_sidebar_poster}>
         <Image
            src={posterUrl || loadingImage}
            width={posterWidth}
            height={posterHeight}
            unoptimized={true}
            // quality={100}
            placeholder="blur"
            blurDataURL={blurPlaceholderImage}
            priority={true}
            alt={validatedTitle || alternateText}
         />
      </div>
   );
};
