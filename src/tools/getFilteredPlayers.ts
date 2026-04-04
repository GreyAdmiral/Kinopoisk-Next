import { FrameLink } from '@typesfolder/types';

export function getFilteredPlayers(frames: FrameLink[] = []): FrameLink[] {
   const forbiddenPlayers = ['Vibix'];

   return frames.filter(({ title }) => !forbiddenPlayers.some((forbidden) => forbidden.toLowerCase() === title.toLowerCase()));
}
