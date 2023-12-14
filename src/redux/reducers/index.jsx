import { combineReducers } from "@reduxjs/toolkit";
import getUser from "./getUser";
import login from "./login";
import getUserPost from "./getUserPost";
import getDetailArticle from "./getDetailArticle";
import deleteArticle from "./deleteArticle";
import addArticle from "./addArticle";
import editArticle from "./editArticle";
import editProfile from "./editProfile";
import getUserByToken from "./getUserByToken";
import getAllPost from "./getAllPost";
import addBiodata from "./addBiodata";
import getBiodata from "./getBiodata";
import addPorto from "./addPorto";
import getPorto from "./getPorto";
import editPorto from "./editPorto";
import getDetailPorto from "./getDetailPorto";
import deletePorto from "./deletePorto";


const rootReducers = combineReducers({
    getUser,
    login,
    getUserPost,
    getDetailArticle,
    deleteArticle,
    addArticle,
    editArticle,
    editProfile,
    getUserByToken,
    getAllPost,
    addBiodata,
    getBiodata,
    addPorto,
    getPorto,
    editPorto,
    getDetailPorto,
    deletePorto
})

export default rootReducers