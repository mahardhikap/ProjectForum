import { combineReducers } from "@reduxjs/toolkit";
import getUser from "./getUser";
import login from "./login";
import getUserPost from "./getUserPost";
import getDetailArticle from "./getDetailArticle";


const rootReducers = combineReducers({
    getUser,
    login,
    getUserPost,
    getDetailArticle
})

export default rootReducers