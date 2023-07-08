import React from "react";
import styled from "styled-components";
import { nonmember } from "../../datas/nonmemberData";
import StartPageAccountDetails from "./StartPageAccountDetails";
import MoveButton from "./MoveButton";

const { name, accountNumber, balance } = nonmember;

const Box = styled.div`
  width: 500px;
  height: 750px;

  background: #fff;
  border-radius: 10px;

  padding: 50px;
`;

const AccountMainArea: React.FC = () => {
  return (
    <>
      <Box>
        <div>
          <p className="text-xl font-bold text-gray-002">
            계좌 {accountNumber}
          </p>
          <p className="text-3xl font-bold text-re-color-004">{name}</p>
        </div>
        <p className="text-2xl font-bold text-re-color-004 mt-6">
          잔액{" "}
          <span className="text-re-color-002">
            {balance.toLocaleString()}원
          </span>
        </p>
        <div className="flex flex-row gap-x-5">
          <button className="basis-1/2 h-12 bg-re-color-001 rounded-md text-xl font-bold text-re-color-004 mt-9">
            송금
          </button>
          <button className="basis-1/2 h-12 bg-re-color-001 rounded-md text-xl font-bold text-re-color-004 mt-9">
            충전
          </button>
        </div>
        <StartPageAccountDetails />
        <MoveButton page="로그인" to="/login" />
      </Box>
    </>
  );
};

export default AccountMainArea;
