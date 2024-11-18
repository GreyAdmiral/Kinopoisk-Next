import { MovieDescription, MovieDetails } from '@typesfolder/types';

export function getFilteredDescription(object: MovieDescription): MovieDetails {
   const { nameRu, nameEn, nameOriginal, posterUrl, description, shortDescription, webUrl } = object;
   return { nameRu, nameEn, nameOriginal, posterUrl, description, shortDescription, webUrl };
}
