export function getSpareLinksForPlayer(id: string) {
   const spareLinkOne = `https://api.embess.ws/embed/kp/${id}/`;
   const spareLinkTwo = `https://api.luxembd.ws/embed/kp/${id}/`;

   return { spareLinkOne, spareLinkTwo };
}
