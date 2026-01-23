type Props = { title: string; year: number };

export function getTorrentSearchLink({ title, year }: Props) {
   const torrentSearchUrl = `https://m4.frkp.site/torrent.php?name=${title.replaceAll(/\s/gi, '+')}${year ? '&year=' + year : ''}`;
   return encodeURI(torrentSearchUrl);
}
