'use client';

import type { FC } from 'react';

import styles from './ButtonSkeleton.module.scss';
import type { BSkeleton } from './types';

export const ButtonSkeleton: FC<BSkeleton> = ({ iconSize = 20, ...rest }) => {
   const { className, ...subRest } = rest;
   const classNameString = className ? `${className} ${styles.skeleton}` : `${styles.skeleton}`;

   return (
      <div className={classNameString} {...subRest} aria-hidden="true">
         <svg width={iconSize} height={iconSize} className={styles.skeleton_icon} />
      </div>
   );
};
