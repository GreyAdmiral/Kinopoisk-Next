import type { FC, PropsWithChildren } from 'react';
import { ContainerProps } from './types';

export const Container: FC<PropsWithChildren & ContainerProps> = ({ children, className }) => {
   return <div className={className ? `${className}_container` : 'container'}>{children}</div>;
};
