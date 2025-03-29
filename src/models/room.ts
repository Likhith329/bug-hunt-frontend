import { Player } from "./player";
import { Game } from "./game";
import { ChatMessage } from "./chat";

export type Room = {
  id: string;
  hostId: string;
  players: Player[];
  game?: Game;
  chatHistory: ChatMessage[];
};
