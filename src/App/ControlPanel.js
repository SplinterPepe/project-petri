import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  getIsEditMenuToggled,
  getCurrentState,
  getTemporaryState
} from "../redux/selectors";
import {
  toggleEditMenu,
  submitStateToInitial,
  submitStateToTemporary,
  submitStateToCurrent
} from "../redux/actions";
import { JsonTree } from "react-editable-json-tree";
import SimPanel from "./SimPanel";

const mapStateToProps = state => ({
  isEditMenuToggled: getIsEditMenuToggled(state),
  currentState: getCurrentState(state),
  temporaryState: getTemporaryState(state)
});

const mapDispatchToProps = {
  handleEditMenuToggle: toggleEditMenu,
  handleSubmitStateToInitial: submitStateToInitial,
  handleSubmitStateToTemporary: submitStateToTemporary,
  handleSubmitStateToCurrent: submitStateToCurrent
};

class ControlPanel extends React.Component {
  static propTypes = {
    isEditMenuToggled: PropTypes.bool,
    currentState: PropTypes.object,
    handleEditMenuToggle: PropTypes.func.isRequired,
    handleSubmitStateToInitial: PropTypes.func.isRequired,
    handleSubmitStateToTemporary: PropTypes.func.isRequired,
    handleSubmitStateToCurrent: PropTypes.func.isRequired
  };

  static defaultProps = {
    isEditMenuToggled: false,
    currentState: { nodes: [], links: [] }
  };

  render() {
    const {
      isEditMenuToggled,
      handleEditMenuToggle,
      currentState,
      temporaryState,
      handleSubmitStateToInitial,
      handleSubmitStateToTemporary,
      handleSubmitStateToCurrent
    } = this.props;

    return (
      <ControlPanelStyled>
        <LogoStyled>Сети Петри</LogoStyled>
        <ButtonStyled
          onClick={() => {
            handleEditMenuToggle();
            handleSubmitStateToTemporary(currentState);
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
                onFullyUpdate={newJson => {
                  console.log(currentState);
                  handleSubmitStateToTemporary(
                    JSON.parse(JSON.stringify(newJson, null, 4))
                  );
                }}
              />
            </JsonDataContainerStyled>
            <RowContainer>
              <ButtonStyled
                onClick={() => {
                  handleSubmitStateToCurrent(temporaryState);
                  handleSubmitStateToInitial(temporaryState);
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
          <SimPanel />
        )}
      </ControlPanelStyled>
    );
  }
}

const ControlPanelStyled = styled.div`
  width: 40vh;
  background-color: #f9ad00;
`;

const LogoStyled = styled.div`
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
  background-color: #f9ad00;
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
