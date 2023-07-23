import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  SocialLoginUserDataState,
  inputValueState,
  SocialIsValidState,
  ClickModalState,
} from "../../../datas/recoilData";
import {
  SocialJoinUserData,
  InputData,
  SocialInputDataIsValid,
} from "../../../typeModel/JoinInputData";
import SocialJoinInput from "./SocialJoinInput";
import { db, collection, doc, setDoc } from "../../../firebase";
import Modal from "../../modalComponent/Modal";

// styled-components
const Box = styled.div`
  width: 500px;
  height: 750px;

  background: #fff;
  border-radius: 10px;

  padding: 50px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  display: flex;
  flex-direction: row;
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

const SocialAccountJoin: React.FC = () => {
  const navigate = useNavigate();

  const [clickModal, setClickModal] = useRecoilState(ClickModalState);

  const [socialLoginUserDate] = useRecoilState<SocialJoinUserData>(
    SocialLoginUserDataState
  );

  const [inputValue] = useRecoilState<InputData>(inputValueState);
  const [isValid] = useRecoilState<SocialInputDataIsValid>(SocialIsValidState);

  const {
    accountNumber,
    bankingNumber,
    totalPrice,
    expectSpending,
    expectIncome,
    accountList,
    accountBookList,
  } = inputValue;

  const join = async () => {
    try {
      const userData = {
        name: socialLoginUserDate.name,
        accountNumber: accountNumber,
        bankingNumber: bankingNumber,
        totalPrice: totalPrice,
        expectSpending: expectSpending,
        expectIncome: expectIncome,
        accountList: accountList,
        accountBookList: accountBookList,
      };

      await setDoc(
        doc(collection(db, "users"), socialLoginUserDate.userUID),
        userData
      );

      setClickModal({ state: true, text: "계좌 생성 성공!" });
      navigate(`/memberPage`);
    } catch (error) {
      console.error("회원가입 중 오류가 발생했습니다", error);
      setClickModal({ state: true, text: "회원가입 중 오류가 발생했습니다." });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    join();
  };

  const isAllValid = (obj: SocialInputDataIsValid) => {
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
          <SocialJoinInput
            title="대표 계좌"
            text="12자리 숫자"
            data="accountNumber"
          />
          <SocialJoinInput
            title="뱅킹 번호"
            text="6자리 숫자"
            data="bankingNumber"
          />
          {!isAllValid(isValid) ? (
            <InactiveButton type="submit" disabled>
              계좌 생성
            </InactiveButton>
          ) : (
            <ActiveButton type="submit">회원가입</ActiveButton>
          )}
        </form>
      </Box>
    </>
  );
};

export default SocialAccountJoin;
