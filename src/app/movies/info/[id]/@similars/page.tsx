import { SimilarCard } from '@components/SimilarCard/SimilarCard';
import { SliderList } from '@components/SliderList/SliderList';
import { Services } from '@services/Kinopoisk';

import type { Props } from '../types';

import styles from './page.module.scss';

export default async function SimilarsPage({ params }: Props) {
   const title = 'Похожие фильмы';
   const { id } = await params;
   const similars = await Services.getSimilars(id);
   if (!similars) return null;

   const { total = 0, items = [] } = similars;
   const itemsLength = items.length;
   if (!total || !itemsLength) return null;

   return (
      <section className={styles.similars}>
         <h2 className={styles.similars_title}>{title}</h2>

         <SliderList>
            {items.map((item) => (
               <SimilarCard key={item.filmId} similar={item} />
            ))}
         </SliderList>
      </section>
   );
}
