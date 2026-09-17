import Image from 'next/image';
import type { FC } from 'react';

import loadingImage from '@assets/images/loading.svg?url';
import { BLUR_PLACEHOLDER_IMAGE } from '@tools/costants';
import { isExists } from '@tools/isExist';

import styles from './MoviePoster.module.scss';
import type { MoviePosterProps } from './types';

export const MoviePoster: FC<MoviePosterProps> = ({ posterUrl, title }) => {
   const notFoundTitle = 'Не найдено';
   const alternateText = 'Постер фильма';
   const posterWidth = 304;
   const posterHeight = 456;
   const validatedTitle = isExists(title) ? title : notFoundTitle;

   return (
      <div className={styles.movie_left_sidebar_poster}>
         <Image
            src={posterUrl || loadingImage}
            width={posterWidth}
            height={posterHeight}
            // quality={95} // * Включить на нормальном хостинге
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER_IMAGE}
            priority={true}
            unoptimized={true} // * Выключить на нормальном хостинге
            alt={validatedTitle || alternateText}
            itemProp="image"
         />
      </div>
   );
};
