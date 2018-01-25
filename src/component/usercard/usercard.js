/**
 * boss 牛人
 */
import React from "react";
import PropTypes from "prop-types";
import {Card, WingBlank} from "antd-mobile";
import {withRouter} from "react-router-dom";

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    handleClick(v) {
        // v 用户的信息
        console.log(v)
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (

            <WingBlank>
                {/*遍历用户列表*/}
                {this.props.userlist.map(v => (
                    v.avatar ? (
                        <Card
                            key={v._id}
                            onClick={() => this.handleClick(v)}
                        >
                            <Header
                                className="genius"
                                title={v.user}
                                thumb={require(`../image/${v.avatar}.jpg`)}
                                extra={<span>{v.title}</span>}
                            ></Header>
                            <Body>
                            {v.type == "boss" ? <div>公司:{v.company}</div> : null}
                            {v.desc.split("\n").map(v => (
                                <div key={v}>{v}</div>
                            ))}
                            {v.type == "boss" ? <div>薪资:{v.money}</div> : null}
                            </Body>
                        </Card>) : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard