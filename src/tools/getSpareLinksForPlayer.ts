export function getSpareLinksForPlayer(id: string) {
   return [
      `${process.env.NEXT_PUBLIC_EMBESS_PLAYERS_API_URL}/embed/kp/${id}/`,
      `${process.env.NEXT_PUBLIC_LUXEMBD_PLAYERS_API_URL}/embed/kp/${id}/`,
   ];
}
