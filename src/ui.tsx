import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { ChartControls } from "./ui/chartControls";

function App() {
  return (
    <Provider theme={defaultTheme} scale="medium" id="provider">
      <div id="content">
        <ChartControls />
      </div>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
