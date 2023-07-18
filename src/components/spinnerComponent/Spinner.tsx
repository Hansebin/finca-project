import React from "react";
import styled from "styled-components";
import { FadeLoader } from "react-spinners";

const SpinnerContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #e3defe;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  z-index: 9999;
`;

const Spinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <FadeLoader color="#7966E4" />
    </SpinnerContainer>
  );
};

export default Spinner;
