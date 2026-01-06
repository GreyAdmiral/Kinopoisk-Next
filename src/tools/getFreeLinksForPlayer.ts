export function getFreeLinksForPlayer(id: string) {
   const freeLinkOne = `https://ddbb.lol/?id=${id}&n=0`;
   const freeLinkTwo = `https://iframe.cloud/iframe/${id}/`;

   return { freeLinkOne, freeLinkTwo };
}
