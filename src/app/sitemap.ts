import { MetadataRoute } from 'next';

import { Services } from '@services/Kinopoisk';
import { getCensoredFilms } from '@tools/getCensoredFilms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const page = '1';
   const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}`;
   const staticRoutes: MetadataRoute.Sitemap = [
      {
         url: baseUrl,
         lastModified: new Date(),
         changeFrequency: 'hourly',
         priority: 1.0,
      },
   ];

   try {
      const { items: rawMovies, error } = await Services.getMovies(page);

      if (error) throw error;

      const dynamicRoutes: MetadataRoute.Sitemap = getCensoredFilms(rawMovies).map(({ kinopoiskId }) => {
         return {
            url: `${baseUrl}/movies/info/${kinopoiskId}`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.8,
         };
      });

      return [...staticRoutes, ...dynamicRoutes];
   } catch (err) {
      console.log(err);
      return staticRoutes;
   }
}
