import React from "react";
import styled from "styled-components";
import SideNav from "../components/basicComponents/SideNav";
import LoginMainArea from "../components/basicComponents/LoginMainArea";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 48px;

  padding-top: calc((100vh - 750px) / 2);

  @media screen and (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    padding-top: 25px;
    padding-bottom: 25px;
  }
`;

const LoginPage: React.FC = () => {
  return (
    <>
      <Container>
        <SideNav />
        <LoginMainArea />
      </Container>
    </>
  );
};

export default LoginPage;
