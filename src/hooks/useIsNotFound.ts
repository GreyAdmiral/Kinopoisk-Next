'use client';

import { useSyncExternalStore } from 'react';

import { notFoundStore } from '@components/NotFound/notFoundStore';

export const useIsNotFound = () => useSyncExternalStore(notFoundStore.subscribe, notFoundStore.getSnapshot, () => false);
