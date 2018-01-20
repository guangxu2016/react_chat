import React from "react";
import {connect} from "react-redux"
import {List} from "antd-mobile";

@connect(
    state=>state
)

class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length-1]
    }

    render() {
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        // console.log(this.props)
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            // 判断是否相同，不是返回空数组
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        console.log(msgGroup)

        const chatList = Object.values(msgGroup)
        // 按照聊天用户分组，根据chatid
        return (
         <div>
             <List>
                 {chatList.map(v=>{
                     // console.log(v)
                     const lastItem = this.getLast(v)
                     const targetId = v[0].from==userid?v[0].to:v[0].from
                     const name = userinfo[targetId]?userinfo[targetId].name:""
                     const avatar = userinfo[targetId]?userinfo[targetId].avatar:""

                     return(<Item
                                key={lastItem._id}
                                thumb={require(`../image/${userinfo[targetId].avatar}.jpg`)}
                            >
                             {lastItem.content}
                         <Brief>{userinfo[targetId].name}</Brief>
                     </Item>)
                 })}
             </List>
         </div>
        )
    }
}

export default Msg