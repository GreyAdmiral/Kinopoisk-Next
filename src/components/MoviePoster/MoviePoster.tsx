import Image from 'next/image';
import { isExists } from '@tools/isExist';
import type { FC } from 'react';
import type { MoviePosterProps } from './types';
import styles from './MoviePoster.module.scss';

export const MoviePoster: FC<MoviePosterProps> = ({ posterUrl, title }) => {
   const notFoundTitle = 'Не найдено';
   const alternateText = 'Постер фильма';
   const posterWidth = 304;
   const posterHeight = 456;
   const validatedTitle = isExists(title) ? title : notFoundTitle;

   return (
      <div className={styles.movie_left_sidebar_poster}>
         <Image
            src={posterUrl}
            width={posterWidth}
            height={posterHeight}
            unoptimized={true}
            // quality={85}
            placeholder="empty"
            priority={true}
            alt={validatedTitle || alternateText}
         />
      </div>
   );
};
