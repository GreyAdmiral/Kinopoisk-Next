'use client';
import { useEffect, useState } from 'react';
import { ReviewCard } from '@/components/ReviewCard/ReviewCard';
import type { FC } from 'react';
import type { MoreReviewsButtonProps } from './types';
import type { Review } from '@typesfolder/types';
import styles from './MoreReviewsButton.module.scss';

export const MoreReviewsButton: FC<MoreReviewsButtonProps> = ({ reviews }) => {
   const title = 'Показать еще...';
   const totalPages = reviews.length;
   const [visibleContent, setVisibleContent] = useState<Review[]>([]);
   const [activePage, setActivePage] = useState<number>(0);
   const MoreReviewsButtonHandler = () => {
      if (activePage < totalPages) {
         setActivePage((page) => page + 1);
      }
   };

   useEffect(() => {
      if (activePage) {
         setVisibleContent((state) => [...state, ...reviews[activePage - 1]]);
      }
   }, [activePage, reviews]);

   return (
      <>
         {visibleContent.map((it) => (
            <ReviewCard key={it.kinopoiskId + it.title + it.date} review={it} />
         ))}

         {activePage < totalPages && (
            <button type="button" className={styles.more_reviews_button} onClick={MoreReviewsButtonHandler}>
               {title}
            </button>
         )}
      </>
   );
};
