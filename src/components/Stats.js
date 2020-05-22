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
        <div>
          Шагов сделано: <NumberStyled>{stats.steps}</NumberStyled>
        </div>
        <div>
          Переходов сработало:{" "}
          <NumberStyled>{stats.transitionsFired}</NumberStyled>
        </div>
        <div>
          Переходов не сработало:{" "}
          <NumberStyled>{stats.transitionsFirednt}</NumberStyled>
        </div>
      </StatsStyled>
    );
  }
}
const StatsStyled = styled.div`
  display: flex;
  flex-direction: column;
  color: #6fb3d2;
  margin: 5px;
  font-weight: 500;
`;

const NumberStyled = styled.span`
  color: #a1c659;
`;

export default connect(mapStateToProps)(Stats);
