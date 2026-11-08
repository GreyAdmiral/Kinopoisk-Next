export function normalizePage(page: number | string) {
   const value = Math.trunc(Number(page));
   return Number.isFinite(value) && value > 0 ? value : 1;
}
