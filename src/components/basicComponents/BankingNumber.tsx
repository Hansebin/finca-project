import React from "react";
import styled from "styled-components";

const NumberBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-gap: 15px;

  text-align: center;
`;

const NumberText = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: white;

  padding: 13px 10px;

  background-color: #7966e4;
  border-radius: 7px;

  cursor: pointer;

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

const BankingNumber: React.FC = () => {
  const clickBtn = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
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
            <p>123456</p>
            <Delete>X</Delete>
          </UnderLine>
          <p className="mt-2 text-gray-002">비밀번호가 일치하지 않습니다.</p>
        </div>
        <NumberBox>
          <NumberText>0</NumberText>
          <NumberText>1</NumberText>
          <NumberText>2</NumberText>
          <NumberText>3</NumberText>
          <NumberText>4</NumberText>
          <NumberText>5</NumberText>
          <NumberText>6</NumberText>
          <NumberText>7</NumberText>
          <NumberText>8</NumberText>
          <NumberText>9</NumberText>
        </NumberBox>
        <Button onClick={clickBtn}>완료</Button>
      </div>
    </>
  );
};

export default BankingNumber;
