import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
   const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}`;

   return {
      rules: [
         {
            userAgent: '*',
            allow: ['/', '/movies/', '/movies/info/'],
         },
         {
            userAgent: ['Applebot', 'Bingbot', 'Googlebot', 'YandexBot'],
            disallow: ['/movies/info/'],
         },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
   };
}
