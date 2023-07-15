import React from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";

const MemberPageAccountDetails: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);

  return (
    <div className="mt-10">
      <p className="mb-5 text-sm font-bold text-gray-002">내역 확인</p>
      {memberData.accountList.length === 0 ? (
        <div className="w-full text-center mt-21">
          <p className="font-bold text-xl text-gray-003">내역이 없습니다.</p>
        </div>
      ) : (
        <p>내역 리스트가 들어옵니다...</p>
      )}
    </div>
  );
};

export default MemberPageAccountDetails;
