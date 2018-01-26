import React from "react";
import {connect} from "react-redux"
import {List, Badge} from "antd-mobile";

@connect(
    state => state
)

class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }

    render() {
        const Item = List.Item
        const Brief = Item.Brief
        //用户id
        const userid = this.props.user._id
        // 聊天用户信息
        const userinfo = this.props.chat.users
        // console.log(this.props)
        const msgGroup = {}
        //对输入的内容遍历
        this.props.chat.chatmsg.forEach(v => {
            // 是否有这个id，不是返回空数组
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        // console.log(msgGroup)
        //对消息排序
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        // 按照聊天用户分组，根据chatid
        return (
            <div>
                <List>
                    {chatList.map(v => {
                        // console.log(v)
                        // 聊天信息
                        const lastItem = this.getLast(v)
                        //v是数组
                        const targetId = v[0].from == userid ? v[0].to : v[0].from

                        // 未读
                        const unreadNum = v.filter(v => !v.read && v.to == userid).length

                        return (<Item
                            arrow="horizontal"
                            key={lastItem._id}
                            extra={<Badge text={unreadNum}></Badge>}
                            thumb={require(`../image/${userinfo[targetId].avatar}.jpg`)}
                            onClick={() => {
                                this.props.history.push(`/chat/${targetId}`)
                            }
                            }
                        >
                            {lastItem.content}
                            {/*获取用户名.*/}
                            <Brief>{userinfo[targetId].name}</Brief>
                        </Item>)
                    })}
                </List>
            </div>
        )
    }
}

export default Msg