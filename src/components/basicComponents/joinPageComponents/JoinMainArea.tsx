import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import JoinInput from "./JoinInput";
import {
  inputValueState,
  IsValidState,
  ClickModalState,
} from "../../../datas/recoilData";
import { InputData, InputDataIsValid } from "../../../typeModel/JoinInputData";
import { auth, createUserWithEmailAndPassword } from "../../../firebase";
import { db, collection, doc, setDoc } from "../../../firebase";
import Modal from "../../modalComponent/Modal";

// styled-components
const Box = styled.div`
  width: 500px;
  height: 750px;

  background: #fff;
  border-radius: 10px;

  padding: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ActiveButton = styled.button`
  width: 200px;
  height: 50px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;

  background-color: #7966e4;

  border-radius: 7px;

  margin-top: 20px;
`;
// 모든 입력창이 조건에 맞게 되면 activeBtn을 사용한다. => 조건부 처리!
// state로 true, false 값을 받아서 사용하는 것도 좋을듯?

const InactiveButton = styled.button`
  width: 200px;
  height: 50px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;

  background-color: #e8e8e8;

  border-radius: 7px;

  margin-top: 20px;
`;
// styled-components

const JoinMainArea: React.FC = () => {
  const navigate = useNavigate();

  const [inputValue] = useRecoilState<InputData>(inputValueState);

  const [isValid] = useRecoilState<InputDataIsValid>(IsValidState);

  const [clickModal, setClickModal] = useRecoilState(ClickModalState);

  const {
    name,
    accountNumber,
    bankingNumber,
    id,
    password,
    totalPrice,
    expectSpending,
    expectIncome,
    accountList,
    accountBookList,
  } = inputValue;

  const join = async () => {
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        id,
        password
      );

      const userUID = createdUser.user.uid;

      const userData = {
        name: name,
        accountNumber: accountNumber,
        bankingNumber: bankingNumber,
        id: id,
        password: password,
        totalPrice: totalPrice,
        expectSpending: expectSpending,
        expectIncome: expectIncome,
        accountList: accountList,
        accountBookList: accountBookList,
      };

      await setDoc(doc(collection(db, "users"), userUID), userData);
      setClickModal({ state: true, text: "회원가입 성공!" });
      navigate("/login");
    } catch (error) {
      console.error("회원가입 중 오류가 발생했습니다", error);
      setClickModal({
        state: true,
        text: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요!",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    join();
  };

  const isAllValid = (obj: InputDataIsValid) => {
    return Object.values(obj).every((value) => value === true);
  };

  return (
    <>
      <Box>
        <Modal />
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <JoinInput title="이름" text="한글, 영문" data="name" />
          <JoinInput
            title="대표 계좌"
            text="12자리 숫자"
            data="accountNumber"
          />
          <JoinInput title="뱅킹 번호" text="6자리 숫자" data="bankingNumber" />
          <JoinInput title="아이디" text="* 이메일만 가능" data="id" />
          <JoinInput title="비밀번호" text="숫자, 특수 문자" data="password" />
          {!isAllValid(isValid) ? (
            <InactiveButton type="submit" disabled>
              회원가입
            </InactiveButton>
          ) : (
            <ActiveButton type="submit">회원가입</ActiveButton>
          )}
        </form>
      </Box>
    </>
  );
};

export default JoinMainArea;
