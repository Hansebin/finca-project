import React from "react";
import styled from "styled-components";
import { nonmember } from "../../datas/nonmemberData";

const { name, accountNumber, balance } = nonmember;

const AccountBox = styled.div`
  width: 500px;
  height: 750px;

  background: #fff;
  border-radius: 10px;

  padding: 50px;
`;

const AccountMainArea: React.FC = () => {
  return (
    <>
      <AccountBox>
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
      </AccountBox>
    </>
  );
};

export default AccountMainArea;
