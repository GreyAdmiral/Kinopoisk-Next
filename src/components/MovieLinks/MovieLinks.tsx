import Link from 'next/link';
import type { FC } from 'react';

import { BackLink } from '@components/BackLink/BackLink';
import { URLToken } from '@services/URLToken';
import { getLinksForStaticPlayer } from '@tools/getFrameLinks';
import { getTorrentSearchLink } from '@tools/getTorrentSearchLink';

import styles from './MovieLinks.module.scss';
import type { MovieLinksProps } from './types';

export const MovieLinks: FC<MovieLinksProps> = ({ id, webUrl, title, year, frames = [] }) => {
   const factsLinkTitle = 'Интересные факты';
   const officialLinkTitle = 'Подробнее на «Кинопоиск»';
   const factsLinkRoute = `/movies/info/${id}/facts`;
   const torrentSearchText = 'Искать торренты';
   const torrentSearchUrl = getTorrentSearchLink({ title, year });
   const linksForPlayer = [...frames, ...getLinksForStaticPlayer(id)];

   return webUrl ? (
      <div className={styles.movie_content_links}>
         <Link href={factsLinkRoute} scroll={false} className={styles.movie_content_link}>
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
               scroll={false}
            >
               {`Плеер ${title}`}
            </Link>
         ))}

         <BackLink className={styles.movie_content_back} />
      </div>
   ) : null;
};
