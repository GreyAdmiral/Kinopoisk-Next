import { Frame, FrameLink, MiniFrame } from '@typesfolder/types';

export function getFrameLinks(frames: Frame[] = []): FrameLink[] {
   const links = [];

   for (const { iframeUrl, source, success } of frames) {
      if (!success) continue;

      const info = { title: source, url: iframeUrl };
      links.push(info);
   }

   return links;
}

export function getMiniFrameLinks(frames: MiniFrame[] = []): string[] {
   const links = frames.map((frame) => frame.iframeUrl).filter(Boolean);
   return links;
}

export function getCloudFrameLink(id: string = ''): FrameLink {
   const title = 'Cloud';
   const url = `https://iframe.cloud/iframe/${id}/`;
   return { title, url };
}
