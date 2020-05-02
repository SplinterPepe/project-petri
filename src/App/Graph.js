import React from "react";
import styled from "styled-components";
import { Graph } from "../Graph/index";

const data = {
  nodes: [
    { id: "P1", marks: "3" },
    { id: "T1", symbolType: "square" },
    { id: "P2", marks: "3" },
    { id: "P3", marks: "3" },
    { id: "P4", marks: "3" }
  ],
  links: [
    { source: "P1", target: "T1" },
    { source: "T1", target: "P2" },
    { source: "P3", target: "T1" },
    { source: "T1", target: "P4" }
  ]
};

const myConfig = {
  directed: true,
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  height: 720,
  width: 1280,
  node: {
    color: "#748700",
    size: 150,
    highlightStrokeColor: "#A7E541",
    labelPosition: "top",
    marksPosition: "right",
    renderLabel: true,
    fontSize: 7
  },
  link: {
    highlightColor: "#A7E541"
  }
};

function GraphComponent() {
  return (
    <GraphBoxStyled>
      <Graph id="graph-id" data={data} config={myConfig}></Graph>
    </GraphBoxStyled>
  );
}

const GraphBoxStyled = styled.div`
  cursor: pointer;
  width: auto;
  height: auto;
  background-color: white;
`;

export default GraphComponent;
