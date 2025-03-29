import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeaderboardEntry } from "../../models/leaderboard";

type LeaderboardState = {
  rankings: LeaderboardEntry[];
};

const initialState: LeaderboardState = {
  rankings: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboard: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.rankings = action.payload;
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
