import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import propTypes from "prop-types";
import { getCurrentState } from "../redux/selectors";
import { selectNode } from "../redux/actions";
import { Graph } from "./Graph/index";

const mapStateToProps = (state) => ({
  currentState: getCurrentState(state),
});

const mapDispatchToProps = {
  handleSelectNode: selectNode,
};

const myConfig = {
  directed: true,
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  width: 1024,
  height: 650,
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
    highlightFontSize: 7,
  },
  link: {
    color: "lightgrey",
    highlightColor: "#6FB3D2",
    strokeWidth: 1.4,
    type: "CURVE_SMOOTH",
  },
};

class GraphComponent extends React.Component {
  static propTypes = {
    currentState: propTypes.object.isRequired,
  };

  render() {
    const { currentState, handleSelectNode } = this.props;
    return (
      <GraphBoxStyled>
        <Graph
          id="graph-id"
          data={currentState}
          config={myConfig}
          onClickNode={(id) => {
            handleSelectNode(id);
          }}
        ></Graph>
      </GraphBoxStyled>
    );
  }
}

const GraphBoxStyled = styled.div`
  background-color: white;
  cursor: pointer;
  width: 1024px;
  height: 650px;
  border-radius: 12px;
  margin: 5px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(GraphComponent);
