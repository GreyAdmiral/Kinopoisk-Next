import Image from 'next/image';
import { isExists } from '@tools/isExist';
import { BLUR_PLACEHOLDER_IMAGE } from '@tools/costants';
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

   return (
      <div className={styles.movie_left_sidebar_poster}>
         <Image
            src={posterUrl || loadingImage}
            width={posterWidth}
            height={posterHeight}
            quality={95}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER_IMAGE}
            priority={true}
            // unoptimized={true}
            alt={validatedTitle || alternateText}
         />
      </div>
   );
};
