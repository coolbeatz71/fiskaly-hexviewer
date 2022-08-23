import React, { FC, ReactElement, useState } from "react";
import { BYTES_PER_ROW } from "../../constants/app";
import convertToHEX from "../../lib/convertToHEX";

import styles from "./index.module.scss";

interface IHexViewerProps {
  data: string | Uint8Array;
}

interface ISelectedElement {
  index: number | null;
  offset: number | null;
  value: number | string;
}

const HexViewer: FC<IHexViewerProps> = ({ data }) => {
  const rows: ReactElement[] = [];
  const [selectedElement, setSelectedElement] = useState<ISelectedElement>({
    index: null,
    offset: null,
    value: "",
  });

  for (let offset = 0; offset < data.length; offset += BYTES_PER_ROW) {
    const chunks = [...data.slice(offset, offset + BYTES_PER_ROW)];

    const bytes = chunks.map((byte, i) => {
      const isSelected =
        selectedElement.index === i && selectedElement.offset === offset
          ? styles.selected
          : "";
      return (
        <span className={`${styles.byteUnit} ${isSelected}`} key={offset + i}>
          {convertToHEX(byte, 2)}
        </span>
      );
    });
  }

  return (
    <pre
      style={{
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}
    >
      {" "}
    </pre>
  );
};

export default HexViewer;
