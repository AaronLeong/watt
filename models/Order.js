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

//定义Order对象模型
var OrderScheme = new Schema({
    datetime: Date,
    total_prcie: Number,
    books: [{
        book_area_id: ObjectId,
        num: Number,
        price: Number
    }]
});

//访问Order对象模型
mongoose.model('Order', OrdeScheme);
var Order = mongoose.model('Order');