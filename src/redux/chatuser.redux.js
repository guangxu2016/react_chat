/*
* @Author: Marte
* @Date:   2018-01-17 22:00:58
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-17 22:17:51
*/
import axios from "axios";
const USER_LIST = "USER_LIST";

const initState = {
    userlist:[]
}

export function chatuser(state=initState,action) {
    switch(action.type) {
        case USER_LIST:
            return {...state,userlist:action.payload}
        default:
            return state
    }
}


function userList(data) {
    return {type:USER_LIST,payload:data}
}

// 发送请求，查找数据
export function getUserList(type) {
    return dispatch=>{
        axios.get("/user/list?type="+type)
        .then(res=>{
            if(res.data.code==0) {
                dispatch(userList(res.data.data))
            }
        })
    }
}