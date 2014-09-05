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


