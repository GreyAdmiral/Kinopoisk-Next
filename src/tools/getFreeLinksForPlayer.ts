export function getFreeLinksForPlayer(id: string) {
   return [`${process.env.CLOUD_PLAYERS_URL}/iframe/${id}/`];
}
