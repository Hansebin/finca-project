import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  db,
  doc,
  getDoc,
  auth,
  signInWithEmailAndPassword,
} from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { SocialLoginUserDataState } from "../../datas/recoilData";
import { SocialJoinUserData } from "../../typeModel/JoinInputData";

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
  width: 300px;
  height: 50px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;

  background-color: #7966e4;

  border-radius: 7px;

  margin-top: 10px;
  margin-bottom: 30px;
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

  const [socialLoginUserDate, setSocialLoginUserDate] =
    useRecoilState<SocialJoinUserData>(SocialLoginUserDataState);

  const navigate = useNavigate();

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
      navigate(`/member/${userUID}`);
    } catch (error) {
      alert("유효하지 않은 아이디와 비밀번호 입니다. 다시 입력해주새요!");
      setEmailId("");
      setPassword("");
      console.log(error);
    }
  };

  // 구글 로그인
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      const userData = data.user;
      const userUID = userData.uid;

      setSocialLoginUserDate({
        name: userData.displayName,
        userUID: userUID,
      });

      const docRef = doc(db, "users", userUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { accountNumber } = docSnap.data();

        if (accountNumber !== 0) {
          navigate(`/member/${userUID}`);
        } else {
          navigate(`/login/makeAccount`);
        }
      }
    } catch (error) {
      console.error(error);
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
              autoComplete="off"
              className="bg-re-color-001 w-230 font-medium text-lg"
              placeholder="아이디를 입력하세요."
              name="emailId"
              onChange={handleChange}
              value={emailId}
            ></Input>
          </div>
          <div className="flex flex-row justify-between items-center bg-re-color-001 w-24 rounded-lg p-3 mb-6">
            <p className="text-xl font-bold text-re-color-003">PW</p>
            <Input
              type="password"
              required
              autoComplete="off"
              className="bg-re-color-001 w-220 text-lg font-medium"
              placeholder="비밀번호를 입력하세요."
              name="password"
              onChange={handleChange}
              value={password}
            ></Input>
          </div>
          <Button type="submit">로그인</Button>
          <p className="text-base font-bold text-re-color-002">
            아이디가 없다면?{" "}
            <Link to="/join" className="underline">
              회원가입
            </Link>
          </p>
        </form>
        <div className="flex flex-col justify-center items-center mt-16">
          <p className="text-base font-bold text-gray-004 mb-2">소셜 로그인</p>
          <button
            className="w-10 h-10 bg-re-color-002 rounded-full font-bold text-white text-xl mb-1"
            onClick={handleGoogleLogin}
          >
            G
          </button>
          <p className="text-xs font-bold text-re-color-002">구글</p>
        </div>
      </Box>
    </>
  );
};

export default LoginMainArea;
