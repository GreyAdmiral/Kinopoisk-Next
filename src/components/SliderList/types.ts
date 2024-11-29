import type { PropsWithChildren } from 'react';

export interface SliderListProps extends PropsWithChildren {
   className?: string;
}

export type State = {
   isDragging: boolean | null;
   startX: number | null;
   scrollLeft: number | null;
};
