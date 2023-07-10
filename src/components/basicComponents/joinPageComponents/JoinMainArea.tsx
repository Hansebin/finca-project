import React from "react";
import { useState } from "react";
import styled from "styled-components";
import JoinInput from "./JoinInput";

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
  const [complete, setComplete] = useState<boolean>(false);
  // 모든 입력창을 조건에 맞게 작성하면 true로 값을 변경시킨다. 이는 useMemo로 memoization을 한다.

  return (
    <>
      <Box>
        <form className="flex flex-col justify-center items-center">
          <JoinInput title="이름" place="한글 영문" />
          <JoinInput title="대표 계좌" place="12자리 숫자" />
          <JoinInput title="뱅킹 번호" place="6자리 숫자" />
          <JoinInput title="아이디" place="* 이메일만 가능" />
          <JoinInput title="비밀번호" place="숫자, 특수 문자" />
          <JoinInput title="비밀번호 확인" place="" />
          {!complete ? (
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
