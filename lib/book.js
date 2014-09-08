/**
 * Created by ciaosu on 2014/8/3.
 */
var mongoose = require("mongoose");
var model = require("./model");
var schema = require("./schema");

var ObjectId = mongoose.Types.ObjectId;


exports.findBookById = function(bookId, callback){
    if (typeof bookId === "string")
        bookId = new ObjectId(bookId);

    model.bookInStore.findById(bookId, function(err, bookInStore){
        if (err != null){
            callback(err, null)
        } else {
            model.book.findById(bookInStore.bookRef, function(err, book){
                if (err != null){
                    callback(err, null)
                } else{
                    book = combineBook(bookInStore, book);
                    callback(null, book);
                }
            });
        }
    });
};

exports.findBookOfBookstore1 = function(bookstoreId, sortBy, limit, callback){
    if (typeof bookstoreId === "string")
        bookstoreId = ObjectId(bookstoreId);
    if (arguments.length < 4){
        callback = arguments[arguments.length-1];
    }
    model.area.find({bookstore: bookstoreId}, "_id", function(err, areas){
        if (err != null){
            callback(err, null);
        } else {
            var query = model.bookInStore.find({area: {$in: areas}});
            if (sortBy && typeof sortBy !== "function"){
                query = query.sort(sortBy);
            }
            if (limit && typeof limit !== "function"){
                query = query.limit(limit);
            }
            query.exec(function(err, books){
                if (err != null){
                    callback(err, null)
                } else{
                    var count = 0;
                    for (i=0; i<books.length; i++){
                        (function(){
                            var j = i;
                            model.book.findById(books[i].bookRef, function(err, book){
                                if (err != null)
                                    callback(err, null);
                                else{
                                    count++;
                                    books[j] = combineBook(books[j], book);
                                    if (count == books.length){
                                        callback(null, books);
                                    }
                                }
                            })
                        })();
                    }
                }
            });
        }
    });
};

exports.findBookOfBookstore2 = function(bookstoreId, sortBy, limit, callback){
    if (typeof bookstoreId === "string")
        bookstoreId = ObjectId(bookstoreId);
    if (arguments.length < 4){
        callback = arguments[arguments.length-1];
    }
    model.area.find({bookstore: bookstoreId}, "_id", function(err, areas){
        if (err != null){
            callback(err, null);
        } else {
            model.bookInStore.find({area: {$in: areas}}, function(err, bookInStoreList){
                if (err != null){
                    console.log(err, null);
                } else {
                    var ids = [];
                    for (i=0; i<bookInStoreList.length; i++){
                        ids.push(bookInStoreList[i].bookRef);
                    }
                    var query = model.book.find({_id: {$in: ids}});
                    if (sortBy && typeof sortBy !== "function"){
                        query = query.sort(sortBy);
                    }
                    if (limit && typeof limit !== "function"){
                        query = query.limit(limit);
                    }
                    query.exec(function(err, books){
                        if (err != null){
                            callback(err);
                        } else {
                            for (j=0; j<books.length; j++){
                                for (i=0; i<bookInStoreList.length; i++){
                                    if (books[j]._id.toString() == bookInStoreList[i].bookRef.toString()){
                                        books[j] = combineBook(bookInStoreList[i], books[j]);
                                        break;
                                    }
                                }
                            }
                            callback(null, books);
                        }
                    })
                }
            });
        }
    });
};

exports.findBookOfArea1 = function(areaId, sortBy, limit, callback){
    if (typeof areaId === "string")
        areaId = ObjectId(areaId);
    var query = model.bookInStore.find({area: areaId});
    if (sortBy && typeof sortBy !== "function"){
        query = query.sort(sortBy);
    }
    if (limit && typeof limit !== "function"){
        query = query.limit(limit);
    }
    query.exec(function(err, books){
        if (err != null){
            callback(err, null)
        } else {
            for (var i=0; i<books.length; i++){
                model.book.findById(books[i].bookRef, function(err, book){
                    if (err != null) {
                        callback(err, null);
                    } else{
                        books[i] = combineBook(books[i], book);
                    }
                })
            }
            callback(null, books);
        }
    })
};

exports.findBookOfArea2 = function(areaId, sortBy, limit, callback){
    if (typeof areaId === "string")
        areaId = ObjectId(areaId);
    if (arguments.length < 4){
        callback = arguments[arguments.length-1];
    }
    model.bookInStore.find({area: areaId}, function(err, bookInStoreList){
        if (err != null){
            callback(err, null);
        } else {
            var ids = [];
            for (i=0; i<bookInStoreList.length; i++){
                ids.push(bookInStoreList[i].bookRef);
            }
            var query = model.book.find({_id: {$in: ids}});
            if (sortBy && typeof sortBy !== "function"){
                query = query.sort(sortBy);
            }
            if (limit && typeof limit !== "function"){
                query = query.limit(limit);
            }
            query.exec(function(err, books){
                if (err != null){
                    callback(err);
                } else {
                    for (j=0; j<books.length; j++){
                        for (i=0; i<bookInStoreList.length; i++){
                            if (books[j]._id.toString() == bookInStoreList[i].bookRef.toString()){
                                books[j] = combineBook(bookInStoreList[i], books[j]);
                                break;
                            }
                        }
                    }
                    callback(null, books);
                }
            })
        }
    });
};


function combineBook(bookInStore, book){
    if (!bookInStore || !book)
        return null;
    var combine = {};
    for (key in schema._book){
        if (typeof key !== "function")
            combine[key] = book._doc[key];
    }
    for (key in schema._bookInStore){
        if (typeof key !== "function")
            combine[key] = bookInStore._doc[key];
    }
    combine._id = bookInStore._id;
    return combine;
}

exports.getDefaultBookstore = function(callback){
    model.bookstore.find(function(err, bookstores){
        if (err){
            callback(err);
        } else{
            callback(null, bookstores[0]);
        }
    });
};

exports.getNewest = function(bookstoreId, limit, callback){
    exports.findBookOfBookstore1(bookstoreId, '-saleTime', limit, function(err, books){
        if (err){
            callback(err);
        } else {
            callback(null, books);
        }
    });
};

exports.getLowestDiscount = function(bookstoreId, limit, callback){
    exports.findBookOfBookstore1(bookstoreId, 'discount.value', limit, function(err, books){
        if (err){
            callback(err);
        } else {
            callback(null, books);
        }
    });
};

exports.getHighestRating = function(bookstoreId, limit, callback){
    exports.findBookOfBookstore2(bookstoreId, 'rating.average', limit, function(err, books){
        if (err){
            callback(err);
        } else {
            callback(null, books);
        }
    });
};

exports.getRecommend = function(bookstoreId, limit, callback){
    exports.findBookOfBookstore2(bookstoreId, '-rating.numRaters', limit, function(err, books){
        if (err){
            callback(err);
        } else {
            callback(null, books);
        }
    });
};

exports.findBookByAuthor = function(bookstoreId, author, limit, callback){
    var query = model.book.find({'author': author});
    if (limit){
        query = query.limit(limit);
    }
    query.exec(function(err, books){
        if (err){
            callback(err, null);
        } else {
            if (books.length == 0){
                callback(null, []);
            } else {
                for (var i=0; i<books.length; i++){

                }
            }
        }
    });
};

//function combineWithBookInStore(bookstoreId, booklist){
//    if (typeof bookstoreId === "string")
//        bookstoreId = ObjectId(bookstoreId);
//    ids = [];
//    for (var i=0; i<booklist.length; i++){
//        ids.push(booklist[i]._id);
//    }
//    model.area.find({bookstore: bookstoreId}, "_id", function(err, areas){
//        if (err != null){
//            callback(err, null);
//        } else {
//            model.bookInStore.find({area: {$in: areas}, bookRef: {$in: ids}}, function(err, bookInStoreList){
//                if (err != null){
//                    console.log(err, null);
//                } else {
//                    for (var i=0; i<bookInStoreList.length; i++){
//                        for (var j=0; j<booklist.length; j++){
//                            if (bookInStoreList[i].bookRef == booklist[j]._id){
//
//                            }
//                        }
//                    }
//                }
//            });
//        }
//    });
//}

exports.findBookByIBeaconSortByBook = function(ibeacon, sortBy, limit, callback){
    model.area.find({'ibeacon': ibeacon}, function(err, areaList){
        if (err){
            callback(err, null);
        } else {
            findByAreaListSortByBook(areaList, sortBy, limit, callback);
        }
    });
};

exports.findBookByIBeaconSortByBookInStore = function(ibeacon, sortBy, limit, callback){
    model.area.find({'ibeacon': ibeacon}, function(err, areaList){
        if (err){
            callback(err, null);
        } else {
            findByArealistSortByBookInStore(areaList, sortBy, limit, callback);
        }
    });
};

function findByAreaListSortByBook(areas, sortBy, limit, callback){
    var i = arguments.length;
    while(!arguments[--i]) continue;
    callback = arguments[i];

    model.bookInStore.find({area: {$in: areas}}, function(err, bookInStoreList){
        if (err != null){
            console.log(err, null);
        } else {
            var ids = [];
            for (i=0; i<bookInStoreList.length; i++){
                ids.push(bookInStoreList[i].bookRef);
            }
            var query = model.book.find({_id: {$in: ids}});
            if (sortBy && typeof sortBy !== "function"){
                query = query.sort(sortBy);
            }
            if (limit && typeof limit !== "function"){
                query = query.limit(limit);
            }
            query.exec(function(err, books){
                if (err != null){
                    callback(err);
                } else {
                    for (j=0; j<books.length; j++){
                        for (i=0; i<bookInStoreList.length; i++){
                            if (books[j]._id.toString() == bookInStoreList[i].bookRef.toString()){
                                books[j] = combineBook(bookInStoreList[i], books[j]);
                                break;
                            }
                        }
                    }
                    callback(null, books);
                }
            })
        }
    });
}

function findByArealistSortByBookInStore(areas, sortBy, limitcallback){
    if (arguments.length < 4){
        callback = arguments[arguments.length-1];
    }
    model.bookInStore.find({area: {$in: areas}}, function(err, bookInStoreList){
        if (err != null){
            console.log(err, null);
        } else {
            var ids = [];
            for (i=0; i<bookInStoreList.length; i++){
                ids.push(bookInStoreList[i].bookRef);
            }
            var query = model.book.find({_id: {$in: ids}});
            if (sortBy && typeof sortBy !== "function"){
                query = query.sort(sortBy);
            }
            if (limit && typeof limit !== "function"){
                query = query.limit(limit);
            }
            query.exec(function(err, books){
                if (err != null){
                    callback(err);
                } else {
                    for (j=0; j<books.length; j++){
                        for (i=0; i<bookInStoreList.length; i++){
                            if (books[j]._id.toString() == bookInStoreList[i].bookRef.toString()){
                                books[j] = combineBook(bookInStoreList[i], books[j]);
                                break;
                            }
                        }
                    }
                    callback(null, books);
                }
            })
        }
    });
}


exports.findBookByIsbn13 = function(isbn13, callback){
    var result;
    model.book.findOne({isbn13: isbn13}, function(err, book){
        if (err) callback(err, null);
        else if (!book){
            callback(genError('错误', '未找到isbn码为' + isbn13 + '的书籍'), null)
        }
        else {
            model.bookInStore.findOne({bookRef: book._id}, function(err, bookInStore){
                if (err) callback(err, null);
                else if (!bookInStore){
                    callback(genError('错误', '未找到isbn码为' + isbn13 + '的书籍'), null)
                }
                else {
                    book = combineBook(bookInStore, book);
                    result = {
                        id: book._id.toString(),
                        title: "图书详情",
                        name: book.title,						// 书名
                        img: book.image,				// 图书封面图片url
                        author: book.author.join(', '),						// 作者
                        introduction: book.introduction,	// 图书简介
                        language: "中文",					// 语言
                        date: formatDate(book.pubdate) || '未知',					// 出版日期
                        price: book.price || '未知',						// 价格
                        isbn: book.isbn13,				// ISBN码图片url
                        category: getType(book.tags),					// 图书类别
                        point: book.rating.average,						// 图书评分
                        pointRatio: [50, 20, 15, 10, 5],
                        comment: [{							// 评论数组
                            user: "user1",					// 用户
                            point: "2.5",					// 分数
                            datetime: "2012-3-8 13:20",		// 评论发布时间
                            content: "评论内容111"				// 评论内容
                        }, {
                            user: "user2",
                            point: "4.5",
                            datetime: "2012-3-8 13:20",
                            content: "评论内容222"
                        }],
                        booklists: [							// 图书列表数组
                            {
                                title: "同一作者的其他图书",					// 图书列表名称
                                id: 0,								// 由id确定图书列表内容
                                books: [							// 图书，数组，传入该订单下的全部图书
                                    {
                                        id: 0,					// id，用于获取图书详情
                                        name: "书目qwertyuiop",			// 书名
                                        img: "/images/4.png",	// 封面图片url
                                        author: "文庆福",		// 作者
                                        type: "百科",			// 类别
                                        price: 99.99,			// 价格
                                        number: 5,				// 购买数量
                                        point: 3.5,				// 评分，0~5，保留整数或.5
                                        pointNum: 100 			// 评论数量，即参与评分的人数
                                    }, {
                                        id: 0,					// id，用于获取图书详情
                                        name: "书目",			// 书名
                                        img: "/images/4.png",	// 封面图片url
                                        author: "文庆福",		// 作者
                                        type: "百科",			// 类别
                                        price: 99.99,			// 价格
                                        number: 10,				// 购买数量
                                        point: 0,				// 评分，0~5，保留整数或.5
                                        pointNum: 100 			// 评论数量，即参与评分的人数
                                    }, {
                                        id: 0,					// id，用于获取图书详情
                                        name: "书目",			// 书名
                                        img: "/images/4.png",	// 封面图片url
                                        author: "文庆福",		// 作者
                                        type: "百科",			// 类别
                                        price: 99.99,			// 价格
                                        number: 10,				// 购买数量
                                        point: 5,				// 评分，0~5，保留整数或.5
                                        pointNum: 100 			// 评论数量，即参与评分的人数
                                    }
                                ]
                            }, {
                                title: "该类别的其他热门图书",					// 图书列表名称
                                id: 0,								// 由id确定图书列表内容
                                books: [							// 图书，数组，传入该订单下的全部图书
                                    {
                                        id: 0,					// id，用于获取图书详情
                                        name: "书目",			// 书名
                                        img: "/images/4.png",	// 封面图片url
                                        author: "文庆福",		// 作者
                                        type: "百科",			// 类别
                                        price: 99.99,			// 价格
                                        number: 5,				// 购买数量
                                        point: 3.5,				// 评分，0~5，保留整数或.5
                                        pointNum: 100 			// 评论数量，即参与评分的人数
                                    }, {
                                        id: 0,					// id，用于获取图书详情
                                        name: "书目",			// 书名
                                        img: "/images/4.png",	// 封面图片url
                                        author: "文庆福",		// 作者
                                        type: "百科",			// 类别
                                        price: 99.99,			// 价格
                                        number: 10,				// 购买数量
                                        point: 4.5,				// 评分，0~5，保留整数或.5
                                        pointNum: 100 			// 评论数量，即参与评分的人数
                                    }
                                ]
                            }
                        ],
                        type: "books",
                        url: "/"
                    }
                    callback(null, result);
                }
            });
        }
    });
};

exports.findBookByTitle = function(book_title, callback){
    var result;
    model.book.find({title: new RegExp('.*' + book_title + '.*', 'i')}, function(err, bookList){
        if (err || bookList.length == 0){
            // todo: error handling
            callback(err, []);
        } else {
            var ids = [];
            for (i=0; i<bookList.length; i++){
                ids.push(bookList[i]._id);
            }
            model.bookInStore.find({bookRef: {$in: ids}}, function(err, bookInStoreList){
                if (err || bookInStoreList.length == 0){
                    // todo: error handling
                    callback(err, null);
                } else {
                    for (var j=0; j<bookList.length; j++){
                        for (var i=0; i<bookInStoreList.length; i++){
                            if (bookList[j]._id.toString() == bookInStoreList[i].bookRef.toString()){
                                bookList[j] = combineBook(bookInStoreList[i], bookList[j]);
                                break;
                            }
                        }
                    }
                    callback(null, bookList);
                }
            });
        }
    });
};

function getType(tags){
    if (tags.length == 0){
        return "未知";
    } else {
        return tags[0].name;
    }
}

function genError(title, message, status, stack){
    return {
        title: title,
        message: message,
        error: {
            status: status || '',
            stack: stack || ''
        }
    }
}

function formatDate(date){
    if (date)
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    else
        return '';
}