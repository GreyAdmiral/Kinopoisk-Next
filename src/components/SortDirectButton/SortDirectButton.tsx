'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
   const router = useRouter();
   const [isReverseDirection, setIsReverseDirection] = useState<boolean>(false);
   const isInfo = path.includes(infoLabel);

   const sortDirectionButtonHandler = () => {
      const params = new URLSearchParams(location.search);

      if (!isReverseDirection) {
         params.set('reversed', '1');
      } else if (params.has('reversed')) {
         params.delete('reversed');
      }

      setIsReverseDirection((state) => !state);
      router.push(`${path}${params.size ? `?${params.toString()}` : ''}`);
   };

   useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      setIsReverseDirection(Boolean(searchParams.get('reversed')));
   }, []);

   return (
      <button
         type="button"
         {...(isInfo ? {} : { title: `Сортировать по ${isReverseDirection ? 'возрастанию' : 'убыванию'}` })}
         {...(isInfo ? {} : { ['aria-label']: `Сортировать по ${isReverseDirection ? 'возрастанию' : 'убыванию'}` })}
         className={clsx([styles.search_button_sort, { [className]: Boolean(className) }])}
         onClick={sortDirectionButtonHandler}
         disabled={isInfo}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${isReverseDirection ? sortReversedIconID : sortIconID}`} />
         </svg>
      </button>
   );
};
