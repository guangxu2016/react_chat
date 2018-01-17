/*
* @Author: Marte
* @Date:   2018-01-17 12:29:59
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-17 16:09:31
*/

import React from "react";
import PropTypes from "prop-types"
import {Grid,List} from "antd-mobile";

class AvatarSelect extends React.Component {

    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const avatarList = 'book,gou,jangshi,laoshu,mayi,niao,woman,wugui,xing,ying'
                            .split(",")
                            .map(v=>({
                                icon:require(`../image/${v}.jpg`),
                                text:v
                            }))
        const gridHeader = this.state.icon
                            ?(<div>
                                <span>已选择头像</span>
                                <img style={{width:35}} src={this.state.icon} alt="" />
                            </div>)
                            : "请选择头像"
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={4}
                        onClick={elm=>{
                            this.setState(elm)
                            console.log(this.setState(elm));
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelect