var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dburl = require("../config").db;//数据库地址
mongoose.connect(dburl);

//定义User对象模型
var UserScheme = new Schema({
    username: {type : String, required : true, index : true},
    password: {type : String, required : true},
    email: {type : String, required : true},
    cellphone: {type : String, required : true}
});

//访问User对象模型
mongoose.model('User', UserScheme, 'user');
