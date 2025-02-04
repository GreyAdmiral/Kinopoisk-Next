import { notFound } from 'next/navigation';
import { FactsList } from '@components/FactsList/FactsList';
import { BackLink } from '@components/BackLink/BackLink';
import { NotFoundResult } from '@/components/NotFoundResult/NotFoundResult';
import { Services } from '@services/Kinopoisk';
import type { Metadata } from 'next';
import type { Props } from '../types';
import styles from './page.module.scss';

export async function generateMetadata({ params: { id = '' } }: Props): Promise<Metadata> {
   const unknownTitle = 'Неизвестный фильм';
   const facts = await Services.getMovie(id);
   const { nameRu, nameEn, nameOriginal } = facts || {};
   const title = nameRu || nameEn || nameOriginal;

   return {
      title: `Неофициальный кинопоиск | Факты о фильме «${title || unknownTitle}»`,
      description: `Самые интересные факты и «ляпы» со съемок фильма «${title || unknownTitle}».`,
   };
}

export default async function MoviePage({ params: { id = '' } }: Props) {
   const factsLabel = 'FACT';
   const bloopersLabel = 'BLOOPER';
   const factsTitle = 'Факты:';
   const bloopersTitle = 'Ляпы:';
   const pageTitle = 'Знаете ли вы что?..';
   const notFoundMessage = 'Фактов не найдено!';
   const facts = await Services.getFacts(id);
   const { items } = facts;
   const itemsLength = items.length;

   if (!id) {
      notFound();
   }

   const factsArray = items.filter((fact) => fact.type === factsLabel);
   const bloopersArray = items.filter((blooper) => blooper.type === bloopersLabel);

   return (
      <div className={styles.facts}>
         {!!itemsLength && (
            <>
               <h2 className={styles.facts_title}>{pageTitle}</h2>
               <FactsList facts={factsArray} title={factsTitle} />
               <FactsList facts={bloopersArray} title={bloopersTitle} />
               <BackLink className={styles.facts_back_center} />
            </>
         )}

         {!itemsLength && <NotFoundResult message={notFoundMessage} />}
      </div>
   );
}
