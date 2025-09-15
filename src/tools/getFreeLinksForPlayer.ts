export function getFreeLinksForPlayer(id: string) {
   const linkOne = `https://iframe.cloud/iframe/${id}/`;
   const linkTwo = `https://api.embess.ws/embed/kp/${id}/`;
   const linkThree = `https://api.luxembd.ws/embed/kp/${id}/`;

   return { linkOne, linkTwo, linkThree };
}
