import type { FC } from 'react';
import { memo } from 'react';

import { BackLink } from '@components/BackLink/BackLink';
import { ReloadButton } from '@components/ReloadButton/ReloadButton';

import styles from './ErrorComponent.module.scss';
import type { ErrorComponentProps } from './types';

export const ErrorComponent: FC<ErrorComponentProps> = memo(function ErrorComponent({ message }) {
   const title = message || 'Произошла ошибка!';

   return (
      <div className={styles.error}>
         <h2 className={styles.error_message}>{title}</h2>

         <div className={styles.error_buttons}>
            <ReloadButton />
            <BackLink />
         </div>
      </div>
   );
});
