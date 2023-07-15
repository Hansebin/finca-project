export type AccountDetail = {
  category: string;
  memo: string;
  price: number;
  date: string;
};

export type AccountBookDetail = {
  category: string;
  memo: string;
  price: number;
  date: string;
};

export type InputData = {
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
};

// InputData -> Omit
export type InputDataWithoutDetails = Omit<
  InputData,
  "accountList" | "accountBookList"
>;

export type InputDataIsValid = {
  name: boolean;
  accountNumber: boolean;
  bankingNumber: boolean;
  id: boolean;
  password: boolean;
};

export type SocialInputDataIsValid = {
  accountNumber: boolean;
  bankingNumber: boolean;
};

export type SocialJoinUserData = {
  name: string | null;
  userUID: string;
};
