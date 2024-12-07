import type { PropsWithChildren } from 'react';

export interface PaginationButtonProps extends PropsWithChildren {
   page: string;
   queryParams?: string;
   className?: string;
}
