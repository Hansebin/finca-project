import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  MemberDataState,
  ClickModalState,
  remitInputValueState,
  remitOrRecharge,
  rechargeInputValueState,
} from "../../datas/recoilData";
import { RemitInputValue } from "../../entities/RemitInputData.entity";
import { RechargeInputValue } from "../../entities/RechargeInputData.entity";
import { Member } from "../../entities/member.entity";
import Modal from "../modalComponent/Modal";
import {
  db,
  query,
  where,
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "../../firebase";

// styled-components
const NumberBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-gap: 15px;

  text-align: center;
`;

const NumberText = styled.button`
  font-size: 25px;
  font-weight: 700;
  color: white;

  padding: 13px 10px;

  background-color: #7966e4;
  border-radius: 7px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #36338c;
  }
`;

const UnderLine = styled.div`
  width: 50%;
  border-bottom: 2px solid #36338c;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;

  font-size: 25px;
  font-weight: 700;
  color: white;

  background-color: #7966e4;
  border-radius: 10px;
`;

const Delete = styled.p`
  padding: 1px 5px;
  background-color: #36338c;
  border-radius: 50%;

  font-size: 10px;
  font-family: 700;
  color: white;

  cursor: pointer;
`;
// styled-components

const BankingNumber: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);
  const [inputNumValue, setInputNumValue] = useState<string>("");
  const [clickModal, setClickModal] = useRecoilState(ClickModalState);

  const [remitOrRechargeState, setRemitOrRechargeState] =
    useRecoilState<string>(remitOrRecharge);

  // remitInputValue
  const [remitInputValue, setRemitInputValue] =
    useRecoilState<RemitInputValue>(remitInputValueState);
  // rechargeInputValue
  const [rechargeInputValue, setRechargeInputValue] =
    useRecoilState<RechargeInputValue>(rechargeInputValueState);

  const clickBtn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputNumValue === String(memberData.bankingNumber)) {
      deleteNum();

      if (remitOrRechargeState === "remit") {
        // 1. 송금한 계좌 데이터 업데이트
        const userUID = sessionStorage.getItem("loginData");
        let uid = "";

        if (userUID !== null) {
          uid = JSON.parse(userUID).uid;
        } else {
          uid = "";
        }

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { accountList, totalPrice } = docSnap.data();

          await updateDoc(docRef, {
            accountList: [
              ...accountList,
              {
                category: remitInputValue.category,
                memo: remitInputValue.remitMemo,
                price: -remitInputValue.remitPrice,
                date: new Date().toDateString(),
              },
            ],
          });

          await updateDoc(docRef, {
            totalPrice: totalPrice - Number(remitInputValue.remitPrice),
          });
        } else {
          return console.log("No such document!");
        }

        // 2. 보낸 계좌 데이터 업데이트
        const q = query(
          collection(db, "users"),
          where("accountNumber", "==", remitInputValue.remitAccountNumber)
        );

        const querySnapshot = await getDocs(q);
        const chargeAccountUid = querySnapshot.docs[0].id;

        const chargeDocRef = doc(db, "users", chargeAccountUid);
        const chargeDocSnap = await getDoc(chargeDocRef);

        if (chargeDocSnap.exists()) {
          const { accountList, totalPrice } = chargeDocSnap.data();

          await updateDoc(chargeDocRef, {
            accountList: [
              ...accountList,
              {
                category: "충전",
                memo: "충전(채우기)",
                price: "+" + remitInputValue.remitPrice,
                date: new Date().toDateString(),
              },
            ],
          });

          await updateDoc(chargeDocRef, {
            totalPrice: totalPrice + Number(remitInputValue.remitPrice),
          });
        } else {
          return console.log("No such document!");
        }
      } else {
        // 1. 충전한 계좌 데이터 업데이트
        const userUID = sessionStorage.getItem("loginData");
        let uid = "";

        if (userUID !== null) {
          uid = JSON.parse(userUID).uid;
        } else {
          uid = "";
        }

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { accountList, totalPrice } = docSnap.data();

          await updateDoc(docRef, {
            accountList: [
              ...accountList,
              {
                category: "충전",
                memo: "충전(채우기)",
                price: "+" + rechargeInputValue.remitPrice,
                date: new Date().toDateString(),
              },
            ],
          });

          await updateDoc(docRef, {
            totalPrice: totalPrice + Number(rechargeInputValue.remitPrice),
          });
        } else {
          return console.log("No such document!");
        }

        // 2. 보낸 계좌 데이터 업데이트
        const q = query(
          collection(db, "users"),
          where("accountNumber", "==", rechargeInputValue.remitAccountNumber)
        );

        const querySnapshot = await getDocs(q);
        const chargeAccountUid = querySnapshot.docs[0].id;

        const chargeDocRef = doc(db, "users", chargeAccountUid);
        const chargeDocSnap = await getDoc(chargeDocRef);

        if (chargeDocSnap.exists()) {
          const { accountList, totalPrice } = chargeDocSnap.data();

          await updateDoc(chargeDocRef, {
            accountList: [
              ...accountList,
              {
                category: "충전",
                memo: "충전(보내기)",
                price: -rechargeInputValue.remitPrice,
                date: new Date().toDateString(),
              },
            ],
          });

          await updateDoc(chargeDocRef, {
            totalPrice: totalPrice - Number(rechargeInputValue.remitPrice),
          });
        } else {
          return console.log("No such document!");
        }
      }

      setClickModal({ state: true, text: "완료!" });
      location.reload();
    } else {
      setClickModal({
        state: true,
        text: "일치하지 않은 번호입니다. 다시 입력해주세요.",
      });
      deleteNum();
    }

    console.log(inputNumValue);
  };

  const clickNum = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { number } = e.currentTarget.dataset;
    setInputNumValue(inputNumValue + number);
  };

  const deleteNum = () => {
    setInputNumValue("");
  };

  return (
    <>
      <Modal />
      <div className="h-full flex flex-col justify-between">
        <div>
          <p className="text-4xl font-medium text-re-color-003 mb-1">
            뱅킹번호 입력
          </p>
          <p className="text-lg font-medium text-re-color-002">
            : 6자리 뱅킹번호를 입력해주세요.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <UnderLine>
            <p className="text-lg">{inputNumValue}</p>
            {inputNumValue !== "" ? <Delete onClick={deleteNum}>X</Delete> : ""}
          </UnderLine>
        </div>
        <NumberBox>
          <NumberText data-number="0" onClick={clickNum}>
            0
          </NumberText>
          <NumberText data-number="1" onClick={clickNum}>
            1
          </NumberText>
          <NumberText data-number="2" onClick={clickNum}>
            2
          </NumberText>
          <NumberText data-number="3" onClick={clickNum}>
            3
          </NumberText>
          <NumberText data-number="4" onClick={clickNum}>
            4
          </NumberText>
          <NumberText data-number="5" onClick={clickNum}>
            5
          </NumberText>
          <NumberText data-number="6" onClick={clickNum}>
            6
          </NumberText>
          <NumberText data-number="7" onClick={clickNum}>
            7
          </NumberText>
          <NumberText data-number="8" onClick={clickNum}>
            8
          </NumberText>
          <NumberText data-number="9" onClick={clickNum}>
            9
          </NumberText>
        </NumberBox>
        <Button onClick={clickBtn}>완료</Button>
      </div>
    </>
  );
};

export default BankingNumber;
