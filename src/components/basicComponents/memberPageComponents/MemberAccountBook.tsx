import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { MemberDataState, ClickNavState } from "../../../datas/recoilData";
import { Member, ClickNav } from "../../../typeModel/member";
import MemberPageAccountBookDetails from "./MemberPageAccountBookDetails";

const Button = styled.button`
  padding: 12px 47px;
  margin-top: 55px;

  font-size: 20px;
  font-weight: 700;
  color: white;

  border-radius: 7px;
  background-color: #7966e4;

  transition: all 0.1s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

const TitleText = styled.p`
  @media screen and (max-width: 500px) {
    font-size: 25px;
  }
`;

const PriceText = styled.p`
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const MemberAccountBook: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);
  const [clickNav, setClickNav] = useRecoilState<ClickNav>(ClickNavState);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const handleButtonClick = (name: string) => {
    setClickNav(name);
  };

  const totalPrice = (type: string) => {
    let total = 0;

    const newArr = memberData.accountBookList.filter(
      (data) =>
        data.accountBookType === type &&
        data.date.includes(String(currentYear)) &&
        data.date.includes(String(currentMonth))
    );

    newArr.forEach((data) => (total += Number(data.price)));

    return total;
  };

  return (
    <>
      <div>
        <p className="text-xl font-bold text-gray-002">현명하게 소비하기!</p>
        <TitleText className="text-3xl font-bold text-re-color-004">
          {currentYear}. 0{currentMonth}의 지출과 수입
        </TitleText>
      </div>
      <div className="flex flex-row w-full mt-7">
        <div className="w-1/2">
          <p className="text-xl font-bold text-gray-003">
            예상 <span className="text-2xl text-re-color-003">지출</span>
          </p>
          <PriceText className="text-2xl text-re-color-002 font-bold mt-1">
            - {totalPrice("지출").toLocaleString()}원
          </PriceText>
        </div>
        <div className="w-1/2">
          <p className="text-xl font-bold text-gray-003">
            예상 <span className="text-2xl text-re-color-003">수입</span>
          </p>
          <PriceText className="text-2xl text-re-color-002 font-bold mt-1">
            + {totalPrice("수입").toLocaleString()}원
          </PriceText>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <Button onClick={() => handleButtonClick("makeAccountBookList")}>
          가계부 작성
        </Button>
      </div>
      <MemberPageAccountBookDetails />
    </>
  );
};

export default MemberAccountBook;
