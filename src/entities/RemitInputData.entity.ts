import { z } from "zod";

export const zRemitInputValue = z.object({
  remitAccountNumber: z.union([z.number(), z.string()]),
  remitPrice: z.union([z.number(), z.string()]),
  remitMemo: z.string(),
  category: z.string(),
});

export type RemitInputValue = z.infer<typeof zRemitInputValue>;
