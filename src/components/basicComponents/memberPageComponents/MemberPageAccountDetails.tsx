import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";
import styled from "styled-components";
import Pagination from "../../paginationComponent/Pagination";

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

const CategoryBox = styled.div`
  background-color: ${({ color }) =>
    color === "basic"
      ? "#7966E4"
      : color === "blue"
      ? "#3790F3"
      : color === "green"
      ? "#B4DD7F"
      : "#EC5564"};
`;

const MemberPageAccountDetails: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(memberData.accountList.length / itemsPerPage);
  const pageRangeDisplayed = 5;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const accountDetailsList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAccountList = memberData.accountList.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return (
      <>
        {currentAccountList.map((Detail, index) => (
          <AccountDetailBox key={index}>
            <div className="flex flex-row items-center">
              <CategoryBox
                className="py-2.5 px-3 bg-re-color-003 text-white rounded-full text-lg font-bold mr-2"
                color={
                  Detail.category === "충전"
                    ? "basic"
                    : Detail.category === "식사"
                    ? "blue"
                    : Detail.category === "여가"
                    ? "green"
                    : "red"
                }
              >
                {Detail.category[0]}
              </CategoryBox>
              <div className="flex flex-col">
                <p className="text-base text-re-color-004 font-semibold">
                  {Detail.category}
                </p>
                <p className="text-xs text-gray-003">{Detail.date}</p>
              </div>
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
    <>
      <div className="mt-10">
        <p className="mb-5 text-sm font-bold text-gray-002">내역 확인</p>
        {memberData.accountList.length === 0 ? (
          <div className="w-full text-center mt-21">
            <p className="font-bold text-xl text-gray-003">내역이 없습니다.</p>
          </div>
        ) : (
          <AccountDetailContainer>
            {accountDetailsList()}
          </AccountDetailContainer>
        )}
        {totalPages > 1 && (
          <Pagination
            activePage={currentPage}
            totalItemsCount={memberData.accountList.length}
            itemsCountPerPage={itemsPerPage}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default MemberPageAccountDetails;
