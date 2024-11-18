import { SelectedMovie } from '@typesfolder/types';

export function getCSVLine(object: SelectedMovie) {
   return Object.values(object)
      .map((it) => (it ? `"${it}"` : '""'))
      .join(',');
}
