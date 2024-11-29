import { FactsListProps } from './types';
import { getTextClearedOfTags } from '@tools/getTextClearedOfTags';
import type { FC } from 'react';
import styles from './FactsList.module.scss';

export const FactsList: FC<FactsListProps> = ({ facts, title }) => {
   return facts.length ? (
      <section className={styles.facts}>
         <h2 className={styles.facts_title}>{title}</h2>

         <ul className={styles.facts_list}>
            {facts.map((it) => (
               <li key={it.text.slice(0, 225)} className={styles.facts_list_item}>
                  {getTextClearedOfTags(it.text)}
               </li>
            ))}
         </ul>
      </section>
   ) : null;
};
