import { FC } from "react";
import { ISelectedElement } from "../../../interfaces";

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

        if (typeof byte === "string") {
          return (
            <span
              key={offset + index}
              className={isSelected}
              onClick={(e) =>
                setSelectedElement({
                  index,
                  offset,
                  value: e.currentTarget.innerText,
                })
              }
            >
              {byte}
            </span>
          );
        }

        if (byte >= 0x20 && byte < 0x7f) {
          return (
            <span
              key={offset + index}
              className={isSelected}
              onClick={(e) =>
                setSelectedElement({
                  index,
                  offset,
                  value: e.currentTarget.innerText,
                })
              }
            >
              {String.fromCharCode(byte)}
            </span>
          );
        }

        return (
          <span
            key={offset + index}
            className={isSelected}
            onClick={(e) =>
              setSelectedElement({
                index,
                offset,
                value: e.currentTarget.innerText,
              })
            }
          >
            .
          </span>
        );
      })}
    </div>
  );
};

export default AsciiSection;
