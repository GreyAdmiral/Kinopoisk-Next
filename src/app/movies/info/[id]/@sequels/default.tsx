import { SequelCard } from '@components/SequelCard/SequelCard';
import { Services } from '@services/Kinopoisk';
import type { Props } from '../types';
import styles from './page.module.scss';

export default async function SequelsPage({ params: { id = '' } }: Props) {
   const title = 'Сиквелы и приквелы';
   const sequels = await Services.getSequelsAndPrequels(id);

   if (!sequels) {
      return null;
   }

   return (
      <section className={styles.sequels_and_prequels}>
         <h2 className={styles.sequels_and_prequels_title}>{title}</h2>

         <div className={styles.sequels_and_prequels_body}>
            {sequels.map((sequel) => (
               <SequelCard key={sequel.filmId} sequel={sequel} />
            ))}
         </div>
      </section>
   );
}
