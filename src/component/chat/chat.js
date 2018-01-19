import React from "react";
import {List, InputItem,NavBar} from "antd-mobile";
import {connect} from "react-redux";
import io from "socket.io-client";

import {getMsgList,sendMsg,recvMsg} from "../../redux/chat.redux.js";

const socket = io("ws://localhost:9093");

@connect (
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            msg: []
        }
    }

    componentDidMount() {
       if(!this.props.chat.chatmsg.length) {
           this.props.getMsgList()
           this.props.recvMsg()
       }
    }

    handleSubmit() {
        // console.log(this.state)
        // socket.emit("sendmsg", {text: this.state.text})
        // this.setState({text: ""})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg(from,to,msg)
        this.setState({
            text:""
        })
    }

    render() {
        // console.log(this.props)
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        // if(!users[userid]) {
        //     return null
        // }
        return (
            <div className="chat-page">
                <NavBar mode="dark">
                    {/*{users[userid].name}*/}
                    {userid}
                </NavBar>

                {this.props.chat.chatmsg.map(v=>{
                    return v.from==userid?(
                        <List key={v._id}>
                            <Item
                                extra={"me"}
                            >
                                {v.content}
                            </Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item
                                extra={"avatar"}
                                className={"chat-me"}
                            >
                                {v.content}
                            </Item>
                        </List>
                    )
                })}
                <List className="chat-footer">
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={v => {
                            this.setState({text: v})
                        }}
                        extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                    >
                        信息
                    </InputItem>
                </List>
            </div>
        )
    }
}

export default Chat
