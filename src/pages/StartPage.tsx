import React from "react";
import styled from "styled-components";
import SideNav from "../components/basicComponents/SideNav";
import AccountMainArea from "../components/basicComponents/AccountMainArea";

const AccountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 48px;

  padding-top: calc((100vh - 750px) / 2);
`;

const StartPage: React.FC = () => {
  return (
    <AccountContainer>
      <SideNav />
      <AccountMainArea />
    </AccountContainer>
  );
};

export default StartPage;
