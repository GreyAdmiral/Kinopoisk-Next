export function getFreeLinksForPlayer(id: string) {
   const linkOne = `https://api.embess.ws/embed/kp/${id}/`;
   const linkTwo = `https://iframe.cloud/iframe/${id}/`;
   const linkThree = `https://api.luxembd.ws/embed/kp/${id}/`;

   return { linkOne, linkTwo, linkThree };
}
