/**
 * 注册
 */
import React from "react";
import {List, InputItem, Radio, WhiteSpace, Button} from "antd-mobile";
import {Redirect} from "react-router-dom";

import Logo from "../../component/logo/logo.js"
import {connect} from "react-redux";

import {register} from "../../redux/user.redux.js";

@connect(
    state => state.user,
    // 判断输入是否正确register
    {register}
)

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            pwd: "",
            repeatpwd: "",
            type: "genius"
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleRegister() {
        // 当前页面
        // console.log(this.state);
        // console.log(this.props.state)
        this.props.register(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {/*判断页面*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <List>
                    {/*判断用户信息*/}
                    {this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
                    <InputItem
                        onChange={v => this.handleChange("user", v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.handleChange("pwd", v)}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.handleChange("repeatpwd", v)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type == "genius"}
                        onChange={() => this.handleChange("type", "genius")}
                    >
                        牛人
                    </RadioItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type == "boss"}
                        onChange={() => this.handleChange("type", "boss")}
                    >
                        BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type="primary"
                            onClick={this.handleRegister}>注册</Button>
                </List>

            </div>
        )
    }
}

export default Register