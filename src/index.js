// 引入组件
import React from "react";
import ReactDom from "react-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {
    BrowserRouter,
} from "react-router-dom";

// 引入文件

import reducer from "./reducer";
import "./config"
import App from "./app.js";
// import Login from "./container/login/login.js";
// import Register from "./container/register/register.js";
// import BossInfo from "./container/bossinfo/bossinfo.js";
// import GeniusInfo from "./container/geniusinfo/geniusinfo.js";
// import AuthRoute from "./component/authroute/authroute.js";
// import Dashboard from "./component/dashboard/dashboard.js";
// import Chat from "./component/chat/chat.js";

// 引入css样式
import "./index.css";


const store = createStore(reducer, applyMiddleware(thunk));
// const store = createStore(reducer, compose(applyMiddleware(thunk),
//     window.devToolsExtension?window.devToolsExtension():f=>f
//     ))

ReactDom.render(
    // 最外层
    (<Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>

    </Provider>),
    document.getElementById("root")
)

