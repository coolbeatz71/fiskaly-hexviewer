import React, { FC, ReactElement, useState } from "react";

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
