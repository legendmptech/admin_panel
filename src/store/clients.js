import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  currProps: {},
};
const slice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    clientUpdated: (state, action) => {
      return { ...state, ...action.payload };
    },
    clientPropsUpdated: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { clientUpdated, clientPropsUpdated } = slice.actions;
export default slice.reducer;
export const getClientProps = (state) => state.entities?.clients?.currProps;
