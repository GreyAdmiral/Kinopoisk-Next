export function getFreeLinksForPlayer(id: string) {
   return [`${process.env.NEXT_PUBLIC_CLOUD_PLAYERS_URL}/iframe/${id}/`];
}
