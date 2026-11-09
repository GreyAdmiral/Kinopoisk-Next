export function getSpareLinksForPlayer(id: string) {
   return [`${process.env.EMBESS_PLAYERS_API_URL}/embed/kp/${id}/`, `${process.env.LUXEMBD_PLAYERS_API_URL}/embed/kp/${id}/`];
}
