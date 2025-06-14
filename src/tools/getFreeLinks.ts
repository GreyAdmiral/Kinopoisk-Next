export function getFreeLinks(id: string) {
   const freeLink = `https://flcksbr.top/film/${id}/`;
   const freeLinkTwo = `https://n1.kinosave.buzz/film/${id}/`;
   const mirrorLink = `https://vavada-pro.com/#${id}`;
   const mirrorLinkTwo = `https://www.kinopoisk.cx/film/${id}/`;

   return {
      freeLink,
      freeLinkTwo,
      mirrorLink,
      mirrorLinkTwo,
   };
}
