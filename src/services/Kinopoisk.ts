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

export interface RequestOptions extends RequestInit {
   withAuth?: boolean;
}

type FetchErrorBody = { message?: string };
type SuccessRequest<T> = { ok: true; data: T };
type ErrorRequest = { ok: false; error: string; aborted?: boolean; status?: number };

export type JsonResult<T> = SuccessRequest<T> | ErrorRequest;

let instance = null;

class Kinopoisk {
   private baseUrl: string = process.env.API_URL!;
   private baseUrlOldAPI: string = process.env.OLD_API_URL!;
   private baseUrlFramesAPI: string = process.env.PLAYERS_API_URL!;
   private baseUrlDataFramesAPI: string = process.env.DATA_PLAYERS_API_URL!;
   private keyCounter: number = 0;
   public contentTypeKey = 'Content-Type';
   public contentTypeValue = 'application/json';
   public contentErrorMessage = 'Неверный тип контента.';
   #keys: string[] = (process.env.API_KEYS ?? '').split('|').filter(Boolean);

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
         next: { revalidate: 10800 },
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
            const body: FetchErrorBody = await res.json().catch(() => ({}));
            const err = new Error(knownError || body.message || `${defaultErrorMessage} (${res.status})`);

            ((<unknown>err) as ErrorRequest).status = res.status;
            throw err;
         }

         if (!isJson) {
            throw new Error(this.contentErrorMessage);
         }

         return { ok: true, data: (await res.json()) as T };
      } catch (err) {
         if ((err as Error).name === 'AbortError') {
            return { ok: false, error: 'aborted', aborted: true };
         }

         return { ok: false, error: (err as Error).message, status: ((<unknown>err) as ErrorRequest).status };
      }
   }

   async getMovies(number: string = '', keyword: string = '', options: RequestOptions = {}): Promise<JsonResult<MoviesProps>> {
      const defaultErrorMessage = 'Ошибка получения фильмов!';
      const url = `${this.baseUrl}?page=${number}${keyword ? `&keyword=${keyword}` : ''}`;

      return await this.request<MoviesProps>(url, defaultErrorMessage, options);
   }

   async getCollection(
      number: string = '1',
      collectionName: string = '',
      options: RequestOptions = {}
   ): Promise<JsonResult<MoviesProps>> {
      const defaultErrorMessage = 'Ошибка получения фильмов!';
      const url = `${this.baseUrl}/collections?type=${collectionName}&page=${number}`;

      return await this.request<MoviesProps>(url, defaultErrorMessage, options);
   }

   async getMovie(id = '', options: RequestOptions = {}): Promise<JsonResult<MovieDescription>> {
      const defaultErrorMessage = 'Ошибка получения информации о фильме!';
      const url = `${this.baseUrl}/${id}`;

      return await this.request<MovieDescription>(url, defaultErrorMessage, options);
   }

   async getFacts(id = '', options: RequestOptions = {}): Promise<JsonResult<Facts>> {
      const defaultErrorMessage = 'Ошибка получения информации о фактах!';
      const url = `${this.baseUrl}/${id}/facts`;

      return await this.request<Facts>(url, defaultErrorMessage, options);
   }

   async getSimilars(id = '', options: RequestOptions = {}): Promise<JsonResult<Similars | null>> {
      const defaultErrorMessage = 'Ошибка получения информации о похожих фильмах!';
      const url = `${this.baseUrl}/${id}/similars`;

      return await this.request<Similars>(url, defaultErrorMessage, options);
   }

   async getSequelsAndPrequels(id = '', options: RequestOptions = {}): Promise<JsonResult<Sequel[] | null>> {
      const defaultErrorMessage = 'Ошибка получения информации о сиквелах и приквелах!';
      const url = `${this.baseUrlOldAPI}/${id}/sequels_and_prequels`;

      return await this.request<Sequel[]>(url, defaultErrorMessage, options);
   }

   async getReviews(id = '', options: RequestOptions = {}): Promise<JsonResult<Reviews | null>> {
      const defaultErrorMessage = 'Ошибка получения рецензий!';
      const url = `${this.baseUrl}/${id}/reviews`;

      return await this.request<Reviews>(url, defaultErrorMessage, options);
   }

   async getBestFilms(number: string = '1', options: RequestOptions = {}): Promise<JsonResult<MoviesProps>> {
      return await this.getCollection(number, 'TOP_250_MOVIES', options);
   }

   async getProgrammersFilms(number: string = '1', options: RequestOptions = {}): Promise<JsonResult<MoviesProps>> {
      return await this.getCollection(number, 'PROGRAMMERS_THEME', options);
   }

   async getFrames(id = ''): Promise<JsonResult<Frame[]>> {
      const options = { withAuth: false };
      const defaultErrorMessage = 'Ошибка получения фреймов!';
      const url = `${this.baseUrlFramesAPI}?kinopoisk=${id}`;

      return await this.request<Frame[]>(url, defaultErrorMessage, options);
   }

   async getDataFrames(id = ''): Promise<JsonResult<{ data?: MiniFrame[] }>> {
      const options = { withAuth: false };
      const defaultErrorMessage = 'Ошибка получения информации о похожих фильмах!';
      const url = `${this.baseUrlDataFramesAPI}?kinopoisk=${id}`;

      return await this.request<{ data?: MiniFrame[] }>(url, defaultErrorMessage, options);
   }
}

if (!instance) {
   instance = new Kinopoisk();
}

export const Services = instance;
