import React from "react";
import logoImg from "./job.jpg";

import "./logo.css";

class Logo extends React.Component {
    render() {
        return (
           <div className="logo">
                <img src={logoImg} alt="" />
           </div>
        )
    }
}
export default Logo