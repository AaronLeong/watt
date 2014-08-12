var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dburl = require("../config").db;//数据库地址

exports.connect = function(callback) {
    mongoose.connect(dburl);
};

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
};

exports.setup = function(callback) { callback(null); };

//定义Cart对象模型
var CartScheme = new Schema({
    datetime: Date,
    book_area_id: ObjectId,
    num: Number,
    price: Number
});

//访问Cart对象模型
mongoose.model('Cart', OrdeScheme);
var Cart = mongoose.model('Cart');