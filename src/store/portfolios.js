import { createSlice } from "@reduxjs/toolkit";
let initialState = {}
const slice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        uiUpdated: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})
export const { portfolioUpdated } = slice.actions
export default slice.reducer