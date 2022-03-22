import { SideBar } from "@/components/organisms";
import { ReactNode } from "react";

import styles from "./index.module.scss";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <SideBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
