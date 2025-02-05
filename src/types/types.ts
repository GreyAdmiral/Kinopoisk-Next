import type { ReactNode } from 'react';

export type MoviesProps = {
   total: number;
   totalPages: number;
   items: MovieProps[];
   error?: string;
};

export type MovieProps = {
   kinopoiskId: string;
   imdbId: string | null;
   nameRu: string;
   nameEn: string;
   nameOriginal: string;
   ratingKinopoisk: number | null;
   ratingImdb: number | null;
   year: number;
   type: string;
   posterUrl: string;
   posterUrlPreview: string;
   countries: country[];
   genres: genre[];
};

export interface MovieDescription extends MovieProps {
   kinopoiskHDId: string | null;
   coverUrl: string | null;
   logoUrl: string | null;
   reviewsCount: number;
   ratingGoodReview: number | null;
   ratingGoodReviewVoteCount: number | null;
   ratingKinopoiskVoteCount: number | null;
   ratingImdbVoteCount: number | null;
   ratingFilmCritics: number | null;
   ratingFilmCriticsVoteCount: number | null;
   ratingAwait: number | null;
   ratingAwaitCount: number | null;
   ratingRfCritics: number | null;
   ratingRfCriticsVoteCount: number | null;
   webUrl: string;
   filmLength: number | null;
   slogan: string | null;
   description: string | null;
   shortDescription: string | null;
   editorAnnotation: string | null;
   isTicketsAvailable: boolean;
   productionStatus: string | null;
   ratingMpaa: string | number | null;
   ratingAgeLimits: string | number | null;
   startYear: number | null;
   endYear: number | null;
   serial: boolean;
   shortFilm: boolean;
   completed: boolean;
   hasImax: boolean;
   has3D: boolean;
   lastSync: string | null;
}

export type MovieDetails = Pick<
   MovieDescription,
   'nameRu' | 'nameEn' | 'nameOriginal' | 'posterUrl' | 'description' | 'shortDescription' | 'webUrl'
> & {
   Error?: '';
};

export type MoviesState = {
   activePage: number;
   movies: MovieProps[];
   totalPages: number | null;
   keywords: string;
   isError: boolean;
};

export type country = {
   country: string;
};

export type genre = {
   genre: string;
};

export type InfoState = {
   isVisible: boolean;
   isLoading: boolean;
   details: MovieDetails;
};

export type SchemeName = 'light' | 'dark';

export type SchemeState = {
   colorScheme: string;
};

export type SelectedMovie = {
   id: string;
   name: string;
   year: number;
   type: string;
   posterUrl: string;
   countries: string;
   genres: string;
   link: string;
   freeLink: string;
   mirrorLink: string;
};

export type SavedMovies = Array<[string, SelectedMovie]>;

export type FetchOptions = {
   method: string;
   cache?: RequestCache;
   headers: HeadersInit;
   next?: { revalidate: number };
};

export interface Fact {
   text: string;
   type: string;
   spoiler: boolean;
}

export interface Facts {
   total: number;
   items: Fact[];
   error?: string;
}

export interface Similar {
   filmId: string | number;
   nameRu: string;
   nameEn: string;
   nameOriginal: string;
   posterUrl: string;
   posterUrlPreview: string;
   relationType: string;
}

export interface Similars {
   total: number;
   items: Similar[];
}

export interface Review {
   kinopoiskId: number;
   type: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'UNKNOWN';
   date: string;
   positiveRating: number;
   negativeRating: number;
   author: string;
   title: string;
   description: string;
}

export interface Reviews {
   total: number;
   totalPages: number;
   totalPositiveReviews: number;
   totalNegativeReviews: number;
   totalNeutralReviews: number;
   items: Review[];
}

export type SmoothScrollProps = {
   top?: number;
   left?: number;
   behavior?: ScrollBehavior;
};

export interface Sequel {
   filmId: string;
   nameRu: string;
   nameEn: string;
   nameOriginal: string;
   posterUrl: string;
   posterUrlPreview: string;
   relationType: string;
}

export type SortedMethod = 'year' | 'title' | 'country' | 'genre' | 'type' | 'ratingKinopoisk' | 'ratingImdb';

export interface CustomSelectOption {
   id: string;
   content: string | ReactNode;
   value: SortedMethod;
}
