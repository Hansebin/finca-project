import React from "react";
import styled from "styled-components";
import SideNav from "../components/basicComponents/SideNav";
import SocialAccountJoin from "../components/basicComponents/joinPageComponents/SocialAccountJoin";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 48px;

  padding-top: calc((100vh - 750px) / 2);
`;

const SocialJoinPage: React.FC = () => {
  return (
    <>
      <Container>
        <SideNav />
        <SocialAccountJoin />
      </Container>
    </>
  );
};

export default SocialJoinPage;
