export type Nonmember = {
  name: string;
  accountNumber: number;
  balance: number;
  expenditureDetails: ExpenditureDetails[];
};

export type ExpenditureDetails = {
  category: string;
  memo: string;
  amount: number;
};
