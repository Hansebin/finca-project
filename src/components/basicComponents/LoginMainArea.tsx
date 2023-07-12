import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth, signInWithEmailAndPassword } from "../../firebase";

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
// styled-components

const LoginMainArea: React.FC = () => {
  // input에 입력된 아이디와 비밀번호 담긴 state
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 입력한 텍스트 실시간 setState -> n초 후 반영될 수 있도록 최적화?
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "emailId") {
      setEmailId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // 로그인 버튼 클릭하면 로그인 작업 실행 + 회원 페이지(계좌, 가계부, 차트)로 이동 -> 회원 uid 가져와서 url에 표기하기!
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signInWithEmailAndPassword(auth, emailId, password);
      const userUID = data.user.uid;
      window.location.href = `/member/:${userUID}`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={onSubmit}
        >
          <div className="flex flex-row justify-between items-center bg-re-color-001 w-24 rounded-lg p-3 mb-5">
            <p className="text-xl font-bold text-re-color-003">ID</p>
            <Input
              type="text"
              required
              className="bg-re-color-001 w-230 font-medium text-lg"
              placeholder="아이디를 입력하세요."
              name="emailId"
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row justify-between items-center bg-re-color-001 w-24 rounded-lg p-3 mb-6">
            <p className="text-xl font-bold text-re-color-003">PW</p>
            <Input
              type="password"
              required
              className="bg-re-color-001 w-220 text-lg font-medium"
              placeholder="비밀번호를 입력하세요."
              name="password"
              onChange={handleChange}
            ></Input>
          </div>
          <p className="text-base font-bold text-re-color-002">
            아이디가 없다면?{" "}
            <Link to="/join" className="underline">
              회원가입
            </Link>
          </p>
          <Button type="submit">로그인</Button>
        </form>
        <div className="flex flex-col justify-center items-center mt-10">
          <p className="text-base font-bold text-gray-004 mb-2">소셜 로그인</p>
          <button className="w-10 h-10 bg-re-color-002 rounded-full font-bold text-white text-xl mb-1">
            G
          </button>
          <p className="text-xs font-bold text-re-color-002">구글</p>
        </div>
      </Box>
    </>
  );
};

export default LoginMainArea;
