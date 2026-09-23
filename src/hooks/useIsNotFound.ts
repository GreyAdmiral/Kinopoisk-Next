import { useSyncExternalStore } from 'react';

import { notFoundStore } from '@store/notFoundStore';

export const useIsNotFound = () => useSyncExternalStore(notFoundStore.subscribe, notFoundStore.getSnapshot, () => false);
