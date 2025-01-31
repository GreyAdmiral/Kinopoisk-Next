import { SmoothScrollProps } from '@typesfolder/types';

export function smoothScroll({ top = 0, left = 0, behavior = 'smooth' }: SmoothScrollProps) {
   window.scrollTo({ top, left, behavior });
}
