'use client';
import { useCallback, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { SliderListProps, State } from './types';
import styles from './SliderList.module.scss';

export const SliderList: FC<SliderListProps> = ({ className, children }) => {
   const listRef = useRef<HTMLUListElement>(null);
   const stateRef = useRef<State>({
      isDragging: false,
      startX: null,
      scrollLeft: null,
   });

   const mouseDownHandler = useCallback((e: MouseEvent) => {
      e.stopPropagation();
      const { current: state } = stateRef;
      const { current: list } = listRef;

      if (list) {
         state.isDragging = true;
         state.startX = e.pageX - list.offsetLeft;
         state.scrollLeft = list.scrollLeft;
      }
   }, []);

   const mouseUpHandler = useCallback((e: MouseEvent) => {
      e.stopPropagation();
      const { current: state } = stateRef;

      if (state.isDragging) {
         state.isDragging = false;
      }
   }, []);

   const mouseMoveHandler = useCallback((e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: state } = stateRef;
      const { current: list } = listRef;

      if (!state.isDragging) {
         return;
      }

      if (list) {
         const x = e.pageX - list.offsetLeft;
         const walkX = (x - state.startX!) * 1;
         list.scrollLeft = state.scrollLeft! - walkX;
      }
   }, []);

   const wheelHandler = useCallback((e: WheelEvent) => {
      e.stopPropagation();
      const { shiftKey } = e;
      const { current: list } = listRef;

      if (list && shiftKey) {
         e.preventDefault();
         list.scrollLeft += e.deltaY;
      }
   }, []);

   useEffect(() => {
      const { current: list } = listRef;

      if (list) {
         list.addEventListener('pointerdown', mouseDownHandler);
         list.addEventListener('pointerup', mouseUpHandler);
         list.addEventListener('pointermove', mouseMoveHandler);
         list.addEventListener('pointerleave', mouseUpHandler);
         list.addEventListener('wheel', wheelHandler, { passive: false });
      }

      return () => {
         if (list) {
            list.removeEventListener('pointerdown', mouseDownHandler);
            list.removeEventListener('pointerup', mouseUpHandler);
            list.removeEventListener('pointermove', mouseMoveHandler);
            list.removeEventListener('pointerleave', mouseUpHandler);
            list.removeEventListener('wheel', wheelHandler);
         }
      };
   }, [mouseDownHandler, mouseMoveHandler, mouseUpHandler, wheelHandler]);

   return (
      <ul
         ref={listRef}
         style={{ overflow: 'hidden' }}
         className={`${styles.slider}${className ? ' ' + className : ''}`}
      >
         {children}
      </ul>
   );
};
