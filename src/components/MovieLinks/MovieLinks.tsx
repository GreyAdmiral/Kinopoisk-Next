import Link from 'next/link';
import { BackLink } from '@components/BackLink/BackLink';
import { getFreeLinks } from '@tools/getFreeLinks';
import type { FC } from 'react';
import type { MovieLinksProps } from './types';
import styles from './MovieLinks.module.scss';

export const MovieLinks: FC<MovieLinksProps> = ({ id, webUrl }) => {
   const factsLinkTitle = 'Интересные факты';
   const factsLinkRoute = `/movies/info/${id}/facts`;
   const links = [
      {
         title: 'Подробнее на «Кинопоиск»',
         link: webUrl,
      },
      ...Object.values(getFreeLinks(id)).map((value, idx) => ({
         title: `Смотреть бесплатно (зеркало ${idx + 1})`,
         link: value,
      })),
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
