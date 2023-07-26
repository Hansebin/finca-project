import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { MemberDataState, ClickNavState } from "../../../datas/recoilData";
import { Member, ClickNav } from "../../../typeModel/member";
import MemberPageAccountDetails from "./MemberPageAccountDetails";

const Button = styled.button`
  transition: all 0.1s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const MemberAccount: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);
  const [clickNav, setClickNav] = useRecoilState<ClickNav>(ClickNavState);

  const handleButtonClick = (name: string) => {
    setClickNav(name);
  };

  return (
    <>
      <div>
        <p className="text-xl font-bold text-gray-002">
          계좌 {memberData.accountNumber}
        </p>
        <p className="text-3xl font-bold text-re-color-004">
          {memberData.name}
        </p>
      </div>
      <p className="text-2xl font-bold text-re-color-004 mt-7">
        잔액{" "}
        <span className="text-re-color-002">
          {memberData.totalPrice.toLocaleString()}원
        </span>
      </p>
      <div className="flex flex-row gap-x-4 mt-5">
        <Button
          className="basis-1/2 h-10 bg-re-color-003 rounded-md text-xl font-bold text-white"
          onClick={() => handleButtonClick("remit")}
        >
          보내기
        </Button>
        <Button
          className="basis-1/2 h-10 bg-bg-color rounded-md text-xl font-bold text-re-color-003"
          onClick={() => handleButtonClick("recharge")}
        >
          채우기
        </Button>
      </div>
      <MemberPageAccountDetails />
    </>
  );
};

export default MemberAccount;
