var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dburl = require("../config").db;//数据库地址

exports.connect = function(callback) {
    mongoose.connect(dburl);
}

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}

exports.setup = function(callback) { callback(null); }

//定义Book对象模型
var BookScheme = new Schema({
    rating: {
        max: Number,
        numRaters : Number,
        average: String,
        min: Number
    },
    pubdate: Date,
    tags: [{
        count: Number,
        name: String,
        title: String
    }],
    price: String,
    catalog: String,
    images: {
        small: String,
        large: String,
        medium: String
    },
    publisher: String,
    isbn10: String,
    isbn13: String,
    title: String,
    introduction: String,
    author: [String],
    image: String
});

//访问Book对象模型
mongoose.model('Book', BookScheme);
var Book = mongoose.model('Book');

exports.add = function(title,callback) {
    var newBook = new Book();
    newBook.title = title;
    newBook.save(function(err){
        if(err){
            util.log("FATAL"+err);
            callback(err);
        }else{
            callback(null);
        }
    });
}
