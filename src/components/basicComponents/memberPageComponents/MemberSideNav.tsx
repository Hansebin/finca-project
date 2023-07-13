import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MemberDataState, ClickNavState } from "../../../datas/recoilData";
import { Member, ClickNav } from "../../../typeModel/member";

interface WhiteButtonProps {
  active: boolean;
}

// styled-components
const WhiteButton = styled.button<WhiteButtonProps>`
  width: 200px;
  height: 50px;
  background-color: ${(props) => (props.active ? "#7966e4" : "white")};
  border-radius: 10px;

  font-size: 20px;
  font-weight: 700;
  color: ${(props) => (props.active ? "white" : "#7966e4")};

  user-select: none;

  transition: all 0.3s ease-in-out;
`;
// styled-components

const MemberSideNav: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);
  const [clickNav, setClickNav] = useRecoilState<ClickNav>(ClickNavState);

  const handleButtonClick = (name: string) => {
    setClickNav(name);
  };

  return (
    <div>
      <p className="text-4xl font-bold text-re-color-002 mb-5">
        {memberData.name} 님,
      </p>
      <div className="flex flex-col gap-y-5">
        <WhiteButton
          name="account"
          active={clickNav === "account"}
          onClick={() => handleButtonClick("account")}
        >
          계좌
        </WhiteButton>
        <WhiteButton
          name="accountBook"
          active={clickNav === "accountBook"}
          onClick={() => handleButtonClick("accountBook")}
        >
          가계부
        </WhiteButton>
        <WhiteButton
          name="chart"
          active={clickNav === "chart"}
          onClick={() => handleButtonClick("chart")}
        >
          지출차트
        </WhiteButton>
      </div>
    </div>
  );
};

export default MemberSideNav;
