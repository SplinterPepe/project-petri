import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import styled from "styled-components";
import {
  getIsEditMenuToggled,
  getInitialState,
  getTemporaryState,
} from "../redux/selectors";
import {
  toggleEditMenu,
  submitStateToInitial,
  submitStateToTemporary,
  submitStateToCurrent,
  submitStateToSequence,
  addTransition,
  addPosition,
  addLink,
} from "../redux/actions";
import { JsonTree } from "react-editable-json-tree";
import Stats from "./Stats";

const mapStateToProps = (state) => ({
  isEditMenuToggled: getIsEditMenuToggled(state),
  initialState: getInitialState(state),
  temporaryState: getTemporaryState(state),
});

const mapDispatchToProps = {
  handleEditMenuToggle: toggleEditMenu,
  handleSubmitStateToInitial: submitStateToInitial,
  handleSubmitStateToSequence: submitStateToSequence,
  handleSubmitStateToTemporary: submitStateToTemporary,
  handleSubmitStateToCurrent: submitStateToCurrent,
  handleAddTransition: addTransition,
  handleAddPosition: addPosition,
  handleAddLink: addLink,
};

class ControlPanel extends React.Component {
  static propTypes = {
    isEditMenuToggled: propTypes.bool,
    initialState: propTypes.object,
    handleEditMenuToggle: propTypes.func.isRequired,
    handleSubmitStateToInitial: propTypes.func.isRequired,
    handleSubmitStateToSequence: propTypes.func.isRequired,
    handleSubmitStateToTemporary: propTypes.func.isRequired,
    handleSubmitStateToCurrent: propTypes.func.isRequired,
    handleAddTransition: propTypes.func.isRequired,
    handleAddPosition: propTypes.func.isRequired,
    handleAddLink: propTypes.func.isRequired,
  };

  static defaultProps = {
    isEditMenuToggled: false,
  };

  render() {
    const {
      isEditMenuToggled,
      handleEditMenuToggle,
      initialState,
      temporaryState,
      handleSubmitStateToInitial,
      handleSubmitStateToTemporary,
      handleSubmitStateToSequence,
      handleSubmitStateToCurrent,
      handleAddTransition,
      handleAddPosition,
      handleAddLink,
    } = this.props;

    return (
      <ControlPanelStyled>
        <LogoStyled>Сети Петри</LogoStyled>
        <ButtonStyled
          onClick={() => {
            handleEditMenuToggle();
            handleSubmitStateToTemporary(initialState);
          }}
        >
          Редактор
        </ButtonStyled>
        {isEditMenuToggled ? (
          <div>
            <JsonDataContainerStyled>
              <JsonTree
                data={temporaryState}
                rootName="Элементы графа"
                onFullyUpdate={(newJson) => {
                  handleSubmitStateToTemporary(
                    JSON.parse(JSON.stringify(newJson, null, 4))
                  );
                }}
              />
            </JsonDataContainerStyled>
            <ButtonStyled
              onClick={() => {
                handleAddTransition();
              }}
            >
              Добавить переход
            </ButtonStyled>
            <ButtonStyled
              onClick={() => {
                handleAddPosition();
              }}
            >
              Добавить позицию
            </ButtonStyled>
            <ButtonStyled
              onClick={() => {
                handleAddLink();
              }}
            >
              Добавить дугу
            </ButtonStyled>
            <RowContainer>
              <ButtonStyled
                onClick={() => {
                  handleSubmitStateToCurrent(temporaryState);
                  handleSubmitStateToInitial(temporaryState);
                  handleSubmitStateToSequence(temporaryState);
                  handleEditMenuToggle();
                }}
              >
                Принять
              </ButtonStyled>
              <ButtonStyled
                onClick={() => {
                  handleEditMenuToggle();
                }}
              >
                Отмена
              </ButtonStyled>
            </RowContainer>
          </div>
        ) : (
          <Stats />
        )}
      </ControlPanelStyled>
    );
  }
}

const ControlPanelStyled = styled.div`
  width: 30vh;
  background-color: #2a2f3a;
`;

const LogoStyled = styled.div`
  font-size: 30px;
  cursor: pointer;
  text-align: center;
  width: auto;
  background-size: contain;
  background-repeat: no-repeat;
  font-weight: 1000;
`;

const ButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  flex: 1;
  background-color: #4f5a65;
  cursor: pointer;
  padding: 0 5px;
  min-width: 50px;
  min-height: 70px;
  &:hover {
    background-color: #5f6c79;
  }
  &:active {
    background-color: #6fb3d2;
  }
  border: 1px solid black;
`;

const RowContainer = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  font-weight: 1000;
  display: flex;
  flex-direction: row;
`;

const JsonDataContainerStyled = styled.div`
  background-color: white;
  font-size: 14px;
  font-weight: 700;
  height: 300px;
  overflow: scroll;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
