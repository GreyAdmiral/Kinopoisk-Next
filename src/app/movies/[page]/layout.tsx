import type { PropsWithChildren } from 'react';
import styles from './layout.module.scss';

export default function RootLayout({ children }: PropsWithChildren) {
   return <div className={styles.content}>{children}</div>;
}
