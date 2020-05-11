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
  submitTemporaryState,
  setTemporaryStateToCurrent
} from "../redux/actions";
import { JsonTree } from "react-editable-json-tree";

const mapStateToProps = state => ({
  isEditMenuToggled: getIsEditMenuToggled(state),
  graphData: getCurrentState(state),
  temporaryState: getTemporaryState(state)
});

const mapDispatchToProps = {
  handleEditMenuToggle: toggleEditMenu,
  handleSubmitTemporaryState: submitTemporaryState,
  handleSetTemporaryStateToCurrent: setTemporaryStateToCurrent
};

class ControlPanel extends React.Component {
  static propTypes = {
    isEditMenuToggled: PropTypes.bool,
    graphData: PropTypes.object,
    handleEditMenuToggle: PropTypes.func.isRequired,
    handleSubmitTemporaryState: PropTypes.func.isRequired,
    handleSetTemporaryStateToCurrent: PropTypes.func.isRequired
  };

  static defaultProps = {
    isEditMenuToggled: false,
    graphData: { nodes: [], links: [] }
  };

  render() {
    const {
      isEditMenuToggled,
      handleEditMenuToggle,
      graphData,
      temporaryState,
      handleSubmitTemporaryState,
      handleSetTemporaryStateToCurrent
    } = this.props;

    return (
      <ControlPanelStyled>
        <LogoStyled>Сети Петри</LogoStyled>
        <ButtonStyled
          onClick={() => {
            handleEditMenuToggle();
            handleSubmitTemporaryState(graphData);
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
                  console.log(graphData);
                  handleSubmitTemporaryState(
                    JSON.parse(JSON.stringify(newJson, null, 4))
                  );
                }}
              />
            </JsonDataContainerStyled>

            <ButtonStyled
              onClick={() => {
                handleSetTemporaryStateToCurrent(temporaryState);
              }}
            >
              Редактор
            </ButtonStyled>
          </div>
        ) : (
          <ButtonStyled>2</ButtonStyled>
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

const JsonDataContainerStyled = styled.div`
  background-color: white;
  font-size: 14px;
  font-weight: 700;
  height: 300px;
  overflow: scroll;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
