import type { FetchOptions, MoviesProps, MovieDescription, Facts, Similars, Sequel, Reviews } from '@typesfolder/types';

let instance = null;

class Kinopoisk {
   private baseUrl: string;
   private baseUrlOldAPI: string;
   private header: FetchOptions;

   constructor() {
      this.baseUrl = process.env.NEXT_PUBLIC_API_URL!;
      this.baseUrlOldAPI = process.env.NEXT_PUBLIC_OLD_API_URL!;
      this.header = {
         method: 'GET',
         headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY!, 'Content-Type': 'application/json' },
      };
   }

   async getMovies(number: string, keyword?: string): Promise<MoviesProps> {
      const baseUrl = `${this.baseUrl}?page=${number}${keyword ? `&keyword=${keyword}` : ''}`;
      let movies = [];

      try {
         const res = await fetch(baseUrl, this.header);

         if (!res.ok) {
            throw new Error('Ошибка получения фильмов!');
         }

         movies = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return { error: (err as Error).message, total: 0, totalPages: 0, items: [] };
      }

      return movies;
   }

   async getMovie(id: string): Promise<MovieDescription | null> {
      const baseUrl = `${this.baseUrl}/${id}`;
      let movie = null;

      try {
         const res = await fetch(baseUrl, this.header);

         if (!res.ok) {
            throw new Error('Ошибка получения информации о фильме!');
         }

         movie = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return movie;
   }

   async getFacts(id: string): Promise<Facts> {
      const baseUrl = `${this.baseUrl}/${id}/facts`;
      let facts = null;

      try {
         const res = await fetch(baseUrl, this.header);

         if (!res.ok) {
            throw new Error('Ошибка получения информации о фактах!');
         }

         facts = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return { error: (err as Error).message, total: 0, items: [] };
      }

      return facts;
   }

   async getSimilars(id: string): Promise<Similars | null> {
      const baseUrl = `${this.baseUrl}/${id}/similars`;
      let similars = null;

      try {
         const res = await fetch(baseUrl, this.header);

         if (!res.ok) {
            throw new Error('Ошибка получения информации о фактах!');
         }

         similars = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return similars;
   }

   async getSequelsAndPrequels(id: string): Promise<Sequel[] | null> {
      const baseUrl = `${this.baseUrlOldAPI}/${id}/sequels_and_prequels`;
      let sap = null;

      try {
         const res = await fetch(baseUrl, this.header);

         if (!res.ok) {
            throw new Error('Ошибка получения информации о сиквелах и приквелах!');
         }

         sap = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return sap;
   }

   async getReviews(id: string): Promise<Reviews | null> {
      const baseUrl = `${this.baseUrl}/${id}/reviews`;
      let reviews = null;

      try {
         const res = await fetch(baseUrl, this.header);

         if (!res.ok) {
            throw new Error('Ошибка получения рецензий!');
         }

         reviews = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return reviews;
   }
}

if (!instance) {
   instance = new Kinopoisk();
}

export const Services = instance;
