import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BackLink } from '@components/BackLink/BackLink';
import { ScrollArrows } from '@components/ScrollArrows/ScrollArrows';
import { ScrollRestoration } from '@components/ScrollRestoration/ScrollRestoration';
import { Services } from '@services/Kinopoisk';
import { URLToken } from '@services/URLToken';
import { brandTitle } from '@tools/costants';
import { isExists } from '@tools/isExist';

import type { Props } from '../types';

import styles from './page.module.scss';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { id } = await params;
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

export default async function PlayerPage({ params, searchParams }: Props) {
   const { id } = await params;
   const { token = '' } = await searchParams;

   if (!id || !token) notFound();

   const movie = await Services.getMovie(id);

   if (!movie) notFound();

   const width = 1120;
   const height = 610;
   const isLinkPrefetch = true;
   const url = URLToken.decrypt(token);
   const titleLink = `/movies/info/${id}`;
   const notFoundTitle = 'Неизвестный фильм';
   const linkClue = 'Перейти на страницу фильма';
   const { nameRu, nameEn, nameOriginal } = movie;
   const title = nameRu || nameEn || nameOriginal;
   const validatedTitle = isExists(title) ? title : notFoundTitle;

   return (
      <>
         <ScrollRestoration />

         <section className={styles.player} itemProp="video" itemScope itemType="https://schema.org/VideoObject">
            <meta itemProp="embedUrl" content={url} />

            <h2 className={styles.player_title} itemProp="name">
               <Link href={titleLink} className={styles.player_link} title={linkClue} prefetch={isLinkPrefetch} replace>
                  {validatedTitle}
               </Link>
            </h2>

            <iframe
               key={token}
               className={styles.player_frame}
               src={url}
               title="Смотреть беплатно"
               width={width}
               height={height}
               frameBorder="0"
               allowFullScreen
            />

            <BackLink className={styles.player_back_center} />
         </section>

         <ScrollArrows />
      </>
   );
}
