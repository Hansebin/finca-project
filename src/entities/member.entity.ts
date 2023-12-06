import { z } from "zod";
import { zInputData } from "./JoinInputData.entity";

const zMember = zInputData.omit({ id: true, password: true });

export type Member = z.infer<typeof zMember>;

const zClickNav = z.string();

export type ClickNav = z.infer<typeof zClickNav>;
