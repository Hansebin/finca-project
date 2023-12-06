import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../entities/member.entity";
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
      : color === "red"
      ? "#EC5564"
      : "#FFCA75"};

  @media screen and (max-width: 500px) {
    padding: 3px 9px;
  }
`;

const Container = styled.div`
  min-height: 285px;
`;

const MemoText = styled.p`
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

const PriceText = styled.p`
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const CategoryText = styled.p`
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

const DateText = styled.p`
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const MemberPageAccountBookDetails: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const newArr = () => {
    const newList = memberData.accountBookList.filter(
      (data) =>
        data.date.includes(String(currentYear)) &&
        data.date.includes(String(currentMonth))
    );

    return newList;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(newArr().length / itemsPerPage);
  const pageRangeDisplayed = 5;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const accountDetailsList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAccountList = newArr().slice(
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
                    : Detail.category === "쇼핑"
                    ? "red"
                    : "yellow"
                }
              >
                {Detail.category[0]}
              </CategoryBox>
              <div className="flex flex-col">
                <CategoryText className="text-base text-re-color-004 font-semibold">
                  {Detail.category}
                </CategoryText>
                <DateText className="text-xs text-gray-003">
                  {Detail.date}
                </DateText>
              </div>
            </div>
            <div className="flex flex-row">
              <MemoText className="text-lg font-bold text-re-color-003 mr-4">
                {Detail.memo}
              </MemoText>
              <PriceText className="text-xl text-re-color-004 font-bold">
                {Number(Detail.price).toLocaleString()}
              </PriceText>
            </div>
          </AccountDetailBox>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="mt-10">
        <Container>
          <p className="mb-5 text-sm font-bold text-gray-002">
            가계부 내역 상세보기
          </p>
          {newArr().length === 0 ? (
            <div className="w-full text-center mt-21">
              <p className="font-bold text-xl text-gray-003">
                가계부 내역이 없습니다.
              </p>
            </div>
          ) : (
            <AccountDetailContainer>
              {accountDetailsList()}
            </AccountDetailContainer>
          )}
        </Container>
        {totalPages > 1 && (
          <Pagination
            activePage={currentPage}
            totalItemsCount={newArr().length}
            itemsCountPerPage={itemsPerPage}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default MemberPageAccountBookDetails;
