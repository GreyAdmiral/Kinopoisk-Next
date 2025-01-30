import { useCallback, useEffect, useState } from 'react';

export function useCopyToClipboard(resetInterval: number | null = null) {
   const [isCopied, setCopied] = useState(false);

   const handleCopy = useCallback((text: string | number) => {
      if (typeof text === 'string' || typeof text == 'number') {
         navigator.clipboard
            .writeText(text.toString())
            .then(() => {
               setCopied(true);
            })
            .catch((err) => console.warn(err));
      } else {
         setCopied(false);
         console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`);
      }
   }, []);

   useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isCopied && resetInterval) {
         timeout = setTimeout(() => setCopied(false), resetInterval);
      }

      return () => {
         clearTimeout(timeout);
      };
   }, [isCopied, resetInterval]);

   return [isCopied, handleCopy] as const;
}
