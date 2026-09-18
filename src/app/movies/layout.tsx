import styles from './layout.module.scss';
import { LayoutProps } from './types';

export default function SubRootLayout({ children, modal }: LayoutProps) {
   return (
      <div className={styles.content}>
         {children}
         {modal}
      </div>
   );
}
