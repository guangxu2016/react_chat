/*
* @Author: Marte
* @Date:   2018-01-17 18:52:07
* @Last Modified by:  boss、牛人底部组件连接
* @Last Modified time: 2018-01-17 21:16:29
*/

import React from "react";
import PropTypes from "prop-types";
import {TabBar} from "antd-mobile";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

@withRouter
@connect(
    state=>state.chat
)

class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        //过滤隐藏信息
        const navList = this.props.data.filter(v => !v.hide)

        const {pathname} = this.props.location
        console.log(navList);
        return (
            <TabBar className="tab_bar">
                {navList.map(v => (
                    <TabBar.Item
                        //判断消息是否未读
                        badge={v.path=="/msg"?this.props.unread:""}
                        className="tab_bar"
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./image/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./image/${v.icon}-active.png`)}}
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    >

                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar