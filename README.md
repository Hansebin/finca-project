# Project Name

내 손 안의 작은 뱅크 - 핀커 : Finca
[ 👉🏻 서비스 이용하기](https://finca-project.vercel.app/)

- 송금 및 충전과 지출 차트, 간단한 가계부 작성으로 효율적인 소비 습관을 만들 수 있도록 도와주는 핀테크 서비스

## Installation

1. Clone this repo by running https://github.com/Hansebin/front-project
2. npm install
3. npm run dev

## Project Doc

### Built With

| package name | version |
| ------------ | ------- |
| React        | 18.2.0  |
| typescript   | ^5.0.2  |
| vite         | ^4.3.9  |

_자세한 개발 스택은 package.json 참고_

### Pages

1. `pages/StartPage.tsx`: 시작 페이지(로그인 전 메인)
2. `pages/LoginPage.tsx`: 로그지 페이지
3. `JoinPage.tsx`: 회원가입 패이지
4. `SocialJoinPage.tsx`: 소셜 로그인 회원가입 페이지
5. `MemberPage.tsx`: 회원 페이지(로그인 후 매인)
   ...

### Configurations

해당 서비스는 총 5개의 페이지로 구성되어 있습니다.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MemberPage from "./pages/MemberPage";
import SocialJoinPage from "./pages/SocialJoinPage";

const App: React.FC = () => {
  return (
    <>
      <div className="bg-bg-color min-w-full min-h-screen">
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StartPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/join" element={<JoinPage />}></Route>
              <Route
                path="/login/makeAccount"
                element={<SocialJoinPage />}
              ></Route>
              <Route path="/memberPage" element={<MemberPage />}></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </div>
    </>
  );
};

export default App;
```

첫 시작 페이지에서는 해당 서비스의 회원 페이지를 미리보여줌으로써 전체적인 서비스 뷰를 비회원 사용자에게 제공합니다.

- 이때, 첫 시작 페이지는 비회원에게 보여지는 페이지임으로 보내기, 충전하기 등의 기능을 사용할 수 없으며 메뉴바 선택도 불가합니다.

```jsx
const AccountMainArea: React.FC = () => {
  return (
    <>
      <Box>
        <div>
          <p className="text-xl font-bold text-gray-002">
            계좌 {accountNumber}
          </p>
          <p className="text-3xl font-bold text-re-color-004">{name}</p>
        </div>
        <p className="text-2xl font-bold text-re-color-004 mt-7">
          잔액{" "}
          <span className="text-re-color-002">
            {balance.toLocaleString()}원
          </span>
        </p>
        <div className="flex flex-row gap-x-4 mt-5">
          <button className="basis-1/2 h-10 bg-re-color-001 rounded-md text-xl font-bold text-re-color-004">
            송금
          </button>
          <button className="basis-1/2 h-10 bg-re-color-001 rounded-md text-xl font-bold text-re-color-004">
            충전
          </button>
        </div>
        <StartPageAccountDetails />
        <MoveButton page="로그인" to="/login" />
      </Box>
    </>
  );
};
```

로그인 페이지에서는 이메일 형식의 아이디와 비밀번호가 회원가입에 사용한 아이디 / 비밀번호와 일치하는지 검사합니다.
만약, 일치하지 않는다면 modal로 로그인 에러 메시지를 보여줍니다.

```jsx
const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const data = await signInWithEmailAndPassword(auth, emailId, password);
    const userUID = data.user.uid;
    const loginData = { id: emailId, uid: userUID };
    sessionStorage.setItem("loginData", JSON.stringify(loginData));
    navigate(`/memberPage`);
  } catch (error) {
    setClickModal({
      state: true,
      text: "유효하지 않은 아이디와 비밀번호 입니다. 다시 입력해주세요!",
    });
    setEmailId("");
    setPassword("");
    console.log(error);
  }
};
```

정규 표현식을 사용하여 회원가입 입력 폼에 대한 유효성 검사를 진행합니다.

1. 이름이 한글과 영어로만 구성되어 있는가?
2. 계좌번호가 12자리 숫자로 구성되어 있는가?
3. 뱅킹 번호가 6자리 숫자로 구성되어 있는가?
4. 이메일 아이디가 영어와 숫자로 구성되어 있으며 이메일 형식인가?
5. 비밀번호가 숫자와 특수문자로만 구성되어 있는가?

```jsx
const isValidName = (name: string) => {
  const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
  return regex.test(name);
};

const isValidAccountNumber = (accountNumber: string) => {
  const regex = /^\d{12}$/;
  return regex.test(accountNumber);
};

const isValidBankingNumber = (bankingNumber: string) => {
  const regex = /^\d{6}$/;
  return regex.test(bankingNumber);
};

const isValidEmail = (id: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(id);
};

const isValidPassword = (password: string) => {
  const regex = /^[\d\W]+$/;
  return regex.test(password);
};
```

로그인 성공 후 회원 페이지 있는 송금하기(보내기) 기능을 사용할 수 았개 된다.
만약, 송금하고자 하는 계좌의 잔액이 충분하고 받는 계좌가 회원 데이터에 존재하는 올바른 계좌 번호라면 6자리 비밀번호를 입력하는 뱅킹 페이지로 넘어가고 그렇지 않으면 modal를 통해서 어떤 에러가 발생핬는지 사용하게 보여준다.

... 채우기 기능 역시 보내기 기능과 동일 ... -> 코드는 생략

```jsx
// const 송금하기 함수 = () => {}
const handleSubmit = async (e: React.FormEvent) => {
  // 제출과 동시에 계좌와 잔액 확인
  e.preventDefault();

  const [isExistAccountNumber, isEnoughPrice] = await Promise.all([
    existAccountNumber(),
    enoughPrice(),
  ]);

  if (isExistAccountNumber) {
    if (isEnoughPrice) {
      setRemitOrRechargeState("remit");
      setClickNav("bankingNumber");
    } else {
      setClickModal({
        state: true,
        text: "잔액이 부족해 송금이 불가능합니다.",
      });
      clearInput();
    }
  } else {
    setClickModal({
      state: true,
      text: "존재하지 않는 계좌번호입니다. 올바른 계좌번호를 입력해주세요.",
    });
    clearInput();
  }
};
```

차트 페이지에서 기간별 지출 비율과 카테고리별 지출 비율을 차트를 통해 확인할 수 있다.
해당 차트의 경우 chartjs 라이브러리를 사용했으며 기간별 차트의 경우 막대 그래프를, 카테고리별 차트의 경우 도넛형 그래프를 사용하여 차트별 특성을 살리기 위해 적절한 그래프를 선택하고자 했다.

... 기간별 차트 역시 카테고리별 차트와 동일 ... -> 코드는 생략

```jsx
import React from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChartComponent: React.FC = () => {
  const [memberData] = useRecoilState < Member > MemberDataState;

  const setData = () => {
    const currentYear = new Date().getFullYear().toString();
    let totalPrice = 0;

    const currentYearArr = memberData.accountList.filter(
      (data) =>
        String(data.price).includes("-") && data.date.includes(currentYear)
    );

    currentYearArr.forEach((data) => (totalPrice += Math.abs(data.price)));

    return 100 / totalPrice;
  };

  const perOnePercent = setData();

  const getCategoryData = (category: string) => {
    let totalPrice = 0;
    const monthArr = memberData.accountList.filter(
      (data) =>
        data.category.includes(category) && String(data.price).includes("-")
    );

    monthArr.forEach(
      (data) => (totalPrice += Math.abs(Number(String(data.price).slice(1))))
    );

    return totalPrice * perOnePercent;
  };

  const data = {
    labels: ["식사", "여가", "쇼핑", "기타"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          getCategoryData("식사"),
          getCategoryData("여가"),
          getCategoryData("쇼핑"),
          getCategoryData("기타") + getCategoryData("충전"),
        ],
        backgroundColor: ["#3790F3", "#B4DD7F", "#EC5564", "#FFCA75"],
        borderColor: ["white"],
        borderWidth: 5,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default CategoryChartComponent;
```

## Information

- [project notion](https://notion.so/.../...)
  - [ 포함 항목 ]
  - 기획 배경
  - 와이어프레임
  - 태스크
  - 관련 기술 문서 등
- 프로젝트 진행 정보
  - 프로젝트 기간 : 2023.07.03 ~ 2023.07.28
  - 기관 : 제로베이스 프론트엔드 스쿨

## Author

- [Sebin Han(한세빈)](https://linkedin...)
