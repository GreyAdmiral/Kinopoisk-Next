import Link from 'next/link';
import { BackLink } from '@components/BackLink/BackLink';
import { URLToken } from '@services/URLToken';
import { getCloudFrameLink } from '@tools/getFrameLinks';
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
   const linksForPlayer = [...frames, getCloudFrameLink(id)];

   return webUrl ? (
      <div className={styles.movie_content_links}>
         <Link href={factsLinkRoute} className={styles.movie_content_link}>
            {factsLinkTitle}
         </Link>

         <a className={styles.movie_content_link} href={webUrl} target="_blank">
            {officialLinkTitle}
         </a>

         <a key={title + year} className={styles.movie_content_link} href={torrentSearchUrl} target="_blank" itemProp="url">
            {torrentSearchText}
         </a>

         {linksForPlayer.map(({ title, url }) => (
            <Link
               key={title + url}
               href={`/movies/info/${id}/player?token=${URLToken.encrypt(url)}`}
               className={styles.movie_content_link}
               itemProp="url"
            >
               {`Плеер ${title}`}
            </Link>
         ))}

         <BackLink className={styles.movie_content_back} />
      </div>
   ) : null;
};
