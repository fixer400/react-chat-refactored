import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomName: "",
  users: [],
  messages: [],
};

export const roomDataSlice = createSlice({
  name: "roomData",
  initialState,
  reducers: {
    setRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setRoomName, setUsers, setMessages } = roomDataSlice.actions;
export default roomDataSlice.reducer;
