const express = require("express");
// 解析json的中间件
const bodyParser = require("body-parser");
// 解析cookie
const cookieParser = require("cookie-parser");

const userRouter = require("./user");

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use("/user",userRouter)
app.listen(9093,function(){
    console.log("NODE app start at port 9093");
})