'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SPRITE_PATH } from '@tools/costants';
import type { FC } from 'react';
import type { SortDirectButtonProps } from './types';
import styles from './SortDirectButton.module.scss';

export const SortDirectButton: FC<SortDirectButtonProps> = ({ className }) => {
   const sortIconID = 'sort';
   const sortReversedIconID = 'sort-reversed';
   const infoLabel = '/movies/info/';
   const buttonsIconSize = 20;
   const [isReverseDirection, setIsReverseDirection] = useState<boolean>(false);
   const path = usePathname();
   const queries = useSearchParams();
   const router = useRouter();
   const params = new URLSearchParams(queries);
   const isInfo = path.includes(infoLabel);
   const isReversed = queries.has('reversed');

   const sortDirectionButtonHandler = () => {
      if (!isReverseDirection) {
         params.set('reversed', '1');
      } else if (params.has('reversed')) {
         params.delete('reversed');
      }

      setIsReverseDirection((state) => !state);
      router.push(`${path}${params.size ? `?${params.toString()}` : ''}`);
   };

   useEffect(() => {
      if (isReverseDirection && !isReversed) {
         setIsReverseDirection(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isReversed]);

   return (
      <button
         type="button"
         {...(isInfo ? {} : { title: `Сортировать по ${isReverseDirection ? 'возрастанию' : 'убыванию'}` })}
         {...(isInfo ? {} : { ['aria-label']: `Сортировать по ${isReverseDirection ? 'возрастанию' : 'убыванию'}` })}
         className={classNames([styles.search_button_sort, { [className]: !!className }])}
         onClick={sortDirectionButtonHandler}
         disabled={isInfo}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${isReverseDirection ? sortReversedIconID : sortIconID}`} />
         </svg>
      </button>
   );
};
