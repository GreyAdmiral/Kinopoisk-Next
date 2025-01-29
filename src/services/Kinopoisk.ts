import type { FetchOptions, MoviesProps, MovieDescription, Facts, Similars, Sequel, Reviews } from '@typesfolder/types';

let instance = null;

class Kinopoisk {
   private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;
   private baseUrlOldAPI: string = process.env.NEXT_PUBLIC_OLD_API_URL!;
   #keys: string[] = process.env.NEXT_PUBLIC_API_KEYS!.split('|');
   private keyCounter: number = 0;

   getKey(): string {
      const key = this.#keys[this.keyCounter];
      this.keyCounter = this.keyCounter + 1 >= this.#keys.length ? 0 : this.keyCounter + 1;

      return key;
   }

   getHeader(key: string): FetchOptions {
      return {
         method: 'GET',
         // cache: 'force-cache',
         headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
         next: { revalidate: 3600 },
      };
   }

   async getMovies(number: string, keyword?: string): Promise<MoviesProps> {
      const defaultErrorMessage = 'Ошибка получения фильмов!';
      const baseUrl = `${this.baseUrl}?page=${number}${keyword ? `&keyword=${keyword}` : ''}`;
      let movies = [];

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));

         if (!res.ok) {
            const req = await res.json();
            throw new Error((req as Error).message || defaultErrorMessage);
         }

         movies = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return { error: (err as Error).message, total: 0, totalPages: 0, items: [] };
      }

      return movies;
   }

   async getMovie(id: string): Promise<MovieDescription | null> {
      const defaultErrorMessage = 'Ошибка получения информации о фильме!';
      const baseUrl = `${this.baseUrl}/${id}`;
      let movie = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));

         if (!res.ok) {
            const req = await res.json();
            throw new Error((req as Error).message || defaultErrorMessage);
         }

         movie = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return movie;
   }

   async getFacts(id: string): Promise<Facts> {
      const defaultErrorMessage = 'Ошибка получения информации о фактах!';
      const baseUrl = `${this.baseUrl}/${id}/facts`;
      let facts = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));

         if (!res.ok) {
            const req = await res.json();
            throw new Error((req as Error).message || defaultErrorMessage);
         }

         facts = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return { error: (err as Error).message, total: 0, items: [] };
      }

      return facts;
   }

   async getSimilars(id: string): Promise<Similars | null> {
      const defaultErrorMessage = 'Ошибка получения информации о фактах!';
      const baseUrl = `${this.baseUrl}/${id}/similars`;
      let similars = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));

         if (!res.ok) {
            const req = await res.json();
            throw new Error((req as Error).message || defaultErrorMessage);
         }

         similars = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return similars;
   }

   async getSequelsAndPrequels(id: string): Promise<Sequel[] | null> {
      const defaultErrorMessage = 'Ошибка получения информации о сиквелах и приквелах!';
      const baseUrl = `${this.baseUrlOldAPI}/${id}/sequels_and_prequels`;
      let sap = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));

         if (!res.ok) {
            const req = await res.json();
            throw new Error((req as Error).message || defaultErrorMessage);
         }

         sap = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return sap;
   }

   async getReviews(id: string): Promise<Reviews | null> {
      const defaultErrorMessage = 'Ошибка получения рецензий!';
      const baseUrl = `${this.baseUrl}/${id}/reviews`;
      let reviews = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));

         if (!res.ok) {
            const req = await res.json();
            throw new Error((req as Error).message || defaultErrorMessage);
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
