export type Props = {
   params: {
      page: string;
   };
   searchParams: {
      search: string;
   };
};

export type FetchOptions = { method: string; headers: HeadersInit };
