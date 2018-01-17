/*
* @Author: Marte
* @Date:   2018-01-17 20:33:10
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-17 22:21:17
*/

import React from "react";
import axios from "axios";
import {Card,whiteSpace,WingBlank} from "antd-mobile";
import {connect} from "react-redux";

import {getUserList} from "../../redux/chatuser.redux.js";

import "./boss.css";

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
        this.props.getUserList("genius")
    }
    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                {this.props.userlist.map(v=>(
                    v.avatar?(<Card key={v._id}>
                        <Header
                            className="genius"
                            title={v.user}
                            thumb={require(`../image/${v.avatar}.jpg`)}
                            extra={<span>{v.title}</span>}
                        ></Header>
                        <Body>
                            {v.desc.split("\n").map(v=>(
                                <div key={v}>{v}</div>
                            ))}
                        </Body>
                    </Card>):null
                ))}
            </WingBlank>

        )
    }
}

export default Boss