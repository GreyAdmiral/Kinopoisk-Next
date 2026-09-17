import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import styles from './DialogNotification.module.scss';
import type { CustomNotificationProps } from './types';

export const DialogNotification: FC<CustomNotificationProps> = ({ isOpenNotification, children }) => {
   const notificationRef = useRef<HTMLDialogElement>(null);

   useEffect(() => {
      if (isOpenNotification) {
         notificationRef.current?.show();
      } else {
         notificationRef.current?.close();
      }
   }, [isOpenNotification]);

   return (
      <dialog className={styles.notification} ref={notificationRef}>
         <div className={styles.notification_body}>{children}</div>
      </dialog>
   );
};
