import { getErrorInfo } from '@tools/getErrorInfo';
import type {
   Facts,
   FetchOptions,
   Frame,
   MiniFrame,
   MovieDescription,
   MoviesProps,
   Reviews,
   Sequel,
   Similars,
} from '@typesfolder/types';

interface RequestOptions extends RequestInit {
   withAuth?: boolean;
}

type JsonResult<T> = { ok: true; data: T } | { ok: false; error: string; aborted?: boolean };
type FetchBody = { message?: string };

let instance = null;

class Kinopoisk {
   private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;
   private baseUrlOldAPI: string = process.env.NEXT_PUBLIC_OLD_API_URL!;
   private baseUrlFramesAPI: string = process.env.NEXT_PUBLIC_PLAYERS_API_URL!;
   private baseUrlDataFramesAPI: string = process.env.NEXT_PUBLIC_DATA_PLAYERS_API_URL!;
   private keyCounter: number = 0;
   public contentTypeKey = 'Content-Type';
   public contentTypeValue = 'application/json';
   public contentErrorMessage = 'Неверный тип контента.';
   #keys: string[] = process.env.NEXT_PUBLIC_API_KEYS!.split('|').filter(Boolean);

   getKey(): string {
      const key = this.#keys[this.keyCounter];
      const keysLength = this.#keys.length;

      this.keyCounter = keysLength ? (this.keyCounter + 1) % keysLength : 0;
      return key;
   }

   getHeader(key?: string): FetchOptions {
      return {
         method: 'GET',
         headers: { 'X-API-KEY': key ?? this.getKey(), 'Content-Type': 'application/json' },
         next: { revalidate: 3600 },
      };
   }

   private async request<T>(url: string, defaultErrorMessage: string, options: RequestOptions = {}): Promise<JsonResult<T>> {
      const { signal, withAuth = true } = options;

      try {
         const res = await fetch(url, {
            ...(withAuth ? this.getHeader() : { method: 'GET' }),
            signal,
         });

         const isJson = res.headers.get(this.contentTypeKey)?.includes(this.contentTypeValue);

         if (!res.ok) {
            const knownError = getErrorInfo(res.status);
            const body: FetchBody = await res.json().catch((err) => ({ message: err.message }));
            throw new Error(knownError || body.message || defaultErrorMessage);
         }

         if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         return { ok: true, data: (await res.json()) as T };
      } catch (err) {
         if ((err as Error).name === 'AbortError') {
            return { ok: false, error: 'aborted', aborted: true };
         }

         return { ok: false, error: (err as Error).message };
      }
   }

   async getMovies(number: string = '', keyword: string = '', options: RequestOptions = {}): Promise<MoviesProps> {
      const defaultErrorMessage = 'Ошибка получения фильмов!';
      const url = `${this.baseUrl}?page=${number}${keyword ? `&keyword=${keyword}` : ''}`;
      const result = await this.request<MoviesProps>(url, defaultErrorMessage, options);

      if (!result.ok) {
         if (result.aborted) throw new DOMException('Aborted', 'AbortError');
         return { error: result.error, total: 0, totalPages: 0, items: [] };
      }

      return result.data;
   }

   async getMovie(id = '', options: RequestOptions = {}): Promise<MovieDescription | null> {
      const defaultErrorMessage = 'Ошибка получения информации о фильме!';
      const url = `${this.baseUrl}/${id}`;
      const result = await this.request<MovieDescription>(url, defaultErrorMessage, options);

      if (!result.ok) {
         if (result.aborted) throw new DOMException('Aborted', 'AbortError');
         return null;
      }

      return result.data;
   }

   async getFacts(id = '', options: RequestOptions = {}): Promise<Facts> {
      const defaultErrorMessage = 'Ошибка получения информации о фактах!';
      const url = `${this.baseUrl}/${id}/facts`;
      const result = await this.request<Facts>(url, defaultErrorMessage, options);

      if (!result.ok) {
         if (result.aborted) throw new DOMException('Aborted', 'AbortError');
         return { error: result.error, total: 0, items: [] };
      }

      return result.data;
   }

   async getSimilars(id = '', options: RequestOptions = {}): Promise<Similars | null> {
      const defaultErrorMessage = 'Ошибка получения информации о похожих фильмах!';
      const url = `${this.baseUrl}/${id}/similars`;
      const result = await this.request<Similars>(url, defaultErrorMessage, options);

      if (!result.ok) {
         if (result.aborted) throw new DOMException('Aborted', 'AbortError');
         return null;
      }

      return result.data;
   }

   async getSequelsAndPrequels(id = '', options: RequestOptions = {}): Promise<Sequel[] | null> {
      const defaultErrorMessage = 'Ошибка получения информации о сиквелах и приквелах!';
      const url = `${this.baseUrlOldAPI}/${id}/sequels_and_prequels`;
      const result = await this.request<Sequel[]>(url, defaultErrorMessage, options);

      if (!result.ok) {
         if (result.aborted) throw new DOMException('Aborted', 'AbortError');
         return null;
      }

      return result.data;
   }

   async getReviews(id = '', options: RequestOptions = {}): Promise<Reviews | null> {
      const defaultErrorMessage = 'Ошибка получения рецензий!';
      const url = `${this.baseUrl}/${id}/reviews`;
      const result = await this.request<Reviews>(url, defaultErrorMessage, options);

      if (!result.ok) {
         if (result.aborted) throw new DOMException('Aborted', 'AbortError');
         return null;
      }

      return result.data;
   }

   async getFrames(id = ''): Promise<Frame[]> {
      const options = { withAuth: false };
      const defaultErrorMessage = 'Ошибка получения фреймов!';
      const url = `${this.baseUrlFramesAPI}?kinopoisk=${id}`;
      const result = await this.request<Frame[]>(url, defaultErrorMessage, options);

      if (!result.ok) {
         if (result.aborted) throw new DOMException('Aborted', 'AbortError');
         return [];
      }

      return result.data;
   }

   async getDataFrames(id = ''): Promise<MiniFrame[]> {
      const options = { withAuth: false };
      const defaultErrorMessage = 'Ошибка получения информации о похожих фильмах!';
      const url = `${this.baseUrlDataFramesAPI}?kinopoisk=${id}`;
      const result = await this.request<{ data?: MiniFrame[] }>(url, defaultErrorMessage, options);

      if (!result.ok) {
         if (result.aborted) throw new DOMException('Aborted', 'AbortError');
         return [];
      }

      return result.data.data || [];
   }
}

if (!instance) {
   instance = new Kinopoisk();
}

export const Services = instance;
