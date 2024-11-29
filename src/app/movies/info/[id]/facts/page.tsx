import { notFound } from 'next/navigation';
import { FactsList } from '@components/FactsList/FactsList';
import { BackLink } from '@components/BackLink/BackLink';
import { Services } from '@services/Kinopoisk';
import type { Props } from '../types';
import styles from './page.module.scss';

export default async function MoviePage({ params: { id = '' } }: Props) {
   const factsLabel = 'FACT';
   const bloopersLabel = 'BLOOPER';
   const factsTitle = 'Факты:';
   const bloopersTitle = 'Ляпы:';
   const pageTitle = 'Знаете ли вы что?..';
   const facts = await Services.getFacts(id);
   const { total, items } = facts;

   if (!facts || !total || !items.length || !id) {
      notFound();
   }

   const factsArray = (items && items.filter((fact) => fact.type === factsLabel)) || [];
   const bloopersArray = (items && items.filter((blooper) => blooper.type === bloopersLabel)) || [];

   return (
      <div className={styles.facts}>
         <h2 className={styles.facts_title}>{pageTitle}</h2>

         <FactsList facts={factsArray} title={factsTitle} />
         <FactsList facts={bloopersArray} title={bloopersTitle} />
         <BackLink className={styles.facts_back_center} />
      </div>
   );
}
