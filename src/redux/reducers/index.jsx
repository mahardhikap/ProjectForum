import { combineReducers } from "@reduxjs/toolkit";
import getUser from "./getUser";
import login from "./login";
import getUserPost from "./getUserPost";
import getDetailArticle from "./getDetailArticle";
import deleteArticle from "./deleteArticle";


const rootReducers = combineReducers({
    getUser,
    login,
    getUserPost,
    getDetailArticle,
    deleteArticle
})

export default rootReducers