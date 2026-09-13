'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useClickOutside } from '@hooks/useClickOutside';
import type { PropsWithChildren } from 'react';
import styles from './Modal.module.scss';

export const Modal = ({ children }: PropsWithChildren) => {
   const ref = useRef<HTMLTemplateElement>(null);
   const router = useRouter();
   const handler = () => {
      router.back();
   };

   useClickOutside(ref, handler);

   useEffect(() => {
      document.body.classList.add('lock');

      return () => {
         document.body.classList.remove('lock');
      };
   }, []);

   return (
      <div className={styles.modal}>
         <section ref={ref} className={styles.modal__content}>
            {children}
         </section>
      </div>
   );
};
