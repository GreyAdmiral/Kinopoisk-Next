export function getFreeLinks(id: string) {
   const freeLink = `https://flicksbar.mom/film/${id}/`;
   const mirrorLink = `https://vavada-pro.com/#${id}`;

   return {
      freeLink,
      mirrorLink,
   };
}
