/*
* @Author: Marte
* @Date:   2018-01-17 16:27:14
* @Last Modified by:   BOSS/牛人/信息/我
* * @Last Modified time: 2018-01-17 20:35:07
*/

import React from "react";
import {NavBar} from "antd-mobile";
import {connect} from "react-redux";
import { Route,Redirect} from "react-router-dom";

import NavLinkBar from "../navlink/navlink.js";
import Boss from "../../component/boss/boss.js";
import Genius from "../../component/genius/genius.js";
import User from "../../component/user/user.js";
import Msg from "../msg/msg.js";
import {getMsgList, recvMsg} from "../../redux/chat.redux.js";
// css动画
import QueueAnim from "rc-queue-anim";

@connect(
    state => state,
    {getMsgList, recvMsg}
)

class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render() {
        // 当前路径this.props.location
        const {pathname} = this.props.location
        //当前用户
        const user = this.props.user

        const navList = [
            {
                path: "/boss",
                text: "牛人",
                icon: "boss",
                title: "牛人列表",
                component: Boss,
                hide: user.type == "genius"
            },
            {
                path: "/genius",
                text: "boss",
                icon: "job",
                title: "BOSS列表",
                component: Genius,
                hide: user.type == "boss"
            },
            {
                path: "/msg",
                text: "消息",
                icon: "msg",
                title: "消息列表",
                component: Msg
            },
            {
                path: "/me",
                text: "我",
                icon: "user",
                title: "个人中心",
                component: User
            }
        ]
        // console.log(navList)   当前页面
        const page = navList.find(v=>v.path==pathname)
        // console.log(page)
        // 让动画生效，只渲染一个Route，根据当前的爬虫决定组件
        return page?(

            <div>
                {/*如果页面相等就会匹配*/}
                                         {/*查找当前页面信息*/}
                <NavBar mode="dard">{page.title}</NavBar>
                <div className="content_top">
                    <QueueAnim
                        type="scaleX"
                        duration={800}
                    >
                        {/*路经*/}
                        <Route key={page.path} path={page.path} component={page.component}></Route>
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        ): <Redirect to="/msg"></Redirect>
    }
}

export default Dashboard