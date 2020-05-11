import React from "react";
import styled from "styled-components";
import GraphComponent from "./Graph.js";
import ControlPanel from "./ControlPanel";

function App() {
  return (
    <AppStyled>
      <ControlPanel />
      <GraphComponent />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #282c34;
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export default App;
