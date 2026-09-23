export function getFreeLinksForPlayer(id: string) {
   // const freeLinkOne = `${process.env.NEXT_PUBLIC_LOL_PLAYERS_URL}/?id=${id}&n=0`;
   const freeLinkTwo = `${process.env.NEXT_PUBLIC_CLOUD_PLAYERS_URL}/iframe/${id}/`;
   // const freeLinkThree = `${process.env.NEXT_PUBLIC_OBRUT_PLAYERS_API_URL}?kinopoisk_id=${id}`;

   return { freeLinkTwo };
}
