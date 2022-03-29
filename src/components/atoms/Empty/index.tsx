import { EmptyIcon } from "@/icons";

import styles from "./index.module.scss";

export function Empty() {
  return (
    <div className={styles.wrapper}>
      <EmptyIcon />
      <p className={styles.description}>No Data</p>
    </div>
  );
}
