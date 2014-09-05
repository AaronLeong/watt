/**
 * Created by ciaosu on 2014/8/3.
 */

var Schema = require("mongoose").Schema;

exports._book = {
    rating: {
        max: Number,
        numRaters : Number,
        average: Number,
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
};
exports.book = new Schema(exports._book);

exports._bookInStore = {
    bookRef: Schema.Types.ObjectId,
    area: Schema.Types.ObjectId,
    saleTime: Date,
    saleNumber: Number,
    remain: Number,
    address: String,
    discount: {
        begin: Date,
        end: Date,
        value: Number
    }
};
exports.bookInStore = new Schema(exports._bookInStore);

exports._area = {
    ibeacon: String,
    name: String,
    bookstore: Schema.Types.ObjectId
};
exports.area = new Schema(exports._area);

exports._bookstore = {
    name: String,
    address: String
};
exports.bookstore = new Schema(exports._bookstore);

exports._user = {
    username: {type : String, required : true, index : true},
    password: {type : String, required : true},
    email: {type : String, required : true},
    cellphone: {type : String, required : true}
};
exports.user = new Schema(exports._user);

exports._order = {
    user: Schema.Types.ObjectId,
    date: {type : Date, required : true, index : true},
    total_price: {type : Number, required : true},
    books:  [{
        id: Schema.Types.ObjectId,
        price: Number,
        count: Number
    }]
};
exports.order = new Schema(exports._order);

exports._user_order = {
    user: Schema.Types.ObjectId,
    order: Schema.Types.ObjectId
};
exports.user_order = new Schema(exports._user_order);

exports._cart = {
    user: Schema.Types.ObjectId,
    books: [
        {
            id: String,
            count: String
        }
    ]
};

exports.cart = new Schema(exports._cart);