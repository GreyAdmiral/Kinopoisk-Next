interface MovieLinksInfo {
   id: string;
   imdbId: string | null;
   webUrl: string;
   title: string;
   year: number;
}

export interface MovieLinksProps {
   info: MovieLinksInfo;
}
