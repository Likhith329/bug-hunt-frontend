import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "../../models/room";

type RoomState = {
  currentRoom: Room | null;
};

const initialState: RoomState = {
  currentRoom: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    joinRoom: (state, action: PayloadAction<Room>) => {
      state.currentRoom = action.payload;
    },
    leaveRoom: (state) => {
      state.currentRoom = null;
    },
  },
});

export const { joinRoom, leaveRoom } = roomSlice.actions;
export default roomSlice.reducer;
