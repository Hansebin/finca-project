import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  MemberDataState,
  ClickCategoryState,
  ClickModalState,
  remitInputValueState,
  ClickNavState,
  remitOrRecharge,
} from "../../../datas/recoilData";
import { Member, ClickNav } from "../../../typeModel/member";
import { RemitInputValue } from "../../../typeModel/RemitInputData";
import { db, query, where, getDocs, collection } from "../../../firebase";
import Modal from "../../modalComponent/Modal";

interface categoryButtonProps {
  active: boolean;
}

// styled-components
const InputTitle = styled.p`
  font-size: 20px;
  color: #36338c;
  font-weight: 700;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
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

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const CategoryButton = styled.div<categoryButtonProps>`
  background-color: ${(props) => (props.active ? "#36338C" : "#7966e4")};

  @media screen and (max-width: 500px) {
    padding: 5px 20px;
  }
`;

const ActiveButton = styled.button`
  width: 100%;
  height: 70px;

  background-color: #7966e4;
  color: white;

  font-weight: 700;
  font-size: 30px;

  border-radius: 10px;

  margin-top: 80px;
`;

const InactiveButton = styled.button`
  width: 100%;
  height: 70px;

  background-color: #e8e8e8;
  color: white;

  font-weight: 700;
  font-size: 30px;

  border-radius: 10px;

  margin-top: 80px;
`;
// styled-components

const Remit: React.FC = () => {
  // modal
  const [clickModal, setClickModal] = useRecoilState(ClickModalState);

  const [memberData] = useRecoilState<Member>(MemberDataState);

  const [clickNav, setClickNav] = useRecoilState<ClickNav>(ClickNavState);

  const [remitOrRechargeState, setRemitOrRechargeState] =
    useRecoilState<string>(remitOrRecharge);

  const [remitInputValue, setRemitInputValue] =
    useRecoilState<RemitInputValue>(remitInputValueState);

  // click category
  const [ClickCategory, setClickCategory] =
    useRecoilState<string>(ClickCategoryState);

  const handleButtonClick = (name: string) => {
    setClickCategory(name);
  };

  // const 입력값 전달 받고 저장할 데이터 형식 생성하는 함수 = () => {}
  // remitInputValue = 사용자에게 입력 받은 송금 관련 데이터
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRemitInputValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleCategorySelection = (category: string) => {
    setRemitInputValue((prevInputValues) => ({
      ...prevInputValues,
      category: category,
    }));
  };

  // 모든 항목 입력/선택했는지
  const isAnyValueEmpty = Object.values(remitInputValue).some(
    (value) => value === ""
  );

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
    return memberData.totalPrice >= Number(remitInputValue.remitPrice);
  };

  // input창 초기화
  const clearInput = () => {
    setRemitInputValue({
      remitAccountNumber: "",
      remitPrice: "",
      remitMemo: "",
      category: "",
    });
    handleButtonClick("미선택");
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
      if (isEnoughPrice) {
        setRemitOrRechargeState("remit");
        setClickNav("bankingNumber");
      } else {
        setClickModal({
          state: true,
          text: "잔액이 부족해 송금이 불가능합니다.",
        });
        clearInput();
      }
    } else {
      setClickModal({
        state: true,
        text: "존재하지 않는 계좌번호입니다. 올바른 계좌번호를 입력해주세요.",
      });
      clearInput();
    }
  };

  return (
    <>
      <Modal />
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
            <CategoryButton
              className="py-1.5 px-6 text-white rounded-full font-bold cursor-pointer"
              active={ClickCategory === "식사"}
              onClick={() => {
                handleCategorySelection("식사");
                handleButtonClick("식사");
              }}
            >
              식사
            </CategoryButton>
            <CategoryButton
              className="py-1.5 px-6 text-white rounded-full font-bold cursor-pointer"
              active={ClickCategory === "여가"}
              onClick={() => {
                handleCategorySelection("여가");
                handleButtonClick("여가");
              }}
            >
              여가
            </CategoryButton>
            <CategoryButton
              className="py-1.5 px-6 text-white rounded-full font-bold cursor-pointer"
              active={ClickCategory === "쇼핑"}
              onClick={() => {
                handleCategorySelection("쇼핑");
                handleButtonClick("쇼핑");
              }}
            >
              쇼핑
            </CategoryButton>
            <CategoryButton
              className="py-1.5 px-6 bg-re-color-002 text-white rounded-full font-bold cursor-pointer"
              active={ClickCategory === "기타"}
              onClick={() => {
                handleCategorySelection("기타");
                handleButtonClick("기타");
              }}
            >
              기타
            </CategoryButton>
          </div>
        </div>
        {isAnyValueEmpty ? (
          <InactiveButton disabled>송금하기</InactiveButton>
        ) : (
          <ActiveButton>송금하기</ActiveButton>
        )}
      </form>
    </>
  );
};

export default Remit;
