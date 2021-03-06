/*
* @Author: Marte
* @Date:   2018-01-17 12:14:09
* @Last Modified by:  注册BOSS信息页面
* @Last Modified time: 2018-01-17 16:07:29
*/
import React from "react";
import {NavBar, InputItem, TextareaItem, Button} from "antd-mobile";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {update} from "../../redux/user.redux.js";
import AvatarSelect from "../../component/avatar-select/avatar-select.js";

@connect(
    state => state.user,
    {update}
)

class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            desc: "",
            company: "",
            money: ""
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        // 当前页面
        const path = this.props.location.pathname
        // console.log(path);
        //跳转到页面
        const redirect = this.props.redirectTo
        // console.log(redirect);
        return (
            <div>
                {/*判断跳转页面是否相同*/}
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">
                    BOSS完善信息页面
                </NavBar>
                {/*选择头像*/}
                <AvatarSelect
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}>
                </AvatarSelect>
                <InputItem onChange={v => this.onChange("title", v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={v => this.onChange("company", v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={v => this.onChange("money", v)}>
                    职位薪资
                </InputItem>
                <TextareaItem onChange={v => this.onChange("desc", v)}
                              rows={2}
                              autoHeight
                              title="职位要求"
                >
                </TextareaItem>
                <Button
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                    type="primary">保存</Button>
            </div>
        )
    }
}

export default BossInfo