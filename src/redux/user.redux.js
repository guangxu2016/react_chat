import axios from "axios";

import {getRedirectPath} from "../util";

const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS";

const initState = {
    redirectTo:"",
    msg:"",
    user:"",
    type:""
}

// reducer

export function user(state=initState,action) {
   switch(action.type) {
        case AUTH_SUCCESS:
            return {...state,msg:"",redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        default:
            return state
   }
}
    // 注册
function authSuccess(obj) {
    const {pwd,...data} = obj
    return {type:AUTH_SUCCESS, payload:data}
}
    // 登录错误
function errorMsg(msg) {
    console.log(msg);
    return { msg, type:ERROR_MSG}
}

// 用户信息
export function loadData(userinfo) {
    return {type:LOAD_DATA,payload:userinfo}
}

// 更新
export function update(data) {
    return dispatch=>{
         axios.post("/user/update",data)
        .then(res=>{
            if(res.status==200&&res.data.code==0) {
                dispatch(authSuccess(res.data.data))
            }else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

    // 登录判断
export function login({user,pwd}) {
    if(!user||!pwd) {
        return errorMsg("用户名或密码必须输入")
    }
    return dispatch=>{
        axios.post("/user/login",{user,pwd})
        .then(res=>{
            if(res.status==200&&res.data.code==0) {
                {/*后端返回的data字段*/}
                dispatch(authSuccess(res.data.data))
            }else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
    // 注册判断
export function register({user,pwd,repeatpwd,type}) {
    if(!user||!pwd||!type) {
        return errorMsg("用户名或密码必须输入")
    }
    if(pwd!==repeatpwd) {
        return errorMsg("密码输入不同")
    }

    return dispatch=>{
        axios.post("/user/register",{user,pwd,type})
        .then(res=>{
            if(res.status==200&&res.data.code==0) {
                dispatch(authSuccess({user,pwd,type}))
            }else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}