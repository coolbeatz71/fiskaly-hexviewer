import React, { FC, ReactElement, useState, MouseEvent } from "react";
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

  const onClickElement = (
    index: number,
    offset: number,
    event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => {
    setSelectedElement({ index, offset, value: event.currentTarget.innerText });
  };

  for (let offset = 0; offset < data.length; offset += BYTES_PER_ROW) {
    const chunks = [...data.slice(offset, offset + BYTES_PER_ROW)];

    const bytes = chunks.map((byte, i) => {
      const isSelected =
        selectedElement.index === i && selectedElement.offset === offset
          ? styles.viewer__selected
          : "";

      return (
        <span
          key={offset + i}
          onClick={(e) => onClickElement(i, offset, e)}
          className={`${styles.viewer__byteUnit} ${isSelected}`}
        >
          {convertToHEX(byte, 2)}
        </span>
      );
    });

    const OffsetSection = (
      <span className={styles.viewer__offsetLine}>
        {convertToHEX(offset, 8)}
      </span>
    );

    const BytesSection = (
      <div className={styles.viewer__byteLine}>
        {bytes.slice(0, 8)} {bytes.slice(8)}
      </div>
    );

    const AsciiSection = (
      <div className={styles.viewer__asciiLine}>
        {" "}
        {chunks.map((byte, i) => {
          const isSelected =
            selectedElement.index === i && selectedElement.offset === offset
              ? styles.selected
              : "";

          if (typeof byte === "string") {
            return (
              <span
                key={offset + i}
                className={isSelected}
                onClick={(e) => onClickElement(i, offset, e)}
              >
                {byte}
              </span>
            );
          }

          if (byte >= 0x20 && byte < 0x7f) {
            return (
              <span
                key={offset + i}
                className={isSelected}
                onClick={(e) => onClickElement(i, offset, e)}
              >
                {String.fromCharCode(byte)}
              </span>
            );
          }

          return (
            <span
              key={offset + i}
              className={isSelected}
              onClick={(e) => onClickElement(i, offset, e)}
            >
              .
            </span>
          );
        })}{" "}
      </div>
    );

    rows.push(
      <div key={offset} className={styles.viewer__viewerLine}>
        {OffsetSection} {BytesSection} {AsciiSection}
      </div>
    );
  }

  return (
    <pre
      style={{
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}
    >
      <span style={{ width: "100%" }}>Here comes the HexViewer</span>
      <div className={styles.viewerBody}>{rows}</div>
    </pre>
  );
};

export default HexViewer;
