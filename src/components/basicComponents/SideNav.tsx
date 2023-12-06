import React from "react";
import styled from "styled-components";

// styled-components
const WhiteButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: white;
  border-radius: 10px;

  font-size: 20px;
  font-weight: 700;
  color: #7966e4;

  user-select: none;

  @media screen and (max-width: 800px) {
    width: 100px;
    height: 50px;
  }

  @media screen and (max-width: 500px) {
    font-size: 17px;
    width: 100px;
    height: 40px;
    border-radius: 7px;
  }
`;

const GrayButton = styled(WhiteButton)`
  color: #7966e4;
  opacity: 0.5;
`;

const NavContainer = styled.div`
  @media screen and (max-width: 800px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;
  }
`;

const Text = styled.p`
  @media screen and (max-width: 800px) {
    margin-bottom: 0;
  }

  @media screen and (max-width: 500px) {
    font-size: 25px;
  }
`;
// styled-components

const SideNav: React.FC = () => {
  return (
    <div>
      <Text className="text-4xl font-bold text-color-002 mb-5">미리 보기</Text>
      <NavContainer className="flex flex-col gap-y-5">
        <WhiteButton disabled>계좌</WhiteButton>
        <GrayButton disabled>가계부</GrayButton>
        <GrayButton disabled>지출차트</GrayButton>
      </NavContainer>
    </div>
  );
};

export default SideNav;
