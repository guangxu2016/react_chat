import React from "react";
import {connect} from "react-redux";
import {Result, List, WhiteSpace, Modal} from "antd-mobile";
// import browserCookie from "browser-cookies";
import {Redirect} from "react-router-dom";

import {logoutSubmit} from "../../redux/user.redux.js";

import "./user.css";

@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert
        alert("注销", "确认 退出吗???", [
            {text: "取消", onPress: () => console.log("cancel")},
            {
                text: "确认", onPress: () => {
                    // browserCookie.erase("userid")
                    this.props.logoutSubmit()
                    //    强制刷新
                    // window.location.href = window.location.href
                }
            }
        ])
        // browserCookie.erase("userid")
        // console.log("logout")
    }

    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        console.log(this.props)
        return props.user ? (
            <div>
                <Result
                    className="width"
                    img={<img src={require(`../image/${props.avatar}.jpg`)} alt=""/>}
                    title={props.user}
                    message={props.type == "boss" ? props.company : null}
                />
                <List renderHeader={() => "简介"}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {this.props.desc.split("\n").map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资:{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo}/>
    }
}

export default User