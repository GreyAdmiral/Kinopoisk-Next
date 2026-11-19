interface MovieLinksInfo {
   id: string;
   imdbId: string | null;
   webUrl: string;
   title: string;
   year: number;
   type: string;
}

export interface MovieLinksProps {
   info: MovieLinksInfo;
}
