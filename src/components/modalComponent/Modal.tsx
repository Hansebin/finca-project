import React from "react";
import styled from "styled-components";
import { ClickModalState } from "../../datas/recoilData";
import { useRecoilState } from "recoil";

interface ContainerProps {
  display: "block" | "none";
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9998;

  width: 100%;
  height: 100vh;

  background-color: #00000060;

  transition: all 0.1s ease-in-out;

  display: ${(props) => (props.display === "block" ? "block" : "none")};
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  position: absolute;
  z-index: 9999;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 450px;
  height: 300px;

  padding: 20px 20px;

  border-radius: 16px;

  background-color: white;

  transition: all 0.1s ease-in-out;

  @media screen and (max-width: 800px) {
    width: 300px;
    height: 200px;

    padding: 15px;
  }
`;

const TextBox = styled.div`
  background-color: #df1f32;

  padding: 3px 16px;

  border-radius: 50%;

  @media screen and (max-width: 800px) {
  }
`;

const Message = styled.p`
  @media screen and (max-width: 800px) {
    font-size: 15px;
  }
`;

const Button = styled.button`
  padding: 10px 130px;

  background-color: #7966e4;
  border-radius: 16px;

  font-size: 26px;
  font-weight: 700;
  color: white;

  @media screen and (max-width: 800px) {
    padding: 5px 40px;
    font-size: 20px;
    border-radius: 7px;
  }
`;

const Modal: React.FC = () => {
  const [clickModal, setClickModal] = useRecoilState(ClickModalState);

  const clickBtn = (e: React.FormEvent) => {
    e.preventDefault();
    setClickModal({
      state: false,
      text: "",
    });
  };

  return (
    <Container display={clickModal.state ? "block" : "none"}>
      <ModalBox>
        <TextBox>
          <p className="text-3xl font-bold text-white">!</p>
        </TextBox>
        <Message className="text-center text-xl font-semibold text-color-003">
          {clickModal.text}
        </Message>
        <Button onClick={clickBtn}>확인</Button>
      </ModalBox>
    </Container>
  );
};

export default Modal;
