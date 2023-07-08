import { Nonmember } from "../typeModel/nonmember";

export const nonmember: Nonmember = {
  name: "홍길동",
  accountNumber: 123456789012,
  balance: 350000,
  expenditureDetails: [
    { category: "meal", memo: "점심식사", amount: 9500 },
    { category: "meal", memo: "저녁식사", amount: 7500 },
    { category: "hobby", memo: "영화관", amount: 12000 },
  ],
};
