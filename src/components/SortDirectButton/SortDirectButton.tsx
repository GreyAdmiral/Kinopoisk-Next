'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { SPRITE_PATH } from '@tools/costants';
import type { FC } from 'react';
import type { SortDirectButtonProps } from './types';
import styles from './SortDirectButton.module.scss';

export const SortDirectButton: FC<SortDirectButtonProps> = ({ className }) => {
   const sortIconID = 'sort';
   const sortReversedIconID = 'sort-reversed';
   const infoLabel = '/movies/info/';
   const buttonsIconSize = 20;
   const path = usePathname();
   const searchParams = useSearchParams();
   const router = useRouter();
   const { pending } = useFormStatus();
   const isReverseDirection = searchParams.get('reversed') === '1';
   const isInfo = path.includes(infoLabel);

   const sortDirectionButtonHandler = () => {
      const params = new URLSearchParams(searchParams.toString());

      if (!isReverseDirection) {
         params.set('reversed', '1');
      } else {
         params.delete('reversed');
      }

      router.push(`${path}${params.size ? `?${params.toString()}` : ''}`);
   };

   const title = `Сортировать по ${isReverseDirection ? 'возрастанию' : 'убыванию'}`;

   return (
      <button
         type="button"
         {...(isInfo ? {} : { title, 'aria-label': title })}
         className={clsx([styles.search_button_sort, { [className]: Boolean(className) }])}
         onClick={sortDirectionButtonHandler}
         disabled={pending || isInfo}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${isReverseDirection ? sortIconID : sortReversedIconID}`} />
         </svg>
      </button>
   );
};
