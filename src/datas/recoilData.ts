import { atom } from "recoil";
import {
  InputData,
  InputDataIsValid,
  SocialJoinUserData,
  SocialInputDataIsValid,
} from "../entities/JoinInputData.entity";
import { Member, ClickNav } from "../entities/member.entity";
import { RemitInputValue } from "../entities/RemitInputData.entity";
import { RechargeInputValue } from "../entities/RechargeInputData.entity";
import { AccountInputValue } from "../entities/AccountInputData.entity";

// 1. 회원가입 전 회원 데이터 초기화
export const inputValueState = atom<InputData>({
  key: "inputValueState",
  default: {
    name: "",
    accountNumber: 0,
    bankingNumber: 0,
    id: "",
    password: "",
    totalPrice: 0,
    expectSpending: 0,
    expectIncome: 0,
    accountList: [],
    accountBookList: [],
  },
});

// 2-1. 유효성 검사 항목 - 일반 회원가입
export const IsValidState = atom<InputDataIsValid>({
  key: "isValidState",
  default: {
    name: false,
    accountNumber: false,
    bankingNumber: false,
    id: false,
    password: false,
  },
});

// 2-2. 유효성 검사 항목 - 소셜 로그인
export const SocialIsValidState = atom<SocialInputDataIsValid>({
  key: "SocialIsValidState",
  default: {
    accountNumber: false,
    bankingNumber: false,
  },
});

// 3. 소셜 로그인시 이름과 uid 가져오기
export const SocialLoginUserDataState = atom<SocialJoinUserData>({
  key: "SocialLoginUserDataState",
  default: {
    name: "",
    userUID: "",
  },
});

// 4. 로그인 후 회원 페이지에서 가져오는 회원 데이터 -> uid로 조회 후 set
export const MemberDataState = atom<Member>({
  key: "MemberDataState",
  default: {
    name: "미리보기",
    accountNumber: 0,
    totalPrice: 0,
    accountList: [],
    expectSpending: 0,
    expectIncome: 0,
    accountBookList: [],
    bankingNumber: 0,
  },
});

// 5. 메뉴 클릭 상태
export const ClickNavState = atom<ClickNav>({
  key: "ClickNavState",
  default: "account",
  // "account"
  // "bankingNum"
});

// 6. 로딩 상태
export const LoadingState = atom<boolean | null>({
  key: "LoadingState",
  default: null,
});

// 7. 송금하기 카테고리 클릭 상태
export const ClickCategoryState = atom<string>({
  key: "ClickCategoryState",
  default: "미선택",
});

// 8. modal state
export const ClickModalState = atom({
  key: "ClickModalState",
  default: {
    state: false,
    text: "",
  },
});

// 9. remitInputValueState
export const remitInputValueState = atom<RemitInputValue>({
  key: "remitInputValueState",
  default: {
    remitAccountNumber: "",
    remitPrice: "",
    remitMemo: "",
    category: "",
  },
});

// 10. rechargeInputValueState
export const rechargeInputValueState = atom<RechargeInputValue>({
  key: "rechargeInputValueState",
  default: {
    remitAccountNumber: "",
    remitPrice: "",
  },
});

// 11. remit vs recharge
export const remitOrRecharge = atom<string>({
  key: "remitOrRecharge",
  default: "",
});

// 12. accountBookInputValueState
export const accountBookInputValueState = atom<AccountInputValue>({
  key: "accountBookInputValueState",
  default: {
    accountBookDate: "",
    accountBookPrice: "",
    accountBookMemo: "",
    category: "",
    accountBookType: "",
  },
});

// 13. 송금하기 카테고리 클릭 상태
export const ClickTypeState = atom<string>({
  key: "ClickTypeState",
  default: "미선택",
});
