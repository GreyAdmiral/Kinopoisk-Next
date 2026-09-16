'use client';
import { useSearchParams } from 'next/navigation';

export const ReversedHiddenInput = () => {
   const searchParams = useSearchParams();
   const reversed = searchParams.get('reversed');

   if (!reversed) return null;
   return <input type="hidden" name="reversed" value={reversed} />;
};
