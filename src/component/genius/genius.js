/*
* @Author: Marte
* @Date:   2018-01-17 20:33:10
* @Last Modified by:   牛人页面
* @Last Modified time: 2018-01-17 22:21:17
*/

import React from "react";

import {connect} from "react-redux";

import {getUserList} from "../../redux/chatuser.redux.js";
import UserCard from "../../component/usercard/usercard.js";

@connect(
    state=>state.chatuser,
    {getUserList}
)

class Genius extends React.Component {

    componentDidMount() {
        // 查找数据
        this.props.getUserList("boss")
    }
    render() {

        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default Genius