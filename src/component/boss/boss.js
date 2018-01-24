/*
* @Author: Marte
* @Date:   2018-01-17 20:33:10
* @Last Modified by:   BOSS 页面
* @Last Modified time: 2018-01-17 22:21:17
*/

import React from "react";
// import {Card} from "antd-mobile";
import {connect} from "react-redux";

import {getUserList} from "../../redux/chatuser.redux.js";
import "./boss.css";
import UserCard from "../../component/usercard/usercard.js";

@connect(
    state=>state.chatuser,
    {getUserList}
)

class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        // 查找牛人数据
        this.props.getUserList("genius")
    }
    render() {
        // const Header = Card.Header
        // const Body = Card.Body
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default Boss