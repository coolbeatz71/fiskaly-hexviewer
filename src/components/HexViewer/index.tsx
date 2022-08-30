import React, { FC, ReactElement, useState, MouseEvent } from "react";
import { useMedia } from "react-use";
import {
  BYTES_PER_ROW_MD,
  BYTES_PER_ROW_LG,
  BYTES_PER_ROW_SM,
  BYTES_PER_ROW_XS,
} from "../../constants/app";
import { ISelectedElement } from "../../interfaces";
import convertToHEX from "../../lib/convertToHEX";
import copyToClipboard from "../../lib/copyToClipBoard";
import AsciiSection from "./AsciiSection";
import BytesSection from "./BytesSection";
import OffsetSection from "./OffsetSection";

import styles from "./index.module.scss";

export interface IHexViewerProps {
  data: string | Uint8Array;
}

const HexViewer: FC<IHexViewerProps> = ({ data }) => {
  const isXS = useMedia("(max-width: 567px)");
  const isSM = useMedia("(min-width: 567px) AND (max-width: 768px)");
  const isMD = useMedia("(min-width: 768px) AND (max-width: 992px)");

  const BYTES_PER_ROW = isXS
    ? BYTES_PER_ROW_XS
    : isSM
    ? BYTES_PER_ROW_SM
    : isMD
    ? BYTES_PER_ROW_MD
    : BYTES_PER_ROW_LG;

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

    rows.push(
      <div key={offset} className={styles.viewer__viewerLine}>
        <OffsetSection offset={offset} /> <BytesSection bytes={bytes} />
        <AsciiSection
          offset={offset}
          chunks={chunks}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
      </div>
    );
  }

  return (
    <pre
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}
    >
      <span style={{ width: "100%", textAlign: "center" }}>
        Here comes the HexViewer
      </span>
      <div className={styles.viewer}>{rows}</div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
            marginRight: "20px",
          }}
        >
          <span>Copy selected to clipboard</span>
          <button
            style={{
              width: "100px",
              marginTop: "10px",
              padding: "10px",
            }}
            onClick={() => {
              const value = selectedElement.value.toString();
              copyToClipboard(value).then(() => {
                alert(`Value copied: ${value}`);
              });
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </pre>
  );
};

export default HexViewer;
