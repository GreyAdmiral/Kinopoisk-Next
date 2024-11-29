import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import type { SimilarCardProps } from './types';
import styles from './SimilarCard.module.scss';
import loadingImage from '@assets/images/loading.svg?url';

export const SimilarCard: FC<SimilarCardProps> = ({ similar }) => {
   const alternateText = 'Постер фильма';
   const imageWidth = 228;
   const imageHeight = 328;
   const { filmId, nameRu, nameEn, nameOriginal, posterUrl } = similar;
   const linkUrl = `/movies/info/${filmId}`;
   const similarTitle = nameRu || nameEn || nameOriginal;

   return (
      <article className={styles.similar}>
         <div className={styles.similar_image}>
            <Image
               src={posterUrl || loadingImage}
               width={imageWidth}
               height={imageHeight}
               unoptimized={true}
               // quality={85}
               placeholder="empty"
               loading="lazy"
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
