import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { loadData } from "../../redux/user.redux.js";

@withRouter
// 修饰器
@connect(
    null,
    {loadData}
)

class AuthRoute extends React.Component{
    componentDidMount() {
        const publicList = ["/login","/register"]
         // 当前页面
        const pathname = this.props.location.pathname
        console.log(pathname);
        if(publicList.indexOf(pathname)>-1) {
            return null
        }
        // 获取用户信息
        axios.get("/user/info")
            .then(res=>{
                if(res.status == 200) {
                    if(res.data.code == 0) {
                        // 有登录信息
                          this.props.loadData(res.data.data)
                    }else {
                        this.props.history.push("/login")
                        console.log(this.props.history);
                    }
                    console.log(res.data);

                }
            })
    }
    render() {
        return (
            null
        )
    }
}

export default AuthRoute