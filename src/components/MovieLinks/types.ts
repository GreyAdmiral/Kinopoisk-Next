import { FrameLink } from '@typesfolder/types';

export interface MovieLinksProps {
   id: string;
   webUrl: string;
   title: string;
   year: number;
   frames: FrameLink[];
}
