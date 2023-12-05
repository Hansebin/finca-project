export interface AccountDetail {
  category: string;
  memo: string;
  price: number;
  date: string;
}

export type AccountBookDetail = AccountDetail & {
  accountBookType: string;
};

export interface InputData {
  name: string;
  accountNumber: number;
  bankingNumber: number;
  id: string;
  password: string;
  totalPrice: number;
  expectSpending: number;
  expectIncome: number;
  accountList: AccountDetail[];
  accountBookList: AccountBookDetail[];
}

export type InputDataWithoutDetails = Omit<
  InputData,
  "accountList" | "accountBookList"
>;

export interface InputDataIsValid {
  name: boolean;
  accountNumber: boolean;
  bankingNumber: boolean;
  id: boolean;
  password: boolean;
}

export type SocialInputDataIsValid = Pick<
  InputDataIsValid,
  "accountNumber" | "bankingNumber"
>;

export interface SocialJoinUserData {
  name: string | null;
  userUID: string;
}
