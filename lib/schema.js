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
