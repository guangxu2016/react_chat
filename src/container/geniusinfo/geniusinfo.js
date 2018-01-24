/*
* @Author: Marte
* @Date:   2018-01-17 12:14:09
* @Last Modified by:  注册牛人信息页面
* @Last Modified time: 2018-01-17 21:33:04
*/
import React from "react";
import {NavBar,InputItem,TextareaItem,Button} from "antd-mobile";
import {connect} from "react-redux";
import {update} from "../../redux/user.redux.js";
import {Redirect} from "react-router-dom";

import AvatarSelect from "../../component/avatar-select/avatar-select.js";

@connect (
    state=>state.user,
    {update}
)

class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"",
            desc:""
        }
    }
    onChange(key,val) {
        this.setState({
            [key] :val
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect>:null}
                 <NavBar mode="dark">牛人完善信息页面
                 </NavBar>
             {/*选择头像*/}
                 <AvatarSelect
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}>
                 </AvatarSelect>
                 <InputItem onChange={(v)=>this.onChange("title",v)}>
                    求职岗位
                 </InputItem>

                 <TextareaItem onChange={(v)=>this.onChange("desc",v)}
                 rows={2}
                 autoHeight
                 title="个人简介"
                 >

                 </TextareaItem>
                 <Button
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                 type="primary">保存</Button>
            </div>
        )
    }
}

export default GeniusInfo