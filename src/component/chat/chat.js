import React from "react";
import {List, InputItem, NavBar, Icon, Grid} from "antd-mobile";
import {connect} from "react-redux";
// css动画
import QueueAnim from "rc-queue-anim";
// import io from "socket.io-client";


import {getMsgList, sendMsg, recvMsg, readMsg} from "../../redux/chat.redux.js";
import {getChatId} from "../../util.js";

// const socket = io("ws://localhost:9093");

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg, readMsg}
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
        if (!this.props.chat.chatmsg.length) {
            // 获取所有信息列表
            this.props.getMsgList()
            // 接受信息
            this.props.recvMsg()
        }
        console.log(this.props)

    }

    //在当前页面，收到消息不会提示未读
    componentWillUnmount() {
        // 获取聊天用户
        const to = this.props.match.params.user
        //to和谁聊天
        this.props.readMsg(to)
        console.log(this.props)
    }

    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event("resize"))
        }, 0)
    }

    handleSubmit() {
        // console.log(this.state)
        // socket.emit("sendmsg", {text: this.state.text})
        // this.setState({text: ""})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg(from, to, msg)
        this.setState({
            text: "",
            showEmoji: false
        })
    }

    render() {
        const emoji = "😄 😃 😀 😊 ☺ 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟"
            .split(" ")
            .filter(v => v)
            .map(v => ({text: v}))

        // console.log(this.props)
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        // 过滤用户信息
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid)

        return (
            <div className="chat-page">
                <NavBar
                    icon={<Icon type="left"/>}
                    mode="dark"
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                    {/*{userid}*/}
                </NavBar>

                <QueueAnim
                    type="scale"
                    delay={100}
                    interval={300}
                    leaveReverse={true}
                >
                {chatmsgs.map(v => {
                    const avatar = require(`../image/${users[v.from].avatar}.jpg`)
                    return v.from == userid ? (
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >
                                {v.content}
                            </Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                                extra={<img alt="头像" src={avatar}/>}
                                className={"chat-me"}
                            >
                                {v.content}
                            </Item>
                        </List>
                    )
                })}

                </QueueAnim>

                <div className="stick-footer">
                    <List className="chat-footer">
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                    <span
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                            this.fixCarousel()
                                        }}
                                        style={{marginRight: 15}}
                                    >😊</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        >
                            信息
                        </InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                            console.log(el)
                        }}
                    /> : null}

                </div>

            </div>
        )
    }
}

export default Chat
