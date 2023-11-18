import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isLoading: false,
  toastBar: {
    text: "NONE",
    isVisible: false,
  },
};
const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    uiUpdated: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { uiUpdated } = slice.actions;
export default slice.reducer;

export const getUILoading = (state) => state.ui.isLoading;
