import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import propTypes from "prop-types";

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

class SimComponent extends React.Component {
  render() {
    return (
      <SimComponentStyled>
        <button>Play</button>
      </SimComponentStyled>
    );
  }
}

const SimComponentStyled = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  font-weight: 1000;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SimComponent);
