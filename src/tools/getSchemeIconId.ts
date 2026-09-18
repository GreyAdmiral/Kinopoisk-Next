import { THEMES } from '@tools/costants';

export function getSchemeIconId(schemeName: string) {
   return schemeName === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
}
