'use client';

import type { FC } from 'react';

import { useMediaQuery } from '@hooks/useMediaQuery';

import type { QueryShowProps } from './types';

export const QueryShow: FC<QueryShowProps> = ({ query, children }) => {
   const isQuery = useMediaQuery(query);

   return isQuery ? children : null;
};
