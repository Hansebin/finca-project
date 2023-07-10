import React from "react";
import styled from "styled-components";
import SideNav from "../components/basicComponents/SideNav";
import JoinMainArea from "../components/basicComponents/JoinMainArea";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 48px;

  padding-top: calc((100vh - 750px) / 2);
`;

const JoinPage: React.FC = () => {
  return (
    <>
      <Container>
        <SideNav />
        <JoinMainArea />
      </Container>
    </>
  );
};

export default JoinPage;
