import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getCurrentState } from "../redux/selectors";
import { Graph } from "../Graph/index";
import SimPanel from "./SimPanel";

const mapStateToProps = state => ({
  currentState: getCurrentState(state)
});

const myConfig = {
  directed: true,
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  width: 800,
  height: 600,
  node: {
    color: "darkgrey",
    size: 150,
    highlightStrokeColor: "#6FB3D2",
    highlightStrokeWidth: 2,
    fontWeight: 500,
    highlightFontWeight: 700,
    labelPosition: "top",
    renderLabel: true,
    fontSize: 7,
    highlightFontSize: 7
  },
  link: {
    color: "lightgrey",
    highlightColor: "#6FB3D2",
    strokeWidth: 1.4
  }
};

class GraphComponent extends React.Component {
  static propTypes = {
    currentState: propTypes.object.isRequired
  };

  render() {
    const { currentState } = this.props;
    return (
      <GraphBoxStyled>
        <SimPanel />
        <GraphAreaBoxStyled>
          <Graph id="graph-id" data={currentState} config={myConfig}></Graph>
        </GraphAreaBoxStyled>
      </GraphBoxStyled>
    );
  }
}

const GraphAreaBoxStyled = styled.div`
  background-color: white;
  cursor: pointer;
  width: 800px;
  height: 600px;
  border: 1px solid black;
`;

const GraphBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  cursor: pointer;
  width: auto;
  border: 1px solid black;
`;
export default connect(mapStateToProps)(GraphComponent);
