interface Attributes {
   type: string;
   id: string | null;
}

export function getImdbUrl(attr: Attributes): string {
   const { id = null, type = 'FILM' } = attr;
   const tvTypes = ['MINI_SERIES', 'TV_SERIES', 'TV_SHOW'];

   if (tvTypes.includes(type)) {
      return `${process.env.IMDB_FRAME_URL!}/tv/${id}`;
   } else {
      return `${process.env.IMDB_FRAME_URL!}/movie/${id}`;
   }
}
