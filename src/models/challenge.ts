export type ChallengeDifficulty = "easy" | "medium" | "hard";

export type CodeChallenge = {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  difficulty: ChallengeDifficulty;
};
