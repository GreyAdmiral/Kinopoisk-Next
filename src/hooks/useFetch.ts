import { useEffect, useState } from 'react';

export function useFetch<T>(url: string | URL | Request, init?: Omit<RequestInit, 'signal'>) {
   const [data, setData] = useState<T | null>(null);
   const [isLoading, setIsloading] = useState<boolean>(false);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const controller = new AbortController();
      const fetchInit = { ...init, signal: controller.signal };

      setIsloading(true);
      setError(null);
      setData(null);

      fetch(url, fetchInit)
         .then((res: Response) => {
            if (!res.ok) {
               let message = `Fetch error! Status: ${res.status}.`;
               if (res.statusText) message += ` Message: ${res.statusText}.`;
               throw new Error(message);
            }

            return res.json();
         })
         .then((json: T) => {
            if (!controller.signal.aborted) {
               setData(json);
            }
         })
         .catch((err: Error) => {
            if (err.name !== 'AbortError') {
               console.error('Error:', err.message);
               setError(err);
            }
         })
         .finally(() => {
            if (!controller.signal.aborted) {
               setIsloading(false);
            }
         });

      return () => controller.abort();
   }, [init, url]);

   return [data, isLoading, error] as const;
}
