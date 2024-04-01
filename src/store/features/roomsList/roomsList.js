import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
};

export const roomsListSlice = createSlice({
  name: "roomsList",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const { setRooms } = roomsListSlice.actions;
export default roomsListSlice.reducer;
