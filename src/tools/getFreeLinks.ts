export function getFreeLinks(id: string) {
   const mirrorLinkOne = `https://api.embess.ws/embed/kp/${id}/`;
   const mirrorLinkTwo = `https://iframe.cloud/iframe/${id}/`;
   const mirrorLinkThree = `https://api.luxembd.ws/embed/${id}/`;
   const intermediateMirrorOne = `https://ww1.frkp.cc/film/${id}/`;
   const intermediateMirrorTwo = `https://flcksbr.top/film/${id}/`;

   return { mirrorLinkOne, mirrorLinkTwo, mirrorLinkThree, intermediateMirrorOne, intermediateMirrorTwo };
}
