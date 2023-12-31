import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { db, doc, getDoc } from "../firebase";
import styled from "styled-components";
import MemberSideNav from "../components/basicComponents/memberPageComponents/MemberSideNav";
import { MemberDataState, ClickNavState } from "../datas/recoilData";
import { Member, ClickNav } from "../entities/member.entity";
import MemberAccount from "../components/basicComponents/memberPageComponents/MemberAccount";
import MemberAccountBook from "../components/basicComponents/memberPageComponents/MemberAccountBook";
// import MemberChart from "../components/basicComponents/memberPageComponents/MemberChart";
import Recharge from "../components/basicComponents/memberPageComponents/Recharge";
import Remit from "../components/basicComponents/memberPageComponents/Remit";
import BankingNumber from "../components/basicComponents/BankingNumber";
import DateChart from "../components/basicComponents/memberPageComponents/DateChart";
import CategoryChart from "../components/basicComponents/memberPageComponents/CategoryChart";
import MakeAccountBookList from "../components/basicComponents/memberPageComponents/MakeAccountBookList";
import Spinner from "../components/spinnerComponent/Spinner";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;

  padding-top: calc((100vh - 750px) / 2);

  @media screen and (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    padding-top: 25px;
    padding-bottom: 25px;
  }
`;

const Box = styled.div`
  /* position: relative; */

  width: 500px;
  height: 750px;

  background: #fff;
  border-radius: 10px;

  padding: 50px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media screen and (max-width: 500px) {
    width: 95%;
    padding: 25px;
  }
`;

const MemberPage: React.FC = () => {
  const [memberData, setMemberData] = useRecoilState<Member>(MemberDataState);
  const [clickNav, setClickNav] = useRecoilState<ClickNav>(ClickNavState);
  const [loading, setLoading] = useState<boolean | null>(null);

  const getUserData = async () => {
    try {
      setLoading(true);
      const userUID = sessionStorage.getItem("loginData");
      let uid = "";

      if (userUID !== null) {
        uid = JSON.parse(userUID).uid;
      } else {
        uid = "";
      }

      const docRef = doc(db, "users", uid);
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
          bankingNumber,
        } = docSnap.data();

        // 📍 불러온 데이터 전역 상태로 관리 => 로그아웃 하면 초기화시키기
        setMemberData({
          name: name,
          accountNumber: accountNumber,
          totalPrice: totalPrice,
          accountList: accountList,
          expectSpending: expectSpending,
          expectIncome: expectIncome,
          accountBookList: accountBookList,
          bankingNumber: bankingNumber,
        });

        setLoading(false);
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

  return (
    <>
      {loading ? <Spinner /> : ""}
      <Container>
        <MemberSideNav />
        <Box>
          {clickNav === "account" ? (
            <MemberAccount />
          ) : clickNav === "accountBook" ? (
            <MemberAccountBook />
          ) : clickNav === "chart" ? (
            <DateChart />
          ) : clickNav === "remit" ? (
            <Remit />
          ) : clickNav === "recharge" ? (
            <Recharge />
          ) : clickNav === "bankingNumber" ? (
            <BankingNumber />
          ) : clickNav === "categoryChart" ? (
            <CategoryChart />
          ) : (
            <MakeAccountBookList />
          )}
        </Box>
      </Container>
    </>
  );
};

export default MemberPage;
