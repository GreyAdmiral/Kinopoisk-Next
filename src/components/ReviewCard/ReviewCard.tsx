import { getTextClearedOfTags } from '@tools/getTextClearedOfTags';
import type { FC } from 'react';
import type { ReviewCardProps } from './types';
import styles from './ReviewCard.module.scss';

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
   const { author, description, date } = review;
   const formatter = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
   });

   return (
      <aside className={styles.review}>
         <div className={styles.review_title}>
            <h3 className={styles.review_author}>{author}</h3>

            <time dateTime={date} className={styles.review_date}>
               {formatter.format(new Date(date))}
            </time>
         </div>

         <p className={styles.review_text}>{getTextClearedOfTags(description)}</p>
      </aside>
   );
};
