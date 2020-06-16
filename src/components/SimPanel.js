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
        <div>Панель симуляции</div>
        <RowContainer>
          <ButtonStyled
            style={{ pointerEvents: isFiring ? "none" : null }}
            onClick={() => {
              //присваиваем текущему состоянию начальное и сбрасываем последовательность
              handleSubmitStateToCurrent(initialState);
              handleSubmitStateToSequence(initialState);
            }}
          >
            ⏮
          </ButtonStyled>
          <ButtonStyled
            style={{ pointerEvents: isFiring ? "none" : null }}
            ref={this.fireRef}
            onClick={() => {
              handleFireTransitionOnSequence(sequence);
            }}
          >
            ⏯
          </ButtonStyled>
          <ButtonStyled
            onClick={() => {
              this.autoFire();
            }}
          >
            {isFiring ? "⏸" : "▶️"}
          </ButtonStyled>
        </RowContainer>
      </SimPanelStyled>
    );
  }
}

const SimPanelStyled = styled.div`
  color: #6fb3d2;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  height: 70px;
  width: 160px;
  padding: 0px 5px 8px 5px;
  background: #2a2f3a;
  border-radius: 12px;
  margin: 0 0 0 5px;
  user-select: none;
`;

const ButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: 30px;
  background-color: #4f5a65;
  cursor: pointer;
  width: 50px;
  height: 50px;
  &:hover {
    background-color: #5f6c79;
  }
  &:active {
    background-color: #6fb3d2;
  }
  border: 1px solid black;
  user-select: none;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SimPanel);
