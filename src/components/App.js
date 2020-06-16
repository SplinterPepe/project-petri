import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import GraphComponent from "./GraphComponent.js";
import Editor from "./Editor";
import SimPanel from "./SimPanel";
import Stats from "./Stats";
import Header from "./Header";
import {
  getIsEditorToggled,
  getIsSimToggled,
  getIsStatsToggled,
} from "../redux/selectors";

const mapStateToProps = (state) => ({
  isEditorToggled: getIsEditorToggled(state),
  isSimToggled: getIsSimToggled(state),
  isStatsToggled: getIsStatsToggled(state),
});

class App extends React.Component {
  render() {
    const { isEditorToggled, isSimToggled, isStatsToggled } = this.props;

    return (
      <AppStyled>
        <Header />
        <AppContentStyled>
          <GraphComponent />
          {isSimToggled ? <SimPanel /> : null}
          {isStatsToggled ? <Stats /> : null}
          {isEditorToggled ? <Editor /> : null}
        </AppContentStyled>
      </AppStyled>
    );
  }
}

const AppStyled = styled.div`
  background-color: #434a5b;
  min-height: 100vh;
`;

const AppContentStyled = styled.div`
  display: flex;
  color: white;
  flex-wrap: wrap;
`;

export default connect(mapStateToProps)(App);
