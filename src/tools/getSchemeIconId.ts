import { SCHEMES } from '@tools/costants';

export function getSchemeIconId(schemeName: string) {
   return schemeName === SCHEMES.LIGHT ? SCHEMES.DARK : SCHEMES.LIGHT;
}
