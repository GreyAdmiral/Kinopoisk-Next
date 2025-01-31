'use client';
import { useMediaQuery } from '@hooks/useMediaQuery';
import type { FC } from 'react';
import type { QueryShowProps } from './types';

export const QueryShow: FC<QueryShowProps> = ({ query, children }) => {
   const isQuery = useMediaQuery(query);

   return isQuery ? children : null;
};
