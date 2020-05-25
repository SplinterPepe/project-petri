import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fireTransitionOnSequence,
  submitStateToCurrent,
  submitStateToSequence,
  toggleIsFiring,
} from "../redux/actions";
import propTypes from "prop-types";
import { getInitialState, getSequence, getIsFiring } from "../redux/selectors";

const mapStateToProps = (state) => ({
  initialState: getInitialState(state),
  sequence: getSequence(state),
  isFiring: getIsFiring(state),
});

const mapDispatchToProps = {
  handleFireTransitionOnSequence: fireTransitionOnSequence,
  handleSubmitStateToCurrent: submitStateToCurrent,
  handleSubmitStateToSequence: submitStateToSequence,
  handleToggleIsFiring: toggleIsFiring,
};

class SimPanel extends React.Component {
  static propTypes = {
    initialState: propTypes.object,
    sequence: propTypes.object,
    isFiring: propTypes.bool,
    handleFireTransitionOnSequence: propTypes.func.isRequired,
    handleSubmitStateToCurrent: propTypes.func.isRequired,
    handleSubmitStateToSequence: propTypes.func.isRequired,
    handleToggleIsFiring: propTypes.func.isRequired,
  };

  fireRef = React.createRef();

  state = {
    interval: null,
  };

  autoFire() {
    const { handleToggleIsFiring } = this.props;
    const { interval } = this.state;

    handleToggleIsFiring();

    if (interval) {
      clearInterval(interval);
      this.setState({
        interval: null,
      });
    } else {
      const newInterval = setInterval(() => {
        this.fireRef.current.click();
      }, 1000);
      this.setState({ interval: newInterval });
    }
  }

  render() {
    const {
      initialState,
      sequence,
      isFiring,
      handleFireTransitionOnSequence,
      handleSubmitStateToCurrent,
      handleSubmitStateToSequence,
    } = this.props;

    return (
      <SimPanelStyled>
        <ButtonStyled
          onClick={() => {
            handleSubmitStateToCurrent(initialState);
            handleSubmitStateToSequence(initialState);
          }}
        >
          ◄◄
        </ButtonStyled>
        <ButtonStyled
          ref={this.fireRef}
          onClick={() => {
            handleFireTransitionOnSequence(sequence);
          }}
        >
          {" ►▏"}
        </ButtonStyled>
        <ButtonStyled
          onClick={() => {
            this.autoFire();
          }}
        >
          {isFiring ? " stop" : " auto"}
        </ButtonStyled>
      </SimPanelStyled>
    );
  }
}
// handleToggleIsFiring();
//             setInterval(() => {
//               if (isFiring === true) this.fireRef.current.click(), 1000;
//             });
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
  text-align: center;
  font-size: 30px;
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
