export function isExists(param: string | null = ''): boolean {
   return Boolean(param) && param !== 'N/A';
}
