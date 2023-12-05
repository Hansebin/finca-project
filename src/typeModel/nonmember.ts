import { InputData } from "./JoinInputData";

export interface ExpenditureDetails {
  category: string;
  memo: string;
  amount: number;
}

export type Nonmember = Pick<InputData, "name" | "accountNumber"> & {
  balance: number;
  expenditureDetails: ExpenditureDetails[];
};
