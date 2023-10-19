import { combineReducers } from "@reduxjs/toolkit";
import getUser from "./getUser";
import login from "./login";


const rootReducers = combineReducers({
    getUser,
    login
})

export default rootReducers