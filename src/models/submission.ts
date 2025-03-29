export type Submission = {
  playerId: string;
  challengeId: string;
  submittedCode: string;
  isCorrect: boolean;
  executionTime: number;
  timestamp: number;
};
