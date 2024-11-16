import { useEffect, useRef, useState } from 'react';

export const usePlaceholder = (value: string = '') => {
   const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
   const [placeholder, setPlaceholder] = useState<string>(value);
   const [tempPlaceholder, setTempPlaceholder] = useState<string>('');

   function placeholderChange() {
      setTempPlaceholder(placeholder);
      setPlaceholder(tempPlaceholder);
   }

   useEffect(() => {
      const { current } = ref;

      current?.addEventListener('focus', placeholderChange);
      current?.addEventListener('blur', placeholderChange);

      return () => {
         current?.removeEventListener('focus', placeholderChange);
         current?.removeEventListener('blur', placeholderChange);
      };
   });

   return [ref, placeholder] as const;
};
