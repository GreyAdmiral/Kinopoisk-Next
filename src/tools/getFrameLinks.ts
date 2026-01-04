import { Frame } from '@typesfolder/types';

export function getFrameLinks(frames: Frame[] = []): string[] {
   const links = frames.map((frame) => frame.iframeUrl).filter(Boolean);
   return links;
}
