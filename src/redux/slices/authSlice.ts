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
            return action.payload.data
        }).addMatcher(loginApi.endpoints.login.matchFulfilled, (state, action) => {
            return {
                "token": action.payload.data.token, 
                "username" : action.meta.arg.originalArgs.username
            }
        })
    },
});

export default authSlice.reducer
//export const { setAuth } = loginSlice.actions