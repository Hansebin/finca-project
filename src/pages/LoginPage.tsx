import React from "react";
import styled from "styled-components";
import SideNav from "../components/basicComponents/SideNav";

const AccountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 48px;

  padding-top: calc((100vh - 750px) / 2);
`;

const LoginPage: React.FC = () => {
  return (
    <>
      <AccountContainer>
        <SideNav />
        <p>LoginPage</p>
      </AccountContainer>
    </>
  );
};

export default LoginPage;
