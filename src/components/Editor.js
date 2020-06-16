import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import styled from "styled-components";
import NodeConfigurator from "./NodeConfigurator";
import { getTemporaryState } from "../redux/selectors";
import {
  submitStateToInitial,
  submitStateToTemporary,
  submitStateToCurrent,
  submitStateToSequence,
  addTransition,
  addPosition,
  addLink,
  createNewNet,
} from "../redux/actions";
import { JsonTree } from "react-editable-json-tree";

const mapStateToProps = (state) => ({
  temporaryState: getTemporaryState(state),
});

const mapDispatchToProps = {
  handleSubmitStateToInitial: submitStateToInitial,
  handleSubmitStateToSequence: submitStateToSequence,
  handleSubmitStateToTemporary: submitStateToTemporary,
  handleSubmitStateToCurrent: submitStateToCurrent,
  handleAddTransition: addTransition,
  handleAddPosition: addPosition,
  handleAddLink: addLink,
  handleCreateNewNet: createNewNet,
};

class Editor extends React.Component {
  static propTypes = {
    handleSubmitStateToInitial: propTypes.func.isRequired,
    handleSubmitStateToSequence: propTypes.func.isRequired,
    handleSubmitStateToTemporary: propTypes.func.isRequired,
    handleSubmitStateToCurrent: propTypes.func.isRequired,
    handleAddTransition: propTypes.func.isRequired,
    handleAddPosition: propTypes.func.isRequired,
    handleAddLink: propTypes.func.isRequired,
    handleCreateNewNet: propTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    const {
      temporaryState,
      handleSubmitStateToInitial,
      handleSubmitStateToTemporary,
      handleSubmitStateToSequence,
      handleSubmitStateToCurrent,
      handleAddTransition,
      handleAddPosition,
      handleAddLink,
      handleCreateNewNet,
    } = this.props;

    return (
      <EditorStyled>
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
        <ColumnContainer>
          <button
            onClick={() => {
              handleAddTransition();
            }}
          >
            Добавить переход
          </button>
          <button
            onClick={() => {
              handleAddPosition();
            }}
          >
            Добавить позицию
          </button>
          <button
            onClick={() => {
              handleAddLink();
            }}
          >
            Добавить дугу
          </button>

          <button
            onClick={() => {
              handleSubmitStateToCurrent(temporaryState);
              handleSubmitStateToInitial(temporaryState);
              handleSubmitStateToSequence(temporaryState);
            }}
          >
            Сохранить изменения
          </button>
          <button
            onClick={() => {
              handleCreateNewNet();
            }}
          >
            Создать новую сеть
          </button>
        </ColumnContainer>
        <NodeConfigurator></NodeConfigurator>
      </EditorStyled>
    );
  }
}

const EditorStyled = styled.div`
  width: 600px;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  margin: 5px;
  padding: 10px;
  background: #2a2f3a;
`;

const ColumnContainer = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  font-weight: 1000;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const JsonDataContainerStyled = styled.div`
  background-color: white;
  font-size: 14px;
  font-weight: 700;
  height: 600px;
  width: 350px;
  overflow: scroll;
  border: thick double black;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
