export const getAlias = (string: string) =>
   encodeURIComponent(string.split(' ').join('_')).toLocaleLowerCase().replace(/[^\w]/gi, '');
