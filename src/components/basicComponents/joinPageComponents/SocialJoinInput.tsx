import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { inputValueState, SocialIsValidState } from "../../../datas/recoilData";
import {
  InputData,
  InputDataWithoutDetails,
  SocialInputDataIsValid,
} from "../../../entities/JoinInputData.entity";
import { isValidAccountNumber, isValidBankingNumber } from "./validItemFun";

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

const Valid = styled.p`
  font-size: 12px;
  color: #7966e4;
  font-weight: 500;
  margin-top: 2px;
`;

interface OwnProps {
  title: string;
  text: string;
  data: string;
}
// styled-components

interface OwnProps {
  title: string;
  text: string;
  data: string;
}

const SocialJoinInput: React.FC<OwnProps> = (props) => {
  const [validText, setValidText] = useState<string>("ㆍ 필수 입력");

  const [inputValue, setInputValue] =
    useRecoilState<InputData>(inputValueState);

  const [isValid, setIsValid] =
    useRecoilState<SocialInputDataIsValid>(SocialIsValidState);

  const handleValidation = (name: string, value: string) => {
    let message = "";
    let isValidResult = false;

    if (name === "accountNumber") {
      isValidResult = isValidAccountNumber(value);
      message = isValidResult
        ? "사용 가능한 계좌번호입니다."
        : "올바르지 않은 계좌번호입니다.";
    } else if (name === "bankingNumber") {
      isValidResult = isValidBankingNumber(value);
      message = isValidResult
        ? "사용 가능한 뱅킹번호입니다."
        : "올바르지 않은 뱅킹번호입니다.";
    }

    setValidText(message);

    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      [name]: isValidResult,
    }));
  };

  // 특정 시간 후에 저장되도록 -> 실시간으로 반영되면 오히려 비효율!
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));

    handleValidation(name, value);
  };

  return (
    <div className="mb-3">
      <div className="flex flex-row items-center bg-color-001 w-25 rounded-lg p-3">
        <InputTitle>{props.title}</InputTitle>
        <Input
          required
          autoComplete="off"
          placeholder={props.text}
          name={props.data}
          value={inputValue[props.data as keyof InputDataWithoutDetails] || ""}
          onChange={handleChange}
        />
      </div>
      <Valid>{validText}</Valid>
    </div>
  );
};

export default SocialJoinInput;
