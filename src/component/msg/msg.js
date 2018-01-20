import React from "react";
import {connect} from "react-redux"

@connect(
    state=>state
)

class Msg extends React.Component {
    render() {
        // console.log(this.props)
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            // 判断是否相同，不是返回空数组
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        console.log(msgGroup)
        // 按照聊天用户分组，根据chatid
        return (
         <div>消息页面</div>
        )
    }
}

export default Msg