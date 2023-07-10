import React from "react";
import { Link } from "react-router-dom";
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

const Button = styled.button`
  width: 200px;
  height: 50px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;

  background-color: #7966e4;

  border-radius: 7px;

  margin-top: 20px;
`;

const Input = styled.input`
  &:focus {
    outline: none;
  }
`;

const LoginMainArea: React.FC = () => {
  return (
    <>
      <Box>
        <form className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-between items-center bg-re-color-001 w-24 rounded-lg p-3 mb-5">
            <p className="text-xl font-bold text-re-color-003">ID</p>
            <Input
              type="text"
              required
              className="bg-re-color-001 w-230 font-medium text-lg"
              placeholder="아이디를 입력하세요"
            ></Input>
          </div>
          <div className="flex flex-row justify-between items-center bg-re-color-001 w-24 rounded-lg p-3 mb-6">
            <p className="text-xl font-bold text-re-color-003">PW</p>
            <Input
              type="password"
              required
              className="bg-re-color-001 w-220 text-lg font-medium"
              placeholder="비밀번호를 입력하세요"
            ></Input>
          </div>
          <p className="text-base font-bold text-re-color-002">
            아이디가 없다면?{" "}
            <Link to="/join" className="underline">
              회원가입
            </Link>
          </p>
          <Button>로그인</Button>
        </form>
        <div className="flex flex-col justify-center items-center mt-10">
          <p className="text-base font-bold text-gray-004 mb-2">소셜 로그인</p>
          <button className="w-10 h-10 bg-re-color-002 rounded-full font-bold text-white text-xl mb-1">
            G
          </button>
          <p className="text-xs font-semibold text-gray-004">구글</p>
        </div>
      </Box>
    </>
  );
};

export default LoginMainArea;
