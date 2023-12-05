import { RemitInputValue } from "./RemitInputData";

export type RechargeInputValue = Pick<
  RemitInputValue,
  "remitAccountNumber" | "remitPrice"
>;
