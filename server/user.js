const express = require("express")
// 加密
const utils = require("utility");
const Router = express.Router();
const model = require("./model");
const User = model.getModel("user");
const Chat = model.getModel("chat");
const _filter = {"pwd":0,"_v":0}

// 清空信息
// Chat.remove({},function(e,d){
//
// })

// /查找 返回信息
Router.get("/list",function(req,res){
    const { type } = req.query
    // 清除所有xinxi
    // User.remove({},function(e,d){})
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})

Router.get("/getmsglist",function(req,res){
    // 获取当前用户信息
    const user = req.cookies.userid
    User.find({},function(e,userdoc){
        let users = {}
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
        Chat.find({"$or":[{from:user},{to:user}]},function(err,doc){
            if(!err) {
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })

})

// 更新
Router.post("/update",function(req,res){
    // 查找用户
    const userid = req.cookies.userid
    if(!userid) {
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc) {
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

// 判断登录
Router.post("/login",function(req,res) {
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc) {
        return res.json({code:1,msg:"用户名或密码错误"})
    }
    res.cookie("userid", doc._id)
    return res.json({code:0,data:doc})
    })

})
    // 注册信息
Router.post("/register",function(req,res){
    console.log(req.body);
    const {user,pwd,type} = req.body
    // 判断是否正确
    User.findOne({user},function(err,doc){
        if(doc) {
            return res.json({code:1,msg:"用户名重复"})
        }

        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e) {
                return res.json({code:1,msg:"后端出错了"})
            }
            const {user,type,_id} = d
            res.cookie("userid",_id)
            return res.json({code:0,data:{user,type,_id}})
        })

    })
})
// 获取用户信息
Router.get("/info",function(req,res){
    // 0是登录成功，1是失败
    //req是读请请求
    const {userid} = req.cookies
    if(!userid) {
        // 判断有没有cookie
         return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc) {
        if(err) {
            return res.json({code:1,msg:"后端出错"})
        }
        if(doc) {
            return res.json({code:0,data:doc})
        }
    })

})
// 加密
function md5Pwd(pwd) {
    const salt = "imooc_sdfjD@!45"
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router