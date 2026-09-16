export type Props = {
   params: Promise<{
      id: string;
   }>;
   searchParams: Promise<{
      token: string;
   }>;
};
