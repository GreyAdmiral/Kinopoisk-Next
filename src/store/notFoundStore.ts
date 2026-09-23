import { Listener } from './types';

const listeners = new Set<Listener>();
const emit = () => listeners.forEach((listener) => void listener());
let isNotFound = false;

export const notFoundStore = {
   set(value: boolean) {
      if (isNotFound === value) return;

      isNotFound = value;
      emit();
   },
   subscribe(listener: Listener) {
      listeners.add(listener);

      return () => {
         listeners.delete(listener);
      };
   },
   getSnapshot() {
      return isNotFound;
   },
};
