import React from "react";
import {List,InputItem,WingBlank,WhiteSpace,Button} from "antd-mobile";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";

import Logo from "../../component/logo/logo.js";
import {login} from "../../redux/user.redux.js";
import imoocFrom from "../../component/imooc-from/imooc-from.js";

@connect(
    state=>state.user,
    {login}
)
@imoocFrom
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register() {
        console.log(this.props);
        this.props.history.push("/register")
    }

    handleLogin() {
        this.props.login(this.props.state)
    }

    render() {
        return (
           <div>
               {/*判断是不是当前页面，不是返回null*/}
                {this.props.redirectTo&&this.props.redirectTo!="/login"? <Redirect to={this.props.redirectTo} />:null}
             <Logo></Logo>
            <h2>我是登录页</h2>
            <WingBlank>
                <List>
                    {this.props.msg?<p className="err-msg">{this.props.msg}</p>:null}
                    <InputItem
                        onChange = {v=>this.props.handleChange("user",v)}
                    >用户</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type="password"
                        onChange = {v=>this.props.handleChange("pwd",v)}
                    >密码</InputItem>
                </List>
                <Button type="primary"
                    onClick = {this.handleLogin}
                >登录</Button>
                <WhiteSpace />
                <Button onClick={this.register} type="primary">注册</Button>
            </WingBlank>
           </div>
        )
    }
}
export default Login