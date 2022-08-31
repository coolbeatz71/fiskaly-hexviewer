import { FC } from "react";
import { ISelectedElement } from "../../../interfaces";

interface IAsciiCellProps {
  index: number;
  offset: number;
  selectedStyle: string;
  setSelectedElement: (v: ISelectedElement) => void;
  bytes: string | number;
}

export const AsciiCell: FC<IAsciiCellProps> = ({
  index,
  offset,
  selectedStyle,
  setSelectedElement,
  bytes,
}) => (
  <span
    className={selectedStyle}
    onClick={(e) =>
      setSelectedElement({
        index: index,
        offset: offset,
        value: e.currentTarget.innerText,
      })
    }
  >
    {bytes}
  </span>
);
