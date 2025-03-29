export type User = {
  id: string;
  username: string;
  avatar?: string;
  status: "online" | "offline" | "in-game";
  rating: number; // ELO-style rating system
  totalGamesPlayed: number;
  gamesWon: number;
  experienceLevel: number; // Based on games played & won
  createdAt: number;
};

