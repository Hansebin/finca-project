import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";
import styled from "styled-components";
import Pagination from "../../paginationComponent/Pagination";

interface ActiveBtn {
  active: boolean;
}

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
  min-height: 370px;
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

const TypeButton = styled.p<ActiveBtn>`
  background-color: ${(props) => (props.active ? "#7966e4" : "#E3DEFE")};
  color: ${(props) => (props.active ? "white" : "#7966e4")};

  transition: all 0.2s ease-in-out;
`;

const MemberPageAccountDetails: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);

  const [clickType, setClickType] = useState<string>("whole");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(memberData.accountList.length / itemsPerPage);
  const pageRangeDisplayed = 5;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const list = () => {
    const spendList = memberData.accountList.filter(
      (data) => data.category !== "충전"
    );

    const reChargeList = memberData.accountList.filter(
      (data) => data.category === "충전"
    );

    if (clickType === "whole") {
      return memberData.accountList;
    } else if (clickType === "spend") {
      return spendList;
    } else {
      return reChargeList;
    }
  };

  const onClick = (type: string) => {
    setClickType(type);
  };

  const accountDetailsList = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAccountList = list().slice(indexOfFirstItem, indexOfLastItem);

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
                {Detail.price.toLocaleString()}
              </PriceText>
            </div>
          </AccountDetailBox>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="mt-9">
        <Container>
          <div className="flex flex-row items-center mb-4 gap-3">
            <p className="text-sm font-bold text-gray-002">내역 확인</p>
            <TypeButton
              className="text-sm font-bold py-1 px-2 rounded-md cursor-pointer"
              onClick={() => {
                onClick("whole");
              }}
              active={clickType === "whole"}
            >
              전체
            </TypeButton>
            <TypeButton
              className="text-sm font-bold py-1 px-2 rounded-md cursor-pointer"
              onClick={() => {
                onClick("spend");
              }}
              active={clickType === "spend"}
            >
              지출
            </TypeButton>
            <TypeButton
              className="text-sm font-bold py-1 px-2 rounded-md cursor-pointer"
              onClick={() => {
                onClick("charge");
              }}
              active={clickType === "charge"}
            >
              충전
            </TypeButton>
          </div>
          {list().length === 0 ? (
            <div className="w-full text-center mt-21">
              <p className="font-bold text-xl text-gray-003">
                내역이 없습니다.
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
            totalItemsCount={list().length}
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
