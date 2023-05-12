import React from "react";
import ReactDOM from "react-dom";
import GGEditor, { Flow, EditableLabel } from "gg-editor";

import "../css/styles.css";

const data = {
  nodes: [
    {
      id: "0",
      label: "Node",
      x: 55,
      y: 55
    },
    {
      id: "1",
      label: "Node",
      x: 55,
      y: 255
    }
  ],
  edges: [
    {
      label: "Label",
      source: "0",
      target: "1"
    }
  ]
};

function App() {
  return (
    <GGEditor className="editor">
      <Flow
        className="editorBd"
        data={data}
        graphConfig={{
          defaultNode: {
            shape: "bizFlowNode"
          },
          defaultEdge: {
            shape: "bizFlowEdge"
          }
        }}
      />
      <EditableLabel />
    </GGEditor>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));