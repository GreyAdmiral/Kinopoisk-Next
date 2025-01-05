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
   const blurPlaceholderImage =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA70lEQVR4AQXBTUvCcADA4Z/7z9xcmbEpdSg6CBYGRUcr6WJvUESfqHN07Jt47hBdBV/AFg2FYTGd2DZzmJiz54ndnpUX51cldvcvSWoqufwGcVlgmlX01CpLmsbD4xMiZ2zeS8MQNRgQX1Gweg6/owGvLxUyxjq2+4VtO8haPIGKxKfdxfpzmUgKruMSxX4QiqDfs2i1A+RwMmM+hsr4nbSvcnNaZHnqE8yTNDpvROGU7FYSueX3MUcuqbUExYsd9jICY66yyOrUm22aHY/vmYec304jRIRuaJROjmg8V/G8IXflawoHhxx/1KjVu/wDycJbrJ7yuz0AAAAASUVORK5CYII=';

   return (
      <Link href={linkUrl} className={styles.sequel} passHref>
         <div className={styles.sequel_image}>
            <Image
               src={posterUrlPreview || loadingImage}
               width={imageWidth}
               height={imageHeight}
               quality={95}
               placeholder="blur"
               blurDataURL={blurPlaceholderImage}
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
