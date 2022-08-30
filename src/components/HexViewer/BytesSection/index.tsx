import { FC } from "react";

import styles from "./../index.module.scss";

const BytesSection: FC<{ bytes: JSX.Element[] }> = ({ bytes }) => (
  <div className={styles.viewer__rows__bytesSection}>
    {bytes.slice(0, 8)} {bytes.slice(8)}
  </div>
);

export default BytesSection;
