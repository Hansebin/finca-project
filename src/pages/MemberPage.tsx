import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { db, doc, getDoc } from "../firebase";
import styled from "styled-components";
import MemberSideNav from "../components/basicComponents/memberPageComponents/MemberSideNav";
import { MemberDataState, ClickNavState } from "../datas/recoilData";
import { Member, ClickNav } from "../typeModel/member";
import MemberAccount from "../components/basicComponents/memberPageComponents/MemberAccount";
import MemberAccountBook from "../components/basicComponents/memberPageComponents/MemberAccountBook";
import MemberChart from "../components/basicComponents/memberPageComponents/MemberChart";
import Recharge from "../components/basicComponents/memberPageComponents/Recharge";
import Remit from "../components/basicComponents/memberPageComponents/Remit";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;

  padding-top: calc((100vh - 750px) / 2);
`;

const Box = styled.div`
  width: 500px;
  height: 750px;

  background: #fff;
  border-radius: 10px;

  padding: 50px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const MemberPage: React.FC = () => {
  const [memberData, setMemberData] = useRecoilState<Member>(MemberDataState);
  const [clickNav, setClickNav] = useRecoilState<ClickNav>(ClickNavState);

  const location = useLocation();
  const userUID = location.pathname.split("/")[2];

  const getUserData = async () => {
    try {
      const docRef = doc(db, "users", userUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const {
          name,
          accountNumber,
          totalPrice,
          accountList,
          expectSpending,
          expectIncome,
          accountBookList,
        } = docSnap.data();

        setMemberData({
          name: name,
          accountNumber: accountNumber,
          totalPrice: totalPrice,
          accountList: accountList,
          expectSpending: expectSpending,
          expectIncome: expectIncome,
          accountBookList: accountBookList,
        });

        console.log("회원 데이터 불러오기 성공!");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // 전역 상태 관리로 현재 어떤 메뉴에 들어와있는지 상태 확인
  // 전역 상태 관리에 따라서 조건부 렌더링 -> 계좌, 가계부, 차트 페이지
  // 메뉴 버튼 클릭하면 전역 상태 관리 변경 -> 이에 따라 자동으로 조건부 렌더링 실시

  return (
    <Container>
      <MemberSideNav />
      <Box>
        {clickNav === "account" ? (
          <MemberAccount />
        ) : clickNav === "accountBook" ? (
          <MemberAccountBook />
        ) : clickNav === "chart" ? (
          <MemberChart />
        ) : clickNav === "remit" ? (
          <Remit />
        ) : (
          <Recharge />
        )}
      </Box>
    </Container>
  );
};

export default MemberPage;

// 첫 로드 시에는 account 컴포넌트
// 클릭하면 setState에 의해서 조건부 렌더링을 한다.
