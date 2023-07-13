import { AccountDetail, AccountBookDetail } from "./JoinInputData";

export type Member = {
  name: string;
  accountNumber: number;
  totalPrice: number;
  accountList: AccountDetail[];
  expectSpending: number;
  expectIncome: number;
  accountBookList: AccountBookDetail[];
};

export type ClickNav = string;
