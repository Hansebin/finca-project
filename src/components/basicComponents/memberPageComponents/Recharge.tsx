import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  ClickModalState,
  MemberDataState,
  ClickNavState,
  remitOrRecharge,
  rechargeInputValueState,
} from "../../../datas/recoilData";
import Modal from "../../modalComponent/Modal";
import { Member, ClickNav } from "../../../typeModel/member";
import { RechargeInputValue } from "../../../typeModel/RechargeInputData";
import {
  db,
  query,
  where,
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "../../../firebase";

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
    width: 150px;
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

  margin-top: 286px;
`;

const InactiveButton = styled.button`
  width: 100%;
  height: 70px;

  background-color: #e8e8e8;
  color: white;

  font-weight: 700;
  font-size: 30px;

  border-radius: 10px;

  margin-top: 286px;
`;
// styled-components

const Recharge: React.FC = () => {
  // modal
  const [clickModal, setClickModal] = useRecoilState(ClickModalState);

  const [memberData] = useRecoilState<Member>(MemberDataState);

  const [clickNav, setClickNav] = useRecoilState<ClickNav>(ClickNavState);

  const [remitOrRechargeState, setRemitOrRechargeState] =
    useRecoilState<string>(remitOrRecharge);

  const [rechargeInputValue, setRechargeInputValue] =
    useRecoilState<RechargeInputValue>(rechargeInputValueState);

  // const 입력값 전달 받고 저장할 데이터 형식 생성하는 함수 = () => {}
  // rechargeInputValue = 사용자에게 입력 받은 충전 관련 데이터
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRechargeInputValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  // 모든 항목 입력/선택했는지
  const isAnyValueEmpty = Object.values(rechargeInputValue).some(
    (value) => value === ""
  );

  // const 전달 받을 계좌가 존재하는지 여부 판단하는 함수 = () => {}
  const existAccountNumber = async () => {
    const q = query(
      collection(db, "users"),
      where("accountNumber", "==", rechargeInputValue.remitAccountNumber)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return true;
    } else {
      return false;
    }
  };

  // const 충전할 계좌의 잔액이 충분한지 판단하는 함수 = () => {}
  const enoughPrice = async () => {
    const isExistAccountNumber = await existAccountNumber();

    if (isExistAccountNumber) {
      const q = query(
        collection(db, "users"),
        where("accountNumber", "==", rechargeInputValue.remitAccountNumber)
      );

      const querySnapshot = await getDocs(q);
      const chargeAccountUid = querySnapshot.docs[0].id;

      const chargeDocRef = doc(db, "users", chargeAccountUid);
      const chargeDocSnap = await getDoc(chargeDocRef);

      if (chargeDocSnap.exists()) {
        const { totalPrice } = chargeDocSnap.data();
        return totalPrice >= Number(rechargeInputValue.remitPrice);
      }
    }

    return false;
  };

  // input창 초기화
  const clearInput = () => {
    setRechargeInputValue({
      remitAccountNumber: "",
      remitPrice: "",
    });
  };

  // const 충전하기 함수 = () => {}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 제출과 동시에 계좌와 잔액 확인
    const [isExistAccountNumber, isEnoughPrice] = await Promise.all([
      existAccountNumber(),
      enoughPrice(),
    ]);

    if (isExistAccountNumber) {
      if (isEnoughPrice) {
        setRemitOrRechargeState("recharge");
        setClickNav("bankingNumber");
      } else {
        setClickModal({
          state: true,
          text: "잔액이 부족해 충전이 불가능합니다.",
        });
        clearInput();
      }
    } else {
      setClickModal({
        state: true,
        text: "존재하지 않은 계좌번호입니다. 올바른 계좌번호를 입력해주세요.",
      });
      clearInput();
    }
  };

  return (
    <>
      <Modal />
      <p className="text-4xl font-medium text-re-color-003 mb-10">충전하기</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7">
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>충전 가능 계좌</InputTitle>
            <Input
              required
              autoComplete="off"
              placeholder="충전 계좌를 입력하세요."
              name="remitAccountNumber"
              value={rechargeInputValue.remitAccountNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>금액</InputTitle>
            <Input
              required
              autoComplete="off"
              name="remitPrice"
              value={rechargeInputValue.remitPrice}
              onChange={handleChange}
            />
          </div>
        </div>
        {isAnyValueEmpty ? (
          <InactiveButton disabled>충전하기</InactiveButton>
        ) : (
          <ActiveButton>충전하기</ActiveButton>
        )}
      </form>
    </>
  );
};
export default Recharge;
