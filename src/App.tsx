import React from "react";
import readFile from "./lib/readFile";
import HexViewer from "./components/HexViewer";

import "./styles/global.scss";

function App() {
  const [file, setFile] = React.useState<null | string | Uint8Array>(null);
  const updateFileState = async (e: React.FormEvent<HTMLInputElement>) => {
    const result = await readFile(e);
    setFile(result);
  };

  const renderComponents = () => {
    if (!file) {
      return (
        <div className="app__input">
          <input
            name="file"
            type="file"
            role="button"
            className="input-file"
            onInput={updateFileState}
          />
          <label htmlFor="file">Choose a file</label>
        </div>
      );
    }

    const isBinary = typeof file !== "string";
    return (
      <>
        <div className="app__header">
          <span className="app__header__title">
            Loaded {isBinary ? "binary" : "text"} file
          </span>{" "}
          <button className="app__header__button" onClick={() => setFile(null)}>
            Reset
          </button>
        </div>
        <HexViewer data={file} />
      </>
    );
  };

  return <div className="app">{renderComponents()}</div>;
}

export default App;
