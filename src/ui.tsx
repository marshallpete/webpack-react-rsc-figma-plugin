import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import { Bar, Chart } from "@adobe/react-spectrum-charts";

declare function require(path: string): any;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onCreate = () => {
    const count = Number(inputRef.current?.value || 0);
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count } },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
      {/* <header>
        <img src={require("./logo.svg")} />
        <h2>Rectangle Creator</h2>
      </header>
      <section>
        <input id="input" type="number" min="0" ref={inputRef} />
        <label htmlFor="input">Rectangle Count</label>
      </section>
      <footer>
        <button className="brand" onClick={onCreate}>
          Create!
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer> */}
      <Chart
        data={[
          { x: 0, y: 2 },
          { x: 1, y: 4 },
        ]}
        width={200}
        height={200}
      >
        <Bar dimension="x" metric="y" />
      </Chart>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
