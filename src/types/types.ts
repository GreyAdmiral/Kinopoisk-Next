export type MoviesProps = {
   total: number;
   totalPages: number;
   items: MovieProps[];
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

type country = {
   country: string;
};

type genre = {
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
};

export type SavedMovies = Array<[string, SelectedMovie]>;

export type FetchOptions = { method: string; headers: HeadersInit };

export interface Fact {
   text: string;
   type: string;
   spoiler: boolean;
}

export interface Facts {
   total: number;
   items: Fact[];
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
   total: string | number;
   items: Similar[];
}

export type SmoothScrollProps = {
   top?: number;
   left?: number;
   behavior?: ScrollBehavior;
};

export interface SEQUEL {
   filmId: string;
   nameRu: string;
   nameEn: string;
   nameOriginal: string;
   posterUrl: string;
   posterUrlPreview: string;
   relationType: string;
}
