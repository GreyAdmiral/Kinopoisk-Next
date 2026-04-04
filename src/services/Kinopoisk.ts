import { getErrorInfo } from '@tools/getErrorInfo';
import type {
   FetchOptions,
   MoviesProps,
   MovieDescription,
   Facts,
   Similars,
   Sequel,
   Reviews,
   Frame,
   MiniFrame,
} from '@typesfolder/types';

let instance = null;

class Kinopoisk {
   private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;
   private baseUrlOldAPI: string = process.env.NEXT_PUBLIC_OLD_API_URL!;
   private baseUrlFramesAPI: string = process.env.NEXT_PUBLIC_PLAYERS_API_URL!;
   private baseUrlfbphDFramesAPI: string = process.env.NEXT_PUBLIC_FBPHD_PLAYERS_API_URL!;
   private keyCounter: number = 0;
   public contentTypeKey = 'Content-Type';
   public contentTypeValue = 'application/json';
   public contentErrorMessage = 'Неверный тип контента.';
   #keys: string[] = process.env.NEXT_PUBLIC_API_KEYS!.split('|');

   getKey(): string {
      const key = this.#keys[this.keyCounter];
      const keysLength = this.#keys.length;

      this.keyCounter = keysLength ? (this.keyCounter + 1) % keysLength : 0;
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

   async getMovies(number: string = '', keyword: string = ''): Promise<MoviesProps> {
      const defaultErrorMessage = 'Ошибка получения фильмов!';
      const baseUrl = `${this.baseUrl}?page=${number}${keyword ? `&keyword=${keyword}` : ''}`;
      let movies = [];

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));
         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const knownError = getErrorInfo(res.status);
            const req = await res.json();
            throw new Error(knownError || (req as Error).message || defaultErrorMessage);
         } else if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         movies = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return { error: (err as Error).message, total: 0, totalPages: 0, items: [] };
      }

      return movies;
   }

   async getMovie(id: string = ''): Promise<MovieDescription | null> {
      const defaultErrorMessage = 'Ошибка получения информации о фильме!';
      const baseUrl = `${this.baseUrl}/${id}`;
      let movie = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));
         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const knownError = getErrorInfo(res.status);
            const req = await res.json();
            throw new Error(knownError || (req as Error).message || defaultErrorMessage);
         } else if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         movie = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return movie;
   }

   async getFacts(id: string = ''): Promise<Facts> {
      const defaultErrorMessage = 'Ошибка получения информации о фактах!';
      const baseUrl = `${this.baseUrl}/${id}/facts`;
      let facts = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));
         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const knownError = getErrorInfo(res.status);
            const req = await res.json();
            throw new Error(knownError || (req as Error).message || defaultErrorMessage);
         } else if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         facts = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return { error: (err as Error).message, total: 0, items: [] };
      }

      return facts;
   }

   async getSimilars(id: string = ''): Promise<Similars | null> {
      const defaultErrorMessage = 'Ошибка получения информации о фактах!';
      const baseUrl = `${this.baseUrl}/${id}/similars`;
      let similars = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));
         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const knownError = getErrorInfo(res.status);
            const req = await res.json();
            throw new Error(knownError || (req as Error).message || defaultErrorMessage);
         } else if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         similars = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return similars;
   }

   async getSequelsAndPrequels(id: string = ''): Promise<Sequel[] | null> {
      const defaultErrorMessage = 'Ошибка получения информации о сиквелах и приквелах!';
      const baseUrl = `${this.baseUrlOldAPI}/${id}/sequels_and_prequels`;
      let sap = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));
         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const knownError = getErrorInfo(res.status);
            const req = await res.json();
            throw new Error(knownError || (req as Error).message || defaultErrorMessage);
         } else if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         sap = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return sap;
   }

   async getReviews(id: string = ''): Promise<Reviews | null> {
      const defaultErrorMessage = 'Ошибка получения рецензий!';
      const baseUrl = `${this.baseUrl}/${id}/reviews`;
      let reviews = null;

      try {
         const res = await fetch(baseUrl, this.getHeader(this.getKey()));
         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const knownError = getErrorInfo(res.status);
            const req = await res.json();
            throw new Error(knownError || (req as Error).message || defaultErrorMessage);
         } else if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         reviews = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return null;
      }

      return reviews;
   }

   async getFrames(id: string = ''): Promise<Frame[]> {
      const url = `${this.baseUrlFramesAPI}?kinopoisk=${id}`;
      const defaultErrorMessage = 'Ошибка получения фреймов!';
      let frames = null;

      try {
         const res = await fetch(url);
         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const req = await res.json();
            throw new Error((req as Error).message || defaultErrorMessage);
         } else if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         frames = await res.json();
      } catch (err) {
         // console.error((err as Error).message);
         return [];
      }

      return frames;
   }

   async getFBPHdPlayFrames(id: string = ''): Promise<MiniFrame[]> {
      const url = `${this.baseUrlfbphDFramesAPI}?kinopoisk=${id}`;
      const defaultErrorMessage = 'Ошибка получения фреймов!';
      let frames = null;

      try {
         const res = await fetch(url);
         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const req = await res.json();
            throw new Error((req as Error).message || defaultErrorMessage);
         } else if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         const req = await res.json();
         frames = req.data || [];
      } catch (err) {
         // console.error((err as Error).message);
         return [];
      }

      return frames;
   }
}

if (!instance) {
   instance = new Kinopoisk();
}

export const Services = instance;
