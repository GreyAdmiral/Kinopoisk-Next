/* eslint-disable no-unused-vars */
export const throttle = function <T extends (...args: Parameters<T>) => unknown>(
   this: ThisParameterType<T>,
   fn: T,
   delay: number = 250
) {
   let isWaiting = false,
      savedArgs: Parameters<T> | null = null,
      savedThis: ThisParameterType<T> | null = null;

   return function wrapper(this: ThisParameterType<T>, ...args: Parameters<T>) {
      if (isWaiting) {
         savedArgs = args;
         savedThis = this;
         return;
      }

      fn.apply(this, args);
      isWaiting = true;
      setTimeout(() => {
         isWaiting = false;

         if (savedThis) {
            wrapper.apply(savedThis, savedArgs!);
            savedThis = null;
            savedArgs = null;
         }
      }, delay);
   };
};
