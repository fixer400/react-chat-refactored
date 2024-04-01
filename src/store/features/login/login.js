import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  userName: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setIsAuth, setUserName } = loginSlice.actions;
export default loginSlice.reducer;
