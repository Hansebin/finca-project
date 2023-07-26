import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  MemberDataState,
  ClickCategoryState,
  accountBookInputValueState,
  ClickTypeState,
  ClickModalState,
} from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";
import { AccountInputValue } from "../../../typeModel/AccountInputData";
import {
  db,
  query,
  where,
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "../../../firebase";
import Modal from "../../modalComponent/Modal";

interface buttonProps {
  active: boolean;
}

// styled-components
const InputTitle = styled.p`
  font-size: 20px;
  color: #36338c;
  font-weight: 700;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
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

  @media screen and (max-width: 500px) {
    font-size: 15px;
    width: 170px;
  }
`;

const CategoryButton = styled.div<buttonProps>`
  background-color: ${(props) => (props.active ? "#36338C" : "#7966e4")};

  @media screen and (max-width: 500px) {
    padding: 5px 20px;
  }
`;

const TypeButton = styled.div<buttonProps>`
  font-size: 20px;
  font-weight: 700;

  background-color: ${(props) => (props.active ? "#36338C" : "#f1f4fd")};
  color: ${(props) => (props.active ? "white" : "#7966e4")};

  padding: 10px 55px;
  border-radius: 40px;

  cursor: pointer;

  @media screen and (max-width: 500px) {
    padding: 7px 30px;
  }
`;

const ActiveButton = styled.button`
  width: 100%;
  height: 70px;

  background-color: #7966e4;
  color: white;

  font-weight: 700;
  font-size: 30px;

  border-radius: 10px;

  margin-top: 40px;
`;

const InactiveButton = styled.button`
  width: 100%;
  height: 70px;

  background-color: #e8e8e8;
  color: white;

  font-weight: 700;
  font-size: 30px;

  border-radius: 10px;

  margin-top: 40px;
`;
// styled-components

const MakeAccountBookList: React.FC = () => {
  const [clickModal, setClickModal] = useRecoilState(ClickModalState);
  const [memberData] = useRecoilState<Member>(MemberDataState);

  const [accountBookValue, setAccountBookValue] =
    useRecoilState<AccountInputValue>(accountBookInputValueState);

  // click category
  const [ClickCategory, setClickCategory] =
    useRecoilState<string>(ClickCategoryState);

  const handleCategoryClick = (name: string) => {
    setClickCategory(name);
  };

  // click type
  const [ClickType, setClickType] = useRecoilState<string>(ClickTypeState);

  const handleTypeClick = (name: string) => {
    setClickType(name);
  };

  // const 입력값 전달 받고 저장할 데이터 형식 생성하는 함수 = () => {}
  // accountBookInputValue = 사용자에게 입력 받은 가계부 데이터
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountBookValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleCategorySelection = (category: string) => {
    setAccountBookValue((prevInputValues) => ({
      ...prevInputValues,
      category: category,
    }));
  };

  const handleTypeSelection = (accountbookType: string) => {
    setAccountBookValue((prevInputValues) => ({
      ...prevInputValues,
      accountbookType: accountbookType,
    }));
  };

  // 모든 항목 입력/선택했는지
  const isAnyValueEmpty = Object.values(accountBookValue).some(
    (value) => value === ""
  );

  // input창 초기화
  const clearInput = () => {
    setAccountBookValue({
      accountBookDate: "",
      accountBookPrice: "",
      accountBookMemo: "",
      category: "",
      accountbookType: "",
    });
    handleCategoryClick("미선택");
  };

  // const 데이터 저장하기 함수 = () => {}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const { accountBookList } = docSnap.data();

      await updateDoc(docRef, {
        accountBookList: [
          ...accountBookList,
          {
            category: accountBookValue.category,
            accountbookType: accountBookValue.accountbookType,
            memo: accountBookValue.accountBookMemo,
            price: accountBookValue.accountBookPrice,
            date: accountBookValue.accountBookDate,
          },
        ],
      });
    } else {
      return console.log("No such document!");
    }

    clearInput();
    setClickModal({ state: true, text: "완료!" });
    location.reload();
  };

  return (
    <>
      <Modal />
      <p className="text-4xl font-medium text-re-color-003 mb-10">
        가계부 작성하기
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7">
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>날짜 입력</InputTitle>
            <Input
              required
              autoComplete="off"
              placeholder="YYYY-MM-DD 형식 권장"
              name="accountBookDate"
              value={accountBookValue.accountBookDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>금액</InputTitle>
            <Input
              required
              autoComplete="off"
              name="accountBookPrice"
              value={accountBookValue.accountBookPrice}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center bg-re-color-001 w-full h-13 rounded-lg p-3">
            <InputTitle>메모</InputTitle>
            <Input
              required
              autoComplete="off"
              name="accountBookMemo"
              value={accountBookValue.accountBookMemo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-re-color-003 mt-6 mb-4">
            카데고리 선택
          </p>
          <div className="flex flex-row justify-between">
            <CategoryButton
              className="py-1.5 px-6 text-white rounded-full font-bold cursor-pointer"
              active={ClickCategory === "식사"}
              onClick={() => {
                handleCategorySelection("식사");
                handleCategoryClick("식사");
              }}
            >
              식사
            </CategoryButton>
            <CategoryButton
              className="py-1.5 px-6 text-white rounded-full font-bold cursor-pointer"
              active={ClickCategory === "여가"}
              onClick={() => {
                handleCategorySelection("여가");
                handleCategoryClick("여가");
              }}
            >
              여가
            </CategoryButton>
            <CategoryButton
              className="py-1.5 px-6 text-white rounded-full font-bold cursor-pointer"
              active={ClickCategory === "쇼핑"}
              onClick={() => {
                handleCategorySelection("쇼핑");
                handleCategoryClick("쇼핑");
              }}
            >
              쇼핑
            </CategoryButton>
            <CategoryButton
              className="py-1.5 px-6 bg-re-color-002 text-white rounded-full font-bold cursor-pointer"
              active={ClickCategory === "기타"}
              onClick={() => {
                handleCategorySelection("기타");
                handleCategoryClick("기타");
              }}
            >
              기타
            </CategoryButton>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-4 gap-3">
          <TypeButton
            active={ClickType === "지출"}
            onClick={() => {
              handleTypeSelection("지출");
              handleTypeClick("지출");
            }}
          >
            지출
          </TypeButton>
          <TypeButton
            active={ClickType === "수입"}
            onClick={() => {
              handleTypeSelection("수입");
              handleTypeClick("수입");
            }}
          >
            수입
          </TypeButton>
        </div>
        {isAnyValueEmpty ? (
          <InactiveButton disabled>작성하기</InactiveButton>
        ) : (
          <ActiveButton>작성하기</ActiveButton>
        )}
      </form>
    </>
  );
};

export default MakeAccountBookList;
