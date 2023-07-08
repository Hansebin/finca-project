import { Nonmember } from "../typeModel/nonmember";

export const nonmember: Nonmember = {
  name: "홍길동",
  accountNumber: 123456789012,
  balance: 350000,
  expenditureDetails: [
    { category: "식사", memo: "점심식사", amount: 9500 },
    { category: "식사", memo: "저녁식사", amount: 7500 },
    { category: "여가", memo: "영화관", amount: 12000 },
  ],
};
