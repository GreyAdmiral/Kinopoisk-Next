import type { MovieProps, SelectedMovie } from '@typesfolder/types';

// import { getSpareLinksForPlayer } from './getSpareLinksForPlayer';
// import { getFreeLinksForPlayer } from './getFreeLinksForPlayer';
import { getFreeLinks } from './getFreeLinks';

export function getSelectedInfo(movie: MovieProps, origin = window.location.origin): SelectedMovie {
   const separator = ' / ';

   return {
      id: movie.kinopoiskId,
      name: movie.nameRu || movie.nameEn || movie.nameOriginal,
      year: movie.year,
      type: movie.type,
      posterUrl: movie.posterUrl,
      countries: movie.countries.map((country) => country.country).join(separator),
      genres: movie.genres.map((genre) => genre.genre).join(separator),
      link: `${origin}/movies/info/${movie.kinopoiskId}`,
      freeLinks: getFreeLinks(movie.kinopoiskId),
      // playerFreeLinks: getFreeLinksForPlayer(movie.kinopoiskId),
      // spareFreeLinks: getSpareLinksForPlayer(movie.kinopoiskId),
   };
}
