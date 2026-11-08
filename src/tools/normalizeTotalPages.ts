export function normalizeTotalPages(totalPages: number | string) {
   const value = Math.trunc(Number(totalPages));
   return Number.isFinite(value) && value > 0 ? value : 1;
}
