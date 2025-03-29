// store/gameSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, GameStatus } from "../../models/game";

const initialState: Game = {
  id: "",
  status: "waiting",
  players: [],
  totalRounds: 5,
  currentRound: 1,
  maxPlayers: 4,
  createdAt: Date.now(),
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    updateGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    setGameData: (state, action: PayloadAction<Game>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateGameStatus, setGameData } = gameSlice.actions;
export default gameSlice.reducer;
