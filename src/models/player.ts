import { User } from "./user";

export type Player = {
  user: User;
  isHost: boolean;
  score: number;
};
