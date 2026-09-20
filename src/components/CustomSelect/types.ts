import { HTMLAttributes } from 'react';

import { CustomSelectOption } from '@typesfolder/types';

export interface CustomSelectProps {
   list: CustomSelectOption[];
   defaultPointNumber?: number;
   notActivePointTitle?: string;
   beforeSelectCb?: () => void;
   afterSelectCb?: () => void;
}

export interface OptionProps extends HTMLAttributes<HTMLButtonElement> {
   point: CustomSelectOption;
   listId: string;
   ariaSelected: boolean;
}
