export function getSpareLinksForPlayer(id: string) {
   const spareLinkOne = `${process.env.NEXT_PUBLIC_EMBESS_PLAYERS_API_URL}/embed/kp/${id}/`;
   const spareLinkTwo = `${process.env.NEXT_PUBLIC_LUXEMBD_PLAYERS_API_URL}/embed/kp/${id}/`;

   return { spareLinkOne, spareLinkTwo };
}
