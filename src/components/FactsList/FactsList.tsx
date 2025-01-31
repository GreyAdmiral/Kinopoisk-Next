import { getTextClearedOfTags } from '@tools/getTextClearedOfTags';
import type { FC } from 'react';
import type { FactsListProps } from './types';
import styles from './FactsList.module.scss';

export const FactsList: FC<FactsListProps> = ({ facts, title }) => {
   if (!facts.length) {
      return null;
   }

   return (
      <section className={styles.facts}>
         <h2 className={styles.facts_title}>{title}</h2>

         <ul className={styles.facts_list}>
            {facts.map(({ text }, idx) => (
               <li key={idx} className={styles.facts_list_item}>
                  {getTextClearedOfTags(text)}
               </li>
            ))}
         </ul>
      </section>
   );
};
