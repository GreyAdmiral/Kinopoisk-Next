export function getStringFromValue(
   array: Array<{ [name: string]: string }> = [],
   value: 'country' | 'genre',
   separator: string = ' / '
) {
   return array.map((it) => it[value]).join(separator);
}
