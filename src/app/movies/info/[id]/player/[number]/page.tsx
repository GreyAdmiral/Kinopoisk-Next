import { BackLink } from '@components/BackLink/BackLink';
import { getFreeLinksForPlayer } from '@tools/getFreeLinksForPlayer';
import { Services } from '@services/Kinopoisk';
import { brandTitle } from '@tools/costants';
import type { Metadata } from 'next';
import type { Props } from '../../types';
import styles from './page.module.scss';

export async function generateMetadata({ params: { id = '' } }: Props): Promise<Metadata> {
   const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/movies/info/${id}`;
   const unknownTitle = 'Неизвестный фильм';
   const movie = await Services.getMovie(id);
   const { nameRu, nameEn, nameOriginal, description, shortDescription, year } = movie || {};
   const title = nameRu || nameEn || nameOriginal || unknownTitle;
   const yearString = year ? ` (${year})` : '';
   const defaultDescription = `Смотреть онлайн ${title}${yearString}`;

   return {
      title: `${title}${yearString} смотреть онлайн бесплатно`,
      description: description || shortDescription || defaultDescription,
      openGraph: {
         siteName: brandTitle,
         title: `${title}${yearString} смотреть онлайн бесплатно на «${brandTitle}»`,
         type: 'video.movie',
         locale: 'ru',
         url: pageUrl,
      },
   };
}

export default async function PlayerPage({ params: { id = '', number = 1 } }: Props) {
   const links = Object.values(getFreeLinksForPlayer(id));
   const playerNumber = Math.max(1, Math.min(links.length, +number));
   const url = links.at(playerNumber - 1);
   const width = 1120;
   const height = 610;

   return (
      <section className={styles.player}>
         <BackLink className={styles.player_back_center} />
         <iframe
            className={styles.player_frame}
            src={url}
            title="Смотреть беплатно"
            width={width}
            height={height}
            frameBorder="0"
            allowFullScreen
         />
      </section>
   );
}
