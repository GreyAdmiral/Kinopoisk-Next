import Image from 'next/image';
import Link from 'next/link';
import { BLUR_PLACEHOLDER_IMAGE } from '@tools/costants';
import type { FC } from 'react';
import type { SimilarCardProps } from './types';
import styles from './SimilarCard.module.scss';
import loadingImage from '@assets/images/loading.svg?url';

export const SimilarCard: FC<SimilarCardProps> = ({ similar }) => {
   const alternateText = 'Постер фильма';
   const imageWidth = 228;
   const imageHeight = 328;
   const { filmId, nameRu, nameEn, nameOriginal, posterUrl, posterUrlPreview } = similar;
   const linkUrl = `/movies/info/${filmId}`;
   const similarTitle = nameRu || nameEn || nameOriginal;

   return (
      <article className={styles.similar}>
         <div className={styles.similar_image}>
            <Image
               src={posterUrlPreview || posterUrl || loadingImage}
               width={imageWidth}
               height={imageHeight}
               // quality={95} // * Включить на нормальном хостнге
               placeholder="blur"
               blurDataURL={BLUR_PLACEHOLDER_IMAGE}
               loading="lazy"
               unoptimized={true} // * Выключить на нормальном хостнге
               alt={similarTitle || alternateText}
            />
         </div>

         <h3 className={styles.similar_title}>
            <Link href={linkUrl} className={styles.similar_link} passHref>
               <span>{similarTitle}</span>
            </Link>
         </h3>
      </article>
   );
};
