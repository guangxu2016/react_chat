/*
* @Author: Marte
* @Date:   2018-01-17 16:27:14
* @Last Modified by:   BOSS/牛人公用页面
* @Last Modified time: 2018-01-17 20:35:07
*/

import React from "react";
import {NavBar} from "antd-mobile";
import {connect} from "react-redux";
import {Switch,Route} from "react-router-dom";

import NavLinkBar from "../navlink/navlink.js";
import Boss from "../../component/boss/boss.js";
import Genius from "../../component/genius/genius.js";
import User from "../../component/user/user.js";

function Msg() {
    return <h2>消息首页</h2>
}

@connect(
    state=>state
)

class Dashboard extends React.Component {

    render() {
        const {pathname} = this.props.location
        const user = this.props.user

        const navList = [
            {
                path:"/boss",
                text:"牛人",
                icon:"boss",
                title:"牛人列表",
                component:Boss,
                hide:user.type=="genius"
            },
            {
                path:"/genius",
                text:"boss",
                icon:"job",
                title:"BOSS列表",
                component:Genius,
                hide:user.type=="boss"
            },
            {
                path:"/msg",
                text:"消息",
                icon:"msg",
                title:"消息列表",
                component:Msg
            },
            {
                path:"/me",
                text:"我",
                icon:"user",
                title:"个人中心",
                component:User
            }
        ]
        console.log(navList)
        return(

            <div>
                {/*如果页面相等就会匹配*/}

               <NavBar mode="dard">{navList.find(v=>v.path==pathname).title}</NavBar>
                <div className="content_top">
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard