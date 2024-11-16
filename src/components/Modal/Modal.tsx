'use client';
import type { FC, PropsWithChildren } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@hooks/useClickOutside';
import { useLockScroll } from '@hooks/useLockScroll';
import type { ModalProps } from './types';
import styles from './Modal.module.scss';

const modalCloseKeysCodes = ['Escape'];

export const Modal: FC<PropsWithChildren & ModalProps> = ({ isOpenModal, onClose, children, ...props }) => {
   const modalRef = useRef(null);
   const modalRoot = useMemo(() => {
      const element = document.createElement('div');

      element.classList.add(styles.modal);
      return element;
   }, []);
   const keydownHandler = useCallback(
      (e: KeyboardEvent) => {
         e.stopPropagation();

         if (modalCloseKeysCodes.includes(e.code)) {
            onClose();
         }
      },
      [onClose]
   );

   useClickOutside(modalRef, onClose);
   useLockScroll(isOpenModal);

   useEffect(() => {
      if (isOpenModal) {
         document.body.append(modalRoot);
         document.body.addEventListener('keydown', keydownHandler);
      }

      return () => {
         if (isOpenModal) {
            modalRoot.remove();
            document.body.removeEventListener('keydown', keydownHandler);
         }
      };
   });

   if (isOpenModal) {
      return createPortal(
         <div className={styles.modalBody} ref={modalRef} role="dialog" aria-modal={isOpenModal} {...props}>
            {children}
         </div>,
         modalRoot
      );
   }

   return null;
};
