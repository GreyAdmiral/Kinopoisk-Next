'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FC, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { ButtonSkeleton } from '@components/ButtonSkeleton/ButtonSkeleton';
import { useIsNotFound } from '@hooks/useIsNotFound';
import { SPRITE_PATH } from '@tools/costants';
import clsx from 'clsx';

import styles from './SortDirectButton.module.scss';
import type { SortDirectButtonProps } from './types';

export const SortDirectButton: FC<SortDirectButtonProps> = ({ className }) => {
   const sortIconID = 'sort';
   const sortReversedIconID = 'sort-reversed';
   const infoLabel = '/movies/info/';
   const buttonsIconSize = 20;
   const path = usePathname();
   const router = useRouter();
   const searchParams = useSearchParams();
   const [mounted, setMounted] = useState<boolean>(false);
   const { pending } = useFormStatus();
   const isNotFound = useIsNotFound();
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

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return <ButtonSkeleton iconSize={buttonsIconSize} className={styles.button} />;

   return (
      <button
         type="button"
         {...(isInfo ? {} : { title, 'aria-label': title })}
         className={clsx([styles.button_sort, { [className]: Boolean(className) }])}
         onClick={sortDirectionButtonHandler}
         disabled={pending || isInfo || isNotFound}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use href={`${SPRITE_PATH}#${isReverseDirection ? sortIconID : sortReversedIconID}`} />
         </svg>
      </button>
   );
};
