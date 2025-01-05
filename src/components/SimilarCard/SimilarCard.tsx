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
   const blurPlaceholderImage =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA70lEQVR4AQXBTUvCcADA4Z/7z9xcmbEpdSg6CBYGRUcr6WJvUESfqHN07Jt47hBdBV/AFg2FYTGd2DZzmJiz54ndnpUX51cldvcvSWoqufwGcVlgmlX01CpLmsbD4xMiZ2zeS8MQNRgQX1Gweg6/owGvLxUyxjq2+4VtO8haPIGKxKfdxfpzmUgKruMSxX4QiqDfs2i1A+RwMmM+hsr4nbSvcnNaZHnqE8yTNDpvROGU7FYSueX3MUcuqbUExYsd9jICY66yyOrUm22aHY/vmYec304jRIRuaJROjmg8V/G8IXflawoHhxx/1KjVu/wDycJbrJ7yuz0AAAAASUVORK5CYII=';

   return (
      <article className={styles.similar}>
         <div className={styles.similar_image}>
            <Image
               src={posterUrl || loadingImage}
               width={imageWidth}
               height={imageHeight}
               unoptimized={true}
               // quality={100}
               placeholder="blur"
               blurDataURL={blurPlaceholderImage}
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
