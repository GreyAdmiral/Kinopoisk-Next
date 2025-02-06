import Image from 'next/image';
import Link from 'next/link';
import { BLUR_PLACEHOLDER_IMAGE, SPRITE_PATH } from '@tools/costants';
import type { FC } from 'react';
import type { SequelsCardProps } from './types';
import styles from './SequelCard.module.scss';
import loadingImage from '@assets/images/loading.svg?url';

export const SequelCard: FC<SequelsCardProps> = ({ sequel }) => {
   const alternateText = 'Постер фильма';
   const spriteID = 'open';
   const imageWidth = 200;
   const imageHeight = 300;
   const iconWidth = 115;
   const iconHeight = 100;
   const { filmId, nameRu, nameEn, nameOriginal, posterUrl, posterUrlPreview } = sequel;
   const sequelTitle = nameRu || nameEn || nameOriginal;
   const linkUrl = `/movies/info/${filmId}`;

   return (
      <Link href={linkUrl} className={styles.sequel} passHref>
         <div className={styles.sequel_image}>
            <Image
               src={posterUrlPreview || posterUrl || loadingImage}
               width={imageWidth}
               height={imageHeight}
               // quality={95} // * Включить на нормальном хостнге
               placeholder="blur"
               blurDataURL={BLUR_PLACEHOLDER_IMAGE}
               loading="lazy"
               unoptimized={true} // * Выключить на нормальном хостнге
               alt={sequelTitle || alternateText}
               aria-hidden={true}
            />
         </div>

         <h3 className={styles.sequel_title}>
            <svg width={iconWidth} height={iconHeight}>
               <use xlinkHref={`${SPRITE_PATH}#${spriteID}`} />
            </svg>

            <span>{sequelTitle}</span>
         </h3>
      </Link>
   );
};
