import { combineReducers } from "@reduxjs/toolkit";
import getUser from "./getUser";
import login from "./login";
import getUserPost from "./getUserPost";


const rootReducers = combineReducers({
    getUser,
    login,
    getUserPost
})

export default rootReducers