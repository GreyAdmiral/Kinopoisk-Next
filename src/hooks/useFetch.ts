import { useEffect, useState } from 'react';

export function useFetch<T>(url: string) {
   const [data, setData] = useState<T | null>(null);
   const [isLoading, setIsloading] = useState<boolean>(false);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      let isCancelled = false;

      setIsloading(true);
      setError(null);
      setData(null);

      fetch(url)
         .then((res: Response) => res.json())
         .then((data: T) => {
            !isCancelled && setData(data);
         })
         .catch((err: Error) => {
            !isCancelled && setError(err);
         })
         .finally(() => {
            !isCancelled && setIsloading(false);
         });

      return () => {
         isCancelled = true;
      };
   }, [url]);

   return [data, isLoading, error];
}
