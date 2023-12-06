import { z } from "zod";

const zAccountInputValue = z.object({
  accountBookDate: z.union([z.number(), z.string()]),
  accountBookPrice: z.union([z.number(), z.string()]),
  accountBookMemo: z.string(),
  category: z.string(),
  accountBookType: z.string(),
});

export type AccountInputValue = z.infer<typeof zAccountInputValue>;
