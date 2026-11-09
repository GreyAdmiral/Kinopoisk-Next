type Props = { title: string; year: number };

export function getTorrentSearchLink({ title, year }: Props) {
   const torrentSearchUrl = `${process.env.TORRENT_SEARCH_URL}?name=${title.replaceAll(/\s/gi, '+')}${year ? '&year=' + year : ''}`;
   return encodeURI(torrentSearchUrl);
}
