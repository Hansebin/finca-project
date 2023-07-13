import { atom } from "recoil";
import { InputData, InputDataIsValid } from "../typeModel/JoinInputData";
import { Member, ClickNav } from "../typeModel/member";

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
  },
});

export const ClickNavState = atom<ClickNav>({
  key: "ClickNavState",
  default: "account",
});
