import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    "email": "s.mohanprasath19478@gmail.com",
    "userId": "s_mohan_prasath"
}
const slice = createSlice({
    name: "auth",
    initialState, reducers: {
        authUpdated: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})
export const { authUpdated } = slice.actions
export default slice.reducer