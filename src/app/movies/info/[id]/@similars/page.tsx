import { Services } from '@services/Kinopoisk';
import { SliderList } from '@components/SliderList/SliderList';
import { SimilarCard } from '@components/SimilarCard/SimilarCard';
import type { Props } from '../types';
import styles from './page.module.scss';

export default async function SimilarsPage({ params: { id = '' } }: Props) {
   const title = 'Похожие фильмы';
   const similars = await Services.getSimilars(id);
   const { total, items } = similars;

   return +total && items.length ? (
      <section className={styles.similars}>
         <h2 className={styles.similars_title}>{title}</h2>

         <SliderList>
            {items.map((item) => (
               <SimilarCard key={item.filmId} similar={item} />
            ))}
         </SliderList>
      </section>
   ) : null;
}
