import type { FetchOptions, MoviesProps, MovieDescription, Facts, Similars } from '@typesfolder/types';

let instance = null;

class Kinopoisk {
   private baseUrl: string;
   private header: FetchOptions;

   constructor() {
      this.baseUrl = process.env.NEXT_PUBLIC_API_URL!;
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
         console.error(err);
         // throw new Error((err as Error).message);
      }

      return movies;
   }

   async getMovie(id: string): Promise<MovieDescription> {
      const baseUrl = `${this.baseUrl}/${id}`;
      let movie = null;

      try {
         const res = await fetch(baseUrl, this.header);

         if (!res.ok) {
            throw new Error('Ошибка получения информации о фильме!');
         }

         movie = await res.json();
      } catch (err) {
         console.error(err);
         // throw new Error((err as Error).message);
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
         console.error(err);
         // throw new Error((err as Error).message);
      }

      return facts;
   }

   async getSimilars(id: string): Promise<Similars> {
      const baseUrl = `${this.baseUrl}/${id}/similars`;
      let similars = null;

      try {
         const res = await fetch(baseUrl, this.header);

         if (!res.ok) {
            throw new Error('Ошибка получения информации о фактах!');
         }

         similars = await res.json();
      } catch (err) {
         console.error(err);
         // throw new Error((err as Error).message);
      }

      return similars;
   }
}

if (!instance) {
   instance = new Kinopoisk();
}

export const Services = instance;
