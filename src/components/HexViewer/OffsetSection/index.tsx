import { FC } from "react";
import convertToHEX from "./../../../lib/convertToHEX";

import styles from "./../index.module.scss";

const OffsetSection: FC<{ offset: number }> = ({ offset }) => {
  return (
    <span className={styles.viewer__offsetLine}>{convertToHEX(offset, 8)}</span>
  );
};

export default OffsetSection;
