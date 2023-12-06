import { z } from "zod";

const zAccountDetail = z.object({
  category: z.string(),
  memo: z.string(),
  price: z.number(),
  date: z.string(),
});

export type AccountDetail = z.infer<typeof zAccountDetail>;

const zAccountBookDetail = zAccountDetail.extend({
  accountBookType: z.string(),
});

export type AccountBookDetail = z.infer<typeof zAccountBookDetail>;

export const zInputData = z.object({
  name: z.string(),
  accountNumber: z.number(),
  bankingNumber: z.number(),
  id: z.string(),
  password: z.string(),
  totalPrice: z.number(),
  expectSpending: z.number(),
  expectIncome: z.number(),
  accountList: z.array(zAccountDetail),
  accountBookList: z.array(zAccountBookDetail),
});

export type InputData = z.infer<typeof zInputData>;

const zInputDataWithoutDetails = zInputData.omit({
  accountList: true,
  accountBookList: true,
});

export type InputDataWithoutDetails = z.infer<typeof zInputDataWithoutDetails>;

const zInputDataIsValid = z.object({
  name: z.boolean(),
  accountNumber: z.boolean(),
  bankingNumber: z.boolean(),
  id: z.boolean(),
  password: z.boolean(),
});

export type InputDataIsValid = z.infer<typeof zInputDataIsValid>;

const zSocialInputDataIsValid = zInputDataIsValid.pick({
  accountNumber: true,
  bankingNumber: true,
});

export type SocialInputDataIsValid = z.infer<typeof zSocialInputDataIsValid>;

const zSocialJoinUserData = z.object({
  name: z.string().nullable(),
  userUID: z.string(),
});

export type SocialJoinUserData = z.infer<typeof zSocialJoinUserData>;
