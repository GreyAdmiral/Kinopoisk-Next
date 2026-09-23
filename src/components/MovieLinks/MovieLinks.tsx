import Link from 'next/link';
import type { FC } from 'react';

import { BackLink } from '@components/BackLink/BackLink';
import { Services } from '@services/Kinopoisk';
import { URLToken } from '@services/URLToken';
import { getFilteredPlayers } from '@tools/getFilteredPlayers';
import { getDataFrameLinks, getLinksForStaticPlayer } from '@tools/getFrameLinks';
import { getTorrentSearchLink } from '@tools/getTorrentSearchLink';

import styles from './MovieLinks.module.scss';
import type { MovieLinksProps } from './types';

export const MovieLinks: FC<MovieLinksProps> = async ({ id, webUrl, title, year }) => {
   const factsLinkTitle = 'Интересные факты';
   const officialLinkTitle = 'Подробнее на «Кинопоиск»';
   const torrentSearchText = 'Искать торренты';
   const factsLinkRoute = `/movies/info/${id}/facts`;
   const frames = await Services.getDataFrames(id);
   const framesLinks = getFilteredPlayers(getDataFrameLinks(frames));
   const torrentSearchUrl = getTorrentSearchLink({ title, year });
   const linksForPlayer = framesLinks.length ? [...framesLinks, ...getLinksForStaticPlayer(id)] : null;

   return (
      <div className={styles.movie_content_links}>
         <Link href={factsLinkRoute} scroll={false} className={styles.movie_content_link}>
            {factsLinkTitle}
         </Link>

         {webUrl && (
            <a className={styles.movie_content_link} href={webUrl} target="_blank">
               {officialLinkTitle}
            </a>
         )}

         <a key={title + year} className={styles.movie_content_link} href={torrentSearchUrl} target="_blank" itemProp="url">
            {torrentSearchText}
         </a>

         {linksForPlayer &&
            linksForPlayer.map(({ title, url }) => (
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
   );
};
