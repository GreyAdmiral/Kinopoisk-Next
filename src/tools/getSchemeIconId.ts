import { SCHEMES } from '@tools/costants';
import type { SchemeName } from '@typesfolder/types';

export function getSchemeIconId(schemeName: SchemeName) {
   return schemeName === SCHEMES.LIGHT ? SCHEMES.DARK : SCHEMES.LIGHT;
}
