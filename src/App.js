import React from "react";
import Board from "./Board";
import "./App.css";
import chanceLightStartsOn from "./utils";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <Board
        chanceLightStartsOn={chanceLightStartsOn}
        nrows={5}
        ncols={5}/>
      </div>
  );
}

export default App;
