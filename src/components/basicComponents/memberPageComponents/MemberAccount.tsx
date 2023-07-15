import React from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";
import MemberPageAccountDetails from "./MemberPageAccountDetails";

const MemberAccount: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);

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
        <button className="basis-1/2 h-10 bg-re-color-001 rounded-md text-xl font-bold text-re-color-004">
          송금
        </button>
        <button className="basis-1/2 h-10 bg-re-color-001 rounded-md text-xl font-bold text-re-color-004">
          충전
        </button>
      </div>
      <MemberPageAccountDetails />
    </>
  );
};

export default MemberAccount;
