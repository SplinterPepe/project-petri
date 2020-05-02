import React from "react";
import GraphComponent from "./Graph.js";
import styled from "styled-components";

function App() {
  return (
    <AppStyled>
      <GraphComponent />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export default App;
