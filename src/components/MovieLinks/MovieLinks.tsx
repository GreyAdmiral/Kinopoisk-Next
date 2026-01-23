import Link from 'next/link';
import { BackLink } from '@components/BackLink/BackLink';
import { URLToken } from '@services/URLToken';
import { getFreeLinksForPlayer } from '@tools/getFreeLinksForPlayer';
import { getSpareLinksForPlayer } from '@tools/getSpareLinksForPlayer';
import { getTorrentSearchLink } from '@tools/getTorrentSearchLink';
import type { FC } from 'react';
import type { MovieLinksProps } from './types';
import styles from './MovieLinks.module.scss';

export const MovieLinks: FC<MovieLinksProps> = ({ id, webUrl, title, year, frames = [] }) => {
   const factsLinkTitle = 'Интересные факты';
   const officialLinkTitle = 'Подробнее на «Кинопоиск»';
   const factsLinkRoute = `/movies/info/${id}/facts`;
   const torrentSearchText = 'Искать торренты';
   const torrentSearchUrl = getTorrentSearchLink({ title, year });
   const linksValues = Object.values(getFreeLinksForPlayer(id));
   const spareValues = Object.values(getSpareLinksForPlayer(id));
   const linksForPlayer = [...linksValues, ...frames, ...spareValues];

   return webUrl ? (
      <div className={styles.movie_content_links}>
         <Link href={factsLinkRoute} className={styles.movie_content_link}>
            {factsLinkTitle}
         </Link>

         <a className={styles.movie_content_link} href={webUrl} target="_blank">
            {officialLinkTitle}
         </a>

         {linksForPlayer.map((value, idx) => (
            <Link
               key={value}
               href={`/movies/info/${id}/player?token=${URLToken.encrypt(value)}`}
               className={styles.movie_content_link}
               itemProp="url"
            >
               {`Смотреть бесплатно (ссылка ${idx + 1})`}
            </Link>
         ))}

         <a key={title + year} className={styles.movie_content_link} href={torrentSearchUrl} target="_blank" itemProp="url">
            {torrentSearchText}
         </a>

         <BackLink className={styles.movie_content_back} />
      </div>
   ) : null;
};
