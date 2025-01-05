import { CustomSelectOption } from '@typesfolder/types';

export interface CustomSelectProps {
   list: CustomSelectOption[];
   defaultPointNumber?: number;
   notActivePointTitle?: string;
   beforeSelectCb?: () => void;
   afterSelectCb?: () => void;
}
