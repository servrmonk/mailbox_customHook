import { createSlice } from "@reduxjs/toolkit";

const initialAuthSlice = {
    isAuth:localStorage.getItem('idToken')||false
}
const authSlice = createSlice({
    name:"AuthSlice",
    initialState:initialAuthSlice,
    reducers:{
        logoutFun(state){
            localStorage.removeItem('idToken');
            localStorage.removeItem('email');
            state.isAuth = false;
        },
        loginFun(state,action){
            state.isAuth = action.payload
        }
    }
})
export const {logoutFun,loginFun} = authSlice.actions;
export default authSlice.reducer;