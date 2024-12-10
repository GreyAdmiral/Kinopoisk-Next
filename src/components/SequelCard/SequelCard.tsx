import Image from 'next/image';
import Link from 'next/link';
import { SPRITE_PATH } from '@tools/costants';
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
   const { filmId, nameRu, nameEn, nameOriginal, posterUrlPreview } = sequel;
   const sequelTitle = nameRu || nameEn || nameOriginal;
   const linkUrl = `/movies/info/${filmId}`;

   return (
      <Link href={linkUrl} className={styles.sequel} passHref>
         <div className={styles.sequel_image}>
            <Image
               src={posterUrlPreview || loadingImage}
               width={imageWidth}
               height={imageHeight}
               unoptimized={true}
               // quality={85}
               placeholder="empty"
               loading="lazy"
               alt={sequelTitle || alternateText}
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
