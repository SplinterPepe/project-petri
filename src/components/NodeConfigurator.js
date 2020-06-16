import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getFocusedNode, getInitialState } from "../redux/selectors";

const mapStateToProps = (state) => ({
  focusedNode: getFocusedNode(state),
  initialState: getInitialState(state),
});

const mapDispatchToProps = {};

class NodeConfigurator extends React.Component {
  static propTypes = {
    focusedNode: propTypes.string,
    initialState: propTypes.object,
    isNodeConfigToggled: propTypes.bool,
  };

  marksRef = React.createRef();

  render() {
    const { focusedNode, initialState } = this.props;
    return (
      <NodeConfiguratorStyled>
        {focusedNode !== ""
          ? initialState.nodes
              .filter((node) => node.id === focusedNode)
              .map((node) => {
                return (
                  <div>
                    <div>Свойства вершины</div>
                    <div>
                      ID: <ValueStyled>{node.id}</ValueStyled>
                    </div>
                    <div>
                      Тип вершины: <ValueStyled>{node.nodeType}</ValueStyled>
                    </div>
                    {node.nodeType === "place" ? (
                      <div>
                        <div>
                          Метки: <ValueStyled>{node.marks}</ValueStyled>
                        </div>
                      </div>
                    ) : (
                      <div>{null}</div>
                    )}
                  </div>
                );
              })
          : null}
      </NodeConfiguratorStyled>
    );
  }
}

const NodeConfiguratorStyled = styled.div`
  color: #6fb3d2;
  font-weight: 500;
  background: #2a2f3a;
  border-radius: 12px;
  margin: 5px;
  height: 400px;
  width: 300px;
`;

const ValueStyled = styled.span`
  color: #a1c659;
`;

export default connect(mapStateToProps, mapDispatchToProps)(NodeConfigurator);
