import React from "react";
import { useState } from "react";
import styled from "styled-components";

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
  place: string;
}

const JoinInput: React.FC<OwnProps> = (props) => {
  const [validText, setValidText] = useState<string>("ㆍ 필수 입력");
  // 유효성 검사를 통해서 조건에 맞지 않다면 입력하고 있는 input과 가장 가꺼운 Valid를 찾아서 setValidText를 해주고, 이는 useMemo로 memoization을 한다.
  // 모든 validText를 변경하는 게 아니라, 현재 입력하고 있는 입력창과 가장 가까운 validText 1개만 변경할 수 있도록 한다.

  return (
    <div className="mb-3">
      <div className="flex flex-row items-center bg-re-color-001 w-25 rounded-lg p-3">
        <InputTitle>{props.title}</InputTitle>
        <Input required placeholder={props.place} />
      </div>
      <Valid>{validText}</Valid>
    </div>
  );
};

export default JoinInput;
