import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fireTransition, submitStateToCurrent } from "../redux/actions";
import propTypes from "prop-types";
import { getInitialState, getSequence } from "../redux/selectors";

const mapStateToProps = state => ({
  initialState: getInitialState(state),
  sequence: getSequence(state)
});

const mapDispatchToProps = {
  handleFireTransition: fireTransition,
  handleSubmitStateToCurrent: submitStateToCurrent
};

class SimPanel extends React.Component {
  static propTypes = {
    initialState: propTypes.object,
    sequence: propTypes.object,
    handleFireTransition: propTypes.func.isRequired,
    handleSubmitStateToCurrent: propTypes.func.isRequired
  };

  render() {
    const {
      initialState,
      sequence,
      handleFireTransition,
      handleSubmitStateToCurrent
    } = this.props;

    return (
      <SimPanelStyled>
        <ButtonStyled
          onClick={() => {
            handleSubmitStateToCurrent(initialState);
          }}
        >
          ◄◄
        </ButtonStyled>
        <ButtonStyled
          onClick={() => {
            handleFireTransition(sequence);
          }}
        >
          {" ►▏"}
        </ButtonStyled>
      </SimPanelStyled>
    );
  }
}

const SimPanelStyled = styled.div`
  margin-bottom: 5px;
  width: auto;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
`;
const ButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  text-align: center;
  font-size: 150%;
  font-size: 60px;
  background-color: #4f5a65;
  cursor: pointer;
  padding: 0 5px;
  width: 100px;
  height: auto;
  &:hover {
    background-color: #5f6c79;
  }
  &:active {
    background-color: #6fb3d2;
  }
  border: 1px solid black;
`;
export default connect(mapStateToProps, mapDispatchToProps)(SimPanel);
