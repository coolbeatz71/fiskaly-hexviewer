import { FC } from "react";
import { ISelectedElement } from "../../../interfaces";
import { AsciiCell } from "../../common/AsciiCell";

import styles from "./../index.module.scss";

interface IAsciiSectionProps {
  offset: number;
  chunks: Array<string | number>;
  selectedElement: ISelectedElement;
  setSelectedElement: (v: ISelectedElement) => void;
}

const AsciiSection: FC<IAsciiSectionProps> = ({
  chunks,
  selectedElement,
  setSelectedElement,
  offset,
}) => {
  return (
    <div className={styles.viewer__rows__asciiSection}>
      {chunks.map((byte, index) => {
        const isSelected =
          selectedElement.index === index && selectedElement.offset === offset
            ? styles.viewer__selected
            : "";

        return (
          <AsciiCell
            index={index}
            offset={offset}
            key={offset + index}
            selectedStyle={isSelected}
            setSelectedElement={setSelectedElement}
            bytes={
              typeof byte === "string"
                ? byte
                : byte >= 0x20 && byte < 0x7f
                ? String.fromCharCode(byte)
                : "."
            }
          />
        );
      })}
    </div>
  );
};

export default AsciiSection;
