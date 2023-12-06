import { z } from "zod";
import { zInputData } from "./JoinInputData.entity";

const zExpenditureDetails = z.object({
  category: z.string(),
  memo: z.string(),
  amount: z.number(),
});

export type ExpenditureDetails = z.infer<typeof zExpenditureDetails>;

const zNonmember = zInputData.pick({ name: true, accountNumber: true }).and(
  z.object({
    balance: z.number(),
    expenditureDetails: z.array(zExpenditureDetails),
  })
);

export type Nonmember = z.infer<typeof zNonmember>;
