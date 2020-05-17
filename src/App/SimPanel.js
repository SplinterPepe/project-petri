import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fireTransition } from "../redux/actions";
import PropTypes from "prop-types";

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  handleFireTransition: fireTransition
};

class SimComponent extends React.Component {
  static propTypes = {
    handleFireTransition: PropTypes.func.isRequired
  };

  render() {
    const { handleFireTransition } = this.props;

    return (
      <SimComponentStyled>
        <button
          onClick={() => {
            handleFireTransition();
          }}
        >
          Play
        </button>
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
