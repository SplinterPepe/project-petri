import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getStats, getSequence } from "../redux/selectors";

const mapStateToProps = (state) => ({
  stats: getStats(state),
  sequence: getSequence(state),
});

class Stats extends React.Component {
  static propTypes = { stats: propTypes.object, sequence: propTypes.object };

  render() {
    const { stats, sequence } = this.props;

    return (
      <StatsStyled>
        <div>Статистика</div>
        <div>
          Следующий переход:{" "}
          <ValueStyled>{sequence.transitions[sequence.next].id}</ValueStyled>
        </div>
        <div>
          Шагов сделано: <ValueStyled>{stats.steps}</ValueStyled>
        </div>
        <div>
          Переходов сработало:{" "}
          <ValueStyled>{stats.transitionsFired}</ValueStyled>
        </div>
        <div>
          Переходов не сработало:{" "}
          <ValueStyled>{stats.transitionsFirednt}</ValueStyled>
        </div>
      </StatsStyled>
    );
  }
}
const StatsStyled = styled.div`
  display: flex;
  flex-direction: column;
  color: #6fb3d2;
  font-weight: 500;
  border-radius: 12px;
  margin: 0 0 0 5px;
  padding: 0px 5px 8px 5px;
  background: #2a2f3a;
  height: 300px;
  user-select: none;
`;

const ValueStyled = styled.span`
  color: #a1c659;
`;

export default connect(mapStateToProps)(Stats);
