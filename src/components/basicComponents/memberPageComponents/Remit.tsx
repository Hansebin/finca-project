import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";
import { RemitInputValue } from "../../../typeModel/RemitInputData";
import { db, query, where, getDocs, collection } from "../../../firebase";

// styled-components
const InputTitle = styled.p`
  font-size: 20px;
  color: #36338c;
  font-weight: 700;
`;

const Input = styled.input`
  background: #f1f4fd;
  font-weight: 500;
  font-size: 18px;
  width: 190px;
  margin-left: 15px;
  &:focus {
    outline: none;
  }
`;
// styled-components

const Remit: React.FC = () => {
  const [remitInputValue, setRemitInputValue] = useState<RemitInputValue>({
    remitAccountNumber: 0,
    remitPrice: 0,
    remitMemo: "",
    category: "",
  });
  const [memberData] = useRecoilState<Member>(MemberDataState);

  // const 입력값 전달 받고 저장할 데이터 형식 생성하는 함수 = () => {}
  // remitInputValue = 사용자에게 입력 받은 송금 관련 데이터
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRemitInputValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));

    console.log(remitInputValue);
  };

  const handleCategorySelection = (category: string) => {
    setRemitInputValue((prevInputValues) => ({
      ...prevInputValues,
      category: category,
    }));

    console.log(remitInputValue);
  };

  // const 전달 받을 계좌가 존재하는지 여부 판단하는 함수 = () => {}
  const existAccountNumber = async () => {
    const q = query(
      collection(db, "users"),
      where("accountNumber", "==", remitInputValue.remitAccountNumber)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // const 송금할 계좌의 잔액이 충분한지 판단하는 함수 = () => {}
  const enoughPrice = async () => {
    return memberData.totalPrice > remitInputValue.remitPrice;
  };

  // const 송금하기 함수 = () => {}
  const handleSubmit = async (e: React.FormEvent) => {
    // 제출과 동시에 계좌와 잔액 확인
    e.preventDefault();

    const [isExistAccountNumber, isEnoughPrice] = await Promise.all([
      existAccountNumber(),
      enoughPrice(),
    ]);

    if (isExistAccountNumber) {
      alert("존재하는 계좌!");
      if (isEnoughPrice) {
        alert("잔액 충분!");
        // ... 1. 송금할 계좌의 거래 내역에 listData 추가
        // ... 2. 송금할 계좌의 잔액 수정
        // ... 3. 보낸 계좌의 거래 내역에 listData 추가 -> 송금과는 다르게 충전으로
        // ... 4. 계좌 페이지 처음으로 이동
      } else {
        alert("잔액 부족 ㅜㅜ");
        // ... 잔액 부족 에러 메시지 띄우기
        // ... 모든 input value 빈 문자열로 초기화
      }
    } else {
      alert("존재하지 않는 계좌 ㅠㅜ");
      // ... 존재하지 않는 계좌 번호 에러 메시지 띄우기
      // ... 모든 input value 빈 문자열로 초기화
    }
  };

  return (
    <>
      <p className="text-4xl font-medium text-re-color-003 mb-10">송금하기</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7">
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>보낼 계좌</InputTitle>
            <Input
              required
              autoComplete="off"
              placeholder="보낼 계좌를 입력하세요."
              name="remitAccountNumber"
              value={remitInputValue.remitAccountNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>금액</InputTitle>
            <Input
              required
              autoComplete="off"
              name="remitPrice"
              value={remitInputValue.remitPrice}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>메모</InputTitle>
            <Input
              required
              autoComplete="off"
              name="remitMemo"
              value={remitInputValue.remitMemo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-re-color-003 mt-6 mb-4">
            카데고리 선택
          </p>
          <div className="flex flex-row justify-between">
            <div
              className="py-1.5 px-6 bg-re-color-002 text-white rounded-full font-bold cursor-pointer"
              onClick={() => handleCategorySelection("식사")}
            >
              식사
            </div>
            <div
              className="py-1.5 px-6 bg-re-color-002 text-white rounded-full font-bold cursor-pointer"
              onClick={() => handleCategorySelection("여가")}
            >
              여가
            </div>
            <div
              className="py-1.5 px-6 bg-re-color-002 text-white rounded-full font-bold cursor-pointer"
              onClick={() => handleCategorySelection("쇼핑")}
            >
              쇼핑
            </div>
            <div
              className="py-1.5 px-6 bg-re-color-002 text-white rounded-full font-bold cursor-pointer"
              onClick={() => handleCategorySelection("기타")}
            >
              기타
            </div>
          </div>
        </div>
        <button className="w-full h-14 bg-re-color-002 text-white font-bold text-3xl rounded-lg mt-16">
          송금하기
        </button>
      </form>
    </>
  );
};

export default Remit;
