import React from "react";
import { useState } from "react";
import styled from "styled-components";

// 입력창 component로 구분해서 props에 값을 받아서 사용! => 수정 필요한 부분!!

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

const JoinMainArea: React.FC = () => {
  const [validText, setValidText] = useState("ㆍ 필수 입력");
  // 유효성 검사를 통해서 조건에 맞지 않다면 입력하고 있는 input과 가장 가꺼운 Valid를 찾아서 setValidText를 해주고, 이는 useMemo로 memoization을 한다.
  // 모든 validText를 변경하는 게 아니라, 현재 입력하고 있는 입력창과 가장 가까운 validText 1개만 변경할 수 있도록 한다.

  return (
    <>
      <Box>
        <form className="flex flex-col justify-center items-center">
          <div className="mb-3">
            <div className="flex flex-row items-center bg-re-color-001 w-25 rounded-lg p-3">
              <InputTitle>이름</InputTitle>
              <Input required placeholder="한글, 영문" />
            </div>
            <Valid>{validText}</Valid>
          </div>

          <div className="mb-3">
            <div className="flex flex-row items-center bg-re-color-001 w-25 rounded-lg p-3">
              <InputTitle>대표 계좌</InputTitle>
              <Input required placeholder="12자리 숫자" />
            </div>
            <Valid>{validText}</Valid>
          </div>

          <div className="mb-3">
            <div className="flex flex-row items-center bg-re-color-001 w-25 rounded-lg p-3">
              <InputTitle>뱅킹 번호</InputTitle>
              <Input required placeholder="6자리 숫자" />
            </div>
            <Valid>{validText}</Valid>
          </div>

          <div className="mb-3">
            <div className="flex flex-row items-center bg-re-color-001 w-25 rounded-lg p-3">
              <InputTitle>아이디</InputTitle>
              <Input required placeholder="영문, 숫자, 특수 문자" />
            </div>
            <Valid>{validText}</Valid>
          </div>

          <div className="mb-3">
            <div className="flex flex-row items-center bg-re-color-001 w-25 rounded-lg p-3">
              <InputTitle>비밀번호</InputTitle>
              <Input required placeholder="숫자, 특수 문자" />
            </div>
            <Valid>{validText}</Valid>
          </div>

          <div className="mb-3">
            <div className="flex flex-row items-center bg-re-color-001 w-25 rounded-lg p-3">
              <InputTitle>비밀번호 확인</InputTitle>
              <Input required />
            </div>
            <Valid>{validText}</Valid>
          </div>
          <InactiveButton disabled>회원가입</InactiveButton>
        </form>
      </Box>
    </>
  );
};

export default JoinMainArea;
