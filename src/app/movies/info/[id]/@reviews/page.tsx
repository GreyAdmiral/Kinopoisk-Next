import { ReviewCard } from '@/components/ReviewCard/ReviewCard';
import { MoreReviewsButton } from '@/components/MoreReviewsButton/MoreReviewsButton';
import { Services } from '@services/Kinopoisk';
import type { Review } from '@typesfolder/types';
import type { Props } from '../types';
import styles from './page.module.scss';

export default async function ReviewsPage({ params: { id = '' } }: Props) {
   const title = 'Рецензии зрителей';
   const reviews = await Services.getReviews(id);
   const { total, totalPages, items } = reviews;
   const startContentCount = Math.ceil(total / totalPages);
   let result: Array<Review[]> = [];

   for (let i = 1; i <= totalPages; i++) {
      const start = (i - 1) * startContentCount;
      const end = i * startContentCount;
      const array = items.slice(start, end);

      if (array.length) {
         result.push(array);
      }
   }

   const [startItems, ...otherItems] = result;

   return total && items.length ? (
      <section className={styles.reviews}>
         <h2 className={styles.reviews_title}>{title}</h2>

         <div className={styles.reviews_body}>
            {startItems.map((it) => (
               <ReviewCard key={it.kinopoiskId + it.title + it.date} review={it} />
            ))}

            {!!otherItems.length && <MoreReviewsButton reviews={otherItems} />}
         </div>
      </section>
   ) : null;
}
