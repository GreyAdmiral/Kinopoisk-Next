export function getCountriesString(countries: Array<{ country: string }> = [], separator: string = ' / ') {
   return countries.map((country) => country.country).join(separator);
}

export function getGenresString(genres: Array<{ genre: string }> = [], separator: string = ' / ') {
   return genres.map((genre) => genre.genre).join(separator);
}
