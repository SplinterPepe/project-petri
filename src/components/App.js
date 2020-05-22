import React from "react";
import styled from "styled-components";
import GraphComponent from "./GraphComponent.js";
import ControlPanel from "./ControlPanel";
import DevTools from "./DevTools";

function App() {
  return (
    <AppStyled>
      <ControlPanel />
      <GraphComponent />
      <DevTools />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #434a5b;
  min-height: 100vh;
  color: white;
`;

export default App;
