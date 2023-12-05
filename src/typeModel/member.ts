import { InputData } from "./JoinInputData";

export type Member = Omit<InputData, "id" | "password">;

export type ClickNav = string;
