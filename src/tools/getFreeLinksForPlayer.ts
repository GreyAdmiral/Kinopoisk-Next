export function getFreeLinksForPlayer(id: string) {
   const freeLinkOne = `${process.env.NEXT_PUBLIC_LOL_PLAYERS_URL}/?id=${id}&n=0`;
   const freeLinkTwo = `${process.env.NEXT_PUBLIC_CLOUD_PLAYERS_URL}/iframe/${id}/`;

   return { freeLinkOne, freeLinkTwo };
}
