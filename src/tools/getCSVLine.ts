import { SelectedMovie } from '@typesfolder/types';

function arrayToLine(arr: Array<string | number>): string {
   return Array.isArray(arr) ? arr.map((it) => (it ? `"${it}"` : '""')).join(',') : '';
}

export function getCSVLine(object: SelectedMovie) {
   const { freeLinks, ...info } = object;
   const freeLinksLine = arrayToLine(freeLinks);
   const baseLine = arrayToLine(Object.values(info));

   return [baseLine, freeLinksLine].join(',');
}
