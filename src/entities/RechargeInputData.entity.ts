import { z } from "zod";
import { zRemitInputValue } from "./RemitInputData.entity";

const zRechargeInputValue = zRemitInputValue.pick({
  remitAccountNumber: true,
  remitPrice: true,
});

export type RechargeInputValue = z.infer<typeof zRechargeInputValue>;
