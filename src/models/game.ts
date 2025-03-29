import { Player } from "./player";

export type GameStatus = "waiting" | "in-progress" | "completed";

export type Game = {
  id: string;
  status: GameStatus;
  players: Player[];
  totalRounds: number;
  currentRound: number;
  maxPlayers: number;
  createdAt: number;
};
