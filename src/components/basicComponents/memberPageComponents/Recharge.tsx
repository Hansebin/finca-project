import React from "react";
import styled from "styled-components";

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
// styled-components

const Recharge: React.FC = () => {
  return (
    <>
      <p className="text-4xl font-medium text-re-color-003 mb-10">충전하기</p>
      <form>
        <div className="flex flex-col gap-7">
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>충전 가능 계좌</InputTitle>
            <Input
              required
              autoComplete="off"
              placeholder="충전 계좌를 입력하세요."
              name="remitAccountNumber"
            />
          </div>
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>금액</InputTitle>
            <Input required autoComplete="off" name="remitAccountNumber" />
          </div>
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>메모</InputTitle>
            <Input required autoComplete="off" name="remitAccountNumber" />
          </div>
        </div>

        <button className="w-full h-14 bg-re-color-002 text-white font-bold text-3xl rounded-lg mt-22">
          충전하기
        </button>
      </form>
    </>
  );
};

export default Recharge;
