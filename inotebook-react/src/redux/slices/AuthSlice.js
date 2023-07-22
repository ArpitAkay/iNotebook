import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    isAuthenticated: false,
    authToken: ""
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        updateAuth(state, action) {
            switch(action.payload.type) {
                case "LoggedIn" : 
                    state.username = action.payload.state.username;
                    state.isAuthenticated = true;
                    state.authToken = action.payload.state.authToken;
                    break;
                case "LoggedOut" :
                    state.username = "";
                    state.isAuthenticated = false;
                    state.authToken = action.payload.state.authToken;
                    break;
                default :
                    state = initialState;
            }
        }
    }
})

export const {updateAuth} = AuthSlice.actions;
export default AuthSlice.reducer;