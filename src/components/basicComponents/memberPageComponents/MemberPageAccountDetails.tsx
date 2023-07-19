import React from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";
import styled from "styled-components";

const AccountDetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 15px;
`;

const AccountDetailBox = styled.div`
  width: 100%;
  height: 70px;

  padding: 0 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: #f1f4fd;
  border-radius: 7px;
`;

const MemberPageAccountDetails: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);

  const accountDetailsList = () => {
    return (
      <>
        {memberData.accountList.map((Detail, index) => (
          <AccountDetailBox key={index}>
            <div className="flex flex-row items-center">
              <p className="py-2.5 px-3 bg-re-color-003 text-white rounded-full text-lg font-bold mr-2">
                {Detail.category[0]}
              </p>
              <p className="text-base font-bold text-gray-003">
                {Detail.category}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-lg font-bold text-re-color-003 mr-4">
                {Detail.memo}
              </p>
              <p className="text-xl text-re-color-004 font-bold">
                {Detail.price.toLocaleString()}
              </p>
            </div>
          </AccountDetailBox>
        ))}
      </>
    );
  };

  return (
    <div className="mt-10">
      <p className="mb-5 text-sm font-bold text-gray-002">내역 확인</p>
      {memberData.accountList.length === 0 ? (
        <div className="w-full text-center mt-21">
          <p className="font-bold text-xl text-gray-003">내역이 없습니다.</p>
        </div>
      ) : (
        <AccountDetailContainer>{accountDetailsList()}</AccountDetailContainer>
      )}
    </div>
  );
};

export default MemberPageAccountDetails;
