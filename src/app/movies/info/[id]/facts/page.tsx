import { notFound } from 'next/navigation';
import { FactsList } from '@components/FactsList/FactsList';
import { BackLink } from '@components/BackLink/BackLink';
import { NotFoundResult } from '@/components/NotFoundResult/NotFoundResult';
import { Services } from '@services/Kinopoisk';
import type { Metadata } from 'next';
import type { Props } from '../types';
import styles from './page.module.scss';

export async function generateMetadata({ params: { id = '' } }: Props): Promise<Metadata> {
   const { nameRu, nameEn, nameOriginal } = await Services.getMovie(id);
   const title = nameRu || nameEn || nameOriginal;

   return {
      title: `Неофициальный кинопоиск | Факты о фильме «${title}»`,
      description: `Неофициальный кинопоиск. Факты о фильме «${title}».`,
   };
}

export default async function MoviePage({ params: { id = '' } }: Props) {
   const factsLabel = 'FACT';
   const bloopersLabel = 'BLOOPER';
   const factsTitle = 'Факты:';
   const bloopersTitle = 'Ляпы:';
   const pageTitle = 'Знаете ли вы что?..';
   const facts = await Services.getFacts(id);
   const { items } = facts;

   if (!facts || !id) {
      notFound();
   }

   const factsArray = (items && items.filter((fact) => fact.type === factsLabel)) || [];
   const bloopersArray = (items && items.filter((blooper) => blooper.type === bloopersLabel)) || [];

   return (
      <div className={styles.facts}>
         {items && items.length && (
            <>
               <h2 className={styles.facts_title}>{pageTitle}</h2>
               <FactsList facts={factsArray} title={factsTitle} />
               <FactsList facts={bloopersArray} title={bloopersTitle} />
               <BackLink className={styles.facts_back_center} />
            </>
         )}

         {!items.length && <NotFoundResult />}
      </div>
   );
}
