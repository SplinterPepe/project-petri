import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fireTransition,
  submitStateToCurrent,
  toggleIsFiring
} from "../redux/actions";
import PropTypes from "prop-types";
import { getInitialState, getSequence } from "../redux/selectors";

const mapStateToProps = state => ({
  initialState: getInitialState(state),
  sequence: getSequence(state)
});

const mapDispatchToProps = {
  handleFireTransition: fireTransition,
  handleSubmitStateToCurrent: submitStateToCurrent,
  handleToggleIsFiring: toggleIsFiring
};

class SimComponent extends React.Component {
  static propTypes = {
    initialState: PropTypes.object,
    sequence: PropTypes.object,
    handleFireTransition: PropTypes.func.isRequired,
    handleSubmitStateToCurrent: PropTypes.func.isRequired,
    handleToggleIsFiring: PropTypes.func.isRequired
  };

  render() {
    const {
      initialState,
      sequence,
      handleFireTransition,
      handleSubmitStateToCurrent,
      handleToggleIsFiring
    } = this.props;

    return (
      <SimComponentStyled>
        <ButtonStyled
          onClick={() => {
            handleFireTransition(sequence);
          }}
        >
          fire one
        </ButtonStyled>
        <ButtonStyled
          onClick={() => {
            handleSubmitStateToCurrent(initialState);
          }}
        >
          reset
        </ButtonStyled>
        <ButtonStyled
          onClick={() => {
            handleToggleIsFiring();
          }}
        >
          FIRE
        </ButtonStyled>
      </SimComponentStyled>
    );
  }
}

const SimComponentStyled = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  font-weight: 1000;
  display: flex;
  flex-direction: row;
`;
const ButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  background-color: #42474e;
  cursor: pointer;
  padding: 0 5px;
  min-width: 50px;
  min-height: 70px;
  &:hover {
    background-color: #f91;
  }
  &:active {
    background-color: #fac480;
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(SimComponent);
