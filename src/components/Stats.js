import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getStats } from "../redux/selectors";

const mapStateToProps = state => ({ stats: getStats(state) });

class Stats extends React.Component {
  static propTypes = { stats: propTypes.object };

  render() {
    const { stats } = this.props;

    return (
      <StatsStyled>
        <div>Шагов сделано: {stats.steps}</div>
        <div>Переходов сработало: {stats.transitionsFired}</div>
        <div>Переходов не сработало: {stats.transitionsFirednt}</div>
      </StatsStyled>
    );
  }
}
const StatsStyled = styled.div`
  display: flex;
  flex-direction: column;
  color: #6fb3d2;
  margin: 5px;
`;

export default connect(mapStateToProps)(Stats);
