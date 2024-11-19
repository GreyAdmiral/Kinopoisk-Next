import type { FC } from 'react';
import type { MovieLinksProps } from './types';
import styles from './MovieLinks.module.scss';

export const MovieLinks: FC<MovieLinksProps> = ({ id, webUrl }) => {
   const links = [
      {
         title: 'Подробнее на «Кинопоиск»',
         link: webUrl,
      },
      {
         title: 'Смотреть бесплатно',
         link: `https://flicksbar.mom/film/${id}/`,
      },
   ];

   return webUrl ? (
      <article className={styles.movie_content_links}>
         {links.map((it) => (
            <a key={it.link} className={styles.movie_content_link} href={it.link} target="_blank">
               {it.title}
            </a>
         ))}
      </article>
   ) : null;
};
