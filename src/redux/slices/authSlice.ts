import { createSlice } from "@reduxjs/toolkit";
import loginApi from "../../services/LoginService";

const initialState : LoginType = {
    username: "",
    password: "",
    tenant: "",
    token: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(loginApi.endpoints.signup.matchFulfilled, (state, action) => {
            console.log(state)
            console.log(action.payload)
            return action.payload.data
        })
    },
});

export default authSlice.reducer
//export const { setAuth } = loginSlice.actions