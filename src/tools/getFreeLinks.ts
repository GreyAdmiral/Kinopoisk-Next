export function getFreeLinks(id: string) {
   const intermediateMirrorOne = `https://habster.sbs/series/${id}/`;
   const intermediateMirrorTwo = `https://flcksbr.top/film/${id}/`;
   const intermediateMirrorThree = `https://prq.pkvbn.xyz/${id}/`;
   const intermediateMirrorFour = `https://kinopoisk.wtf/series/${id}/`;
   const intermediateMirrorFive = `https://kinopk.web.app/movie/${id}/`;

   return {
      intermediateMirrorOne,
      intermediateMirrorTwo,
      intermediateMirrorThree,
      intermediateMirrorFour,
      intermediateMirrorFive,
   };
}
