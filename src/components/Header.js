import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import logo from "./img/logo.png";
import {
  getIsEditorToggled,
  getIsSimToggled,
  getIsStatsToggled,
  getInitialState,
} from "../redux/selectors";
import {
  toggleEditor,
  toggleSim,
  toggleStats,
  submitStateToTemporary,
} from "../redux/actions";

const mapStateToProps = (state) => ({
  isEditorToggled: getIsEditorToggled(state),
  isSimToggled: getIsSimToggled(state),
  isStatsToggled: getIsStatsToggled(state),
  initialState: getInitialState(state),
});

const mapDispatchToProps = {
  handleToggleEditor: toggleEditor,
  handleToggleSim: toggleSim,
  handleToggleStats: toggleStats,
  handleSubmitStateToTemporary: submitStateToTemporary,
};

class Header extends React.Component {
  render() {
    const {
      initialState,
      isEditorToggled,
      isSimToggled,
      isStatsToggled,
      handleToggleEditor,
      handleToggleSim,
      handleToggleStats,
      handleSubmitStateToTemporary,
    } = this.props;
    return (
      <HeaderStyled>
        <LogoStyled></LogoStyled>
        <ButtonStyled
          style={
            isEditorToggled
              ? { background: "#6fb3d2" }
              : { background: "#4f5a65" }
          }
          onClick={() => {
            handleSubmitStateToTemporary(initialState);
            handleToggleEditor();
          }}
        >
          Редактор
        </ButtonStyled>
        <ButtonStyled
          style={
            isSimToggled ? { background: "#6fb3d2" } : { background: "#4f5a65" }
          }
          onClick={() => {
            handleToggleSim();
          }}
        >
          Панель {"\n"}симуляции{" "}
        </ButtonStyled>
        <ButtonStyled
          style={
            isStatsToggled
              ? { background: "#6fb3d2" }
              : { background: "#4f5a65" }
          }
          onClick={() => {
            handleToggleStats();
          }}
        >
          Статистика
        </ButtonStyled>
      </HeaderStyled>
    );
  }
}

const HeaderStyled = styled.div`
  height: 60px;
  background: #2a2f3a;
  display: flex;
  flex-direction: row;
`;
const LogoStyled = styled.div`
  background: url(${logo}) no-repeat;
  background-size: cover;
  width: 360px;
`;
const ButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  color: white;
  user-select: none;
  padding: 0 10px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
