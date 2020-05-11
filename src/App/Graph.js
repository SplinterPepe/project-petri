import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getCurrentState } from "../redux/selectors";
import { Graph } from "../Graph/index";

const mapStateToProps = state => ({
  graphData: getCurrentState(state)
});

const myConfig = {
  directed: true,
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  height: 720,
  width: 720,
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

class GraphComponent extends React.Component {
  static propTypes = {
    graphData: propTypes.object.isRequired
  };

  render() {
    const { graphData } = this.props;
    return (
      <GraphBoxStyled>
        <Graph id="graph-id" data={graphData} config={myConfig}></Graph>
      </GraphBoxStyled>
    );
  }
}

const GraphBoxStyled = styled.div`
  cursor: pointer;
  width: auto;
  height: auto;
  background-color: white;
`;

export default connect(mapStateToProps)(GraphComponent);
