import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice";
import roomReducer from "./slices/roomSlice";
import chatReducer from "./slices/chatSlice";
import leaderboardReducer from "./slices/leaderboardSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Manages user authentication & profile
    game: gameReducer, // Manages game state (active game, status)
    room: roomReducer, // Manages game rooms (joining, leaving)
    chat: chatReducer, // Handles chat messages
    leaderboard: leaderboardReducer, // Stores leaderboard rankings
  },
  devTools: true
});

// Infer types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
