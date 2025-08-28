import { notFound } from 'next/navigation';
import { FactsList } from '@components/FactsList/FactsList';
import { BackLink } from '@components/BackLink/BackLink';
import { NotFoundResult } from '@/components/NotFoundResult/NotFoundResult';
import { Services } from '@services/Kinopoisk';
import { brandTitle } from '@/tools/costants';
import type { Metadata } from 'next';
import type { Props } from '../types';
import styles from './page.module.scss';

export async function generateMetadata({ params: { id = '' } }: Props): Promise<Metadata> {
   const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/movies/info/${id}`;
   const unknownTitle = 'Неизвестный фильм';
   const facts = await Services.getMovie(id);
   const { nameRu, nameEn, nameOriginal } = facts || {};
   const title = nameRu || nameEn || nameOriginal;

   return {
      title: `Факты о фильме «${title || unknownTitle}» | Неофициальный кинопоиск`,
      description: `Самые интересные факты и «ляпы» со съемок фильма «${title || unknownTitle}».`,
      openGraph: {
         siteName: brandTitle,
         type: 'website',
         locale: 'ru',
         url: pageUrl,
      },
   };
}

export default async function MoviePage({ params: { id = '' } }: Props) {
   const factsLabel = 'FACT';
   const bloopersLabel = 'BLOOPER';
   const factsTitle = 'Факты:';
   const bloopersTitle = 'Ляпы:';
   const pageTitle = 'Знаете ли вы что?..';
   const notFoundMessage = 'Фактов не найдено!';

   if (!id) {
      notFound();
   }

   const facts = await Services.getFacts(id);
   const { items } = facts;
   const isItems = Boolean(items.length);
   const factsArray = items.filter((fact) => fact.type === factsLabel);
   const bloopersArray = items.filter((blooper) => blooper.type === bloopersLabel);

   return (
      <div className={styles.facts}>
         {isItems && (
            <>
               <h2 className={styles.facts_title}>{pageTitle}</h2>
               <FactsList facts={factsArray} title={factsTitle} />
               <FactsList facts={bloopersArray} title={bloopersTitle} />
               <BackLink className={styles.facts_back_center} />
            </>
         )}

         {!isItems && <NotFoundResult message={notFoundMessage} />}
      </div>
   );
}
