import { FC } from "react";
import { ISelectedElement } from "../../../interfaces";

interface IAsciiCellProps {
  index: number;
  offset: number;
  children: string;
  selectedStyle: string;
  setSelectedElement: (v: ISelectedElement) => void;
}

export const AsciiCell: FC<IAsciiCellProps> = ({
  index,
  offset,
  children,
  selectedStyle,
  setSelectedElement,
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
    {children}
  </span>
);
