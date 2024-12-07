'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AppRoutes } from '@tools/costants';

export async function searchAction(data: FormData) {
   const { keyword, queries } = Object.fromEntries(data) as Record<string, string>;
   const searchParams = new URLSearchParams(queries);

   if (keyword) {
      searchParams.set('keyword', encodeURIComponent(keyword));
   } else if (searchParams.has('keyword')) {
      searchParams.delete('keyword');
   }

   const queies = searchParams.toString();
   const path = `${AppRoutes.PAGE_ROUTE}/1${queies ? `?${queies}` : ''}`;

   revalidatePath(path);
   redirect(path);
}
