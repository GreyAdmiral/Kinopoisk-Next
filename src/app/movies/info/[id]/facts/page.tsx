import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BackLink } from '@components/BackLink/BackLink';
import { ErrorComponent } from '@components/ErrorComponent/ErrorComponent';
import { FactsList } from '@components/FactsList/FactsList';
import { NotFoundResult } from '@components/NotFoundResult/NotFoundResult';
import { ScrollRestoration } from '@components/ScrollRestoration/ScrollRestoration';
import { Services } from '@services/Kinopoisk';
import { brandTitle } from '@tools/costants';

import type { Props } from '../types';

import styles from './page.module.scss';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { id } = await params;
   const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/movies/info/${id}`;
   const unknownTitle = 'Неизвестный фильм';
   const results = await Services.getMovie(id);

   if (!results.ok) {
      return { title: brandTitle };
   }

   const { data: facts } = results || {};
   const { nameRu, nameEn, nameOriginal, year } = facts || {};
   const title = nameRu || nameEn || nameOriginal || unknownTitle;
   const yearString = year ? ` (${year})` : '';

   return {
      title: `${title}${yearString} факты о фильме`,
      description: `Самые интересные факты и «ляпы» со съемок фильма «${title}».`,
      openGraph: {
         siteName: brandTitle,
         title: `${title}${yearString} факты о фильме`,
         type: 'video.movie',
         locale: 'ru',
         url: pageUrl,
      },
   };
}

export default async function MoviePage({ params }: Props) {
   const { id } = await params;

   if (!id) notFound();

   const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/movies/info/${id}`;
   const factsLabel = 'FACT';
   const bloopersLabel = 'BLOOPER';
   const factsTitle = 'Факты:';
   const bloopersTitle = 'Ляпы:';
   const pageTitle = 'Знаете ли вы что?..';
   const notFoundMessage = 'Фактов не найдено!';

   const results = await Services.getFacts(id);

   if (!results.ok) {
      if (results.error) {
         return <ErrorComponent message={results.error} />;
      } else {
         return (
            <div className={styles.facts}>
               <NotFoundResult message={notFoundMessage} />
            </div>
         );
      }
   }

   const { data: facts } = results || {};
   const { items } = facts || {};
   const isItems = Boolean(items.length);
   const factsArray = items.filter((fact) => fact.type === factsLabel);
   const bloopersArray = items.filter((blooper) => blooper.type === bloopersLabel);

   return (
      <>
         <ScrollRestoration />

         <div className={styles.facts}>
            {isItems && (
               <>
                  <h2 className={styles.facts_title}>{pageTitle}</h2>
                  <FactsList facts={factsArray} title={factsTitle} />
                  <FactsList facts={bloopersArray} title={bloopersTitle} />
                  <BackLink key={pageUrl} className={styles.facts_back_center} />
               </>
            )}

            {!isItems && <NotFoundResult message={notFoundMessage} />}
         </div>
      </>
   );
}
