import Link from 'next/link';
import { BackLink } from '../BackLink/BackLink';
import type { FC } from 'react';
import type { MovieLinksProps } from './types';
import styles from './MovieLinks.module.scss';

export const MovieLinks: FC<MovieLinksProps> = ({ id, webUrl }) => {
   const factsLinkTitle = 'Интересные факты';
   const factsLinkRoute = `/movies/info/${id}/facts`;
   const playerLinkRoute = `https://flicksbar.mom/film/${id}/`;
   const links = [
      {
         title: 'Подробнее на «Кинопоиск»',
         link: webUrl,
      },
      {
         title: 'Смотреть бесплатно',
         link: playerLinkRoute,
      },
   ];

   return webUrl ? (
      <article className={styles.movie_content_links}>
         <Link href={factsLinkRoute} className={styles.movie_content_link}>
            {factsLinkTitle}
         </Link>

         {links.map((it) => (
            <a key={it.link} className={styles.movie_content_link} href={it.link} target="_blank">
               {it.title}
            </a>
         ))}

         <BackLink className={styles.movie_content_back} />
      </article>
   ) : null;
};
