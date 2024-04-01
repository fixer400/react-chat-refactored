import { configureStore } from "@reduxjs/toolkit";
import RoomDataReducer from "./features/roomData/roomData";
import LoginReducer from "./features/login/login";
import roomsListReducer from "./features/roomsList/roomsList";

export const store = configureStore({
  reducer: {
    room: RoomDataReducer,
    login: LoginReducer,
    roomsList: roomsListReducer,
  },
});
