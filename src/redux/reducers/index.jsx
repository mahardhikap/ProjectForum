import { combineReducers } from "@reduxjs/toolkit";
import getUser from "./getUser";
import login from "./login";
import getUserPost from "./getUserPost";
import getDetailArticle from "./getDetailArticle";
import deleteArticle from "./deleteArticle";
import addArticle from "./addArticle";
import editArticle from "./editArticle";


const rootReducers = combineReducers({
    getUser,
    login,
    getUserPost,
    getDetailArticle,
    deleteArticle,
    addArticle,
    editArticle
})

export default rootReducers