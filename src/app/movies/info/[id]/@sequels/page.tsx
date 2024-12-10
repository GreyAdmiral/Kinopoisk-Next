import { SequelCard } from '@components/SequelCard/SequelCard';
import { Services } from '@services/Kinopoisk';
import type { Props } from '../types';
import styles from './page.module.scss';

export default async function page({ params: { id = '' } }: Props) {
   const title = 'Сиквелы и приквелы';
   const sequels = await Services.getSequelsSndPrequels(id);

   return sequels ? (
      <section className={styles.sequels_and_prequels}>
         <h2 className={styles.sequels_and_prequels_title}>{title}</h2>

         <div className={styles.sequels_and_prequels_body}>
            {sequels.map((sequel) => (
               <SequelCard key={sequel.filmId} sequel={sequel} />
            ))}
         </div>
      </section>
   ) : null;
}
