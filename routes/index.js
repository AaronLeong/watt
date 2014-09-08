var express = require('express');
var router = express.Router();
var bookModule = require('../lib/book');
var model = require("../lib/model");
var User_Order = require('../lib/model').user_order;
var ObjectId = require("mongoose").Types.ObjectId;
var QRCode = require('qrcode');

var defaultBookStore;

bookModule.getDefaultBookstore(function(err, store){
    defaultBookStore = store;
});

var bookListInfo = {
    '0': {
        'title': '最新上架',
        'id': 0,
        'get': bookModule.getNewest
    },
    '1': {
        'title': '最受好评',
        'id': 1,
        'get': bookModule.getHighestRating
    },
    '2': {
        'title': '最低折扣',
        'id': 2,
        'get': bookModule.getLowestDiscount
    },
    '3': {
        'title': '店长推荐',
        'id': 3,
        'get': bookModule.getRecommend
    }
};

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/category/0');
});

// 传入类别id，0为全部
router.get('/category/:id', function(req, res) {
	var id = req.params.id;
	if (id == 0){
		getIndexList(function(err, data){
	        res.render('index', data);
	    });
	} else {
		// todo: 书籍类目数据库中没有明确定义
	}
});

// 根据书籍详情
router.get('/booklist/:id', function(req, res){
	// 传入图书列表id，由id获取列表内书籍
	// 该id与上面函数中“booklist”数组每一项的id一致
    // todo: 琛哥是不是应该把booklist的id定义一下，现在都是0（我在变量bookListInfo中预定义了，可以看一下）
	var id = req.params.id;
    bookListInfo[id].get(defaultBookStore._id, 100, function(err, books) {
        var data = {
            title: bookListInfo[id].title,					// 图书列表名称
            id: bookListInfo[id].id,
            type: "books",
            url: "/",
            books: convertBookList(books)
        };
        res.render('booklist', data);
    });
});

router.get('/book/location/:id', function(req, res) {
	// 由图书id获取图书信息
	var id = req.params.id;
    getBookDetail(id, function(err, book){
        if (err){

        } else {
            res.render('book', book);
        }
    });
});

router.get('/book/cart/:type/:id', function(req, res) {
	// 由图书id获取图书信息
	var id = req.params.id;
	var type = req.params.type;
    getBookDetail(id, function(err, book){
        if (err){

        } else {
            res.render('book', book);
        }
    });
});

router.get('/book/:listid/:id', function(req, res) {
	// 由图书id获取图书信息
	var listid = req.params.listid;
	var id = req.params.id;
    getBookDetail(id, function(err, book){
        if (err){

        } else {
            res.render('book', book);
        }
    });
});

router.get('/bookisbn/:id', function(req, res){
    var isbn_id = req.params.id;
    bookModule.findBookByIsbn13(isbn_id, function(err, book){
        if (err){
            // todo: error handling for not finding a book with specific isbn
            res.render('error', err);
        } else {
            res.render('book', book);
        }
    });
});

router.get('/book/:id', function(req, res) {
	// 由图书id获取图书信息
	var id = req.params.id;
    getBookDetail(id, function(err, book){
        if (err){

        } else {
            res.render('book', book);
        }
    });
});

router.get('/location/:ibeacon', function(req, res) {
    var ibeacon = req.params.ibeacon.toUpperCase();
    bookModule.findBookByIBeaconSortByBook(ibeacon, "-rating.numRaters", 100, function(err, bookList){
        var data = {
            title: "附近的图书",
            type: "location",
            url: "",
            books: convertBookList(bookList)
        };
        res.render('booklist', data);
    });

});

router.get('/cart/:type', function(req, res) {
	var type = req.params.type;
    var books = new Array();
    var total_price = 0, count = 0;                  // 总计费用
    if(req.session.cart && req.session.cart.length > 0){
        for(var i = 0; i < req.session.cart.length; i++) {
            (function(){
                var j = i;
                bookModule.findBookById(req.session.cart[j].id, function(err, data){
                    book = convertBook(data);
                    book.number = req.session.cart[j].count;
                    if (data.discount.value != 1){
                        book.oldprice = data.price;
                        book.price = (parseFloat(data.price) * data.discount.value).toFixed(2);
                    }
                    if (data.remain <= 10){
                        book.inNervous = true;
                    }
                    books.push(book);
                    count += 1;
                    total_price += book.price * book.number;
                    if (count == req.session.cart.length){
                        var data = {
                            title: "购物车",
                            type: type,
                            books: books,
                            amount: total_price.toFixed(2)
                        };
                        res.render('cart', data);
                    }
                });
            }());
        }
    } else {
        var data = {
            title: "购物车",
            type: type,
            books: [],
            amount: 0
        };
        res.render('cart', data);
    }
});

// 购物车提交
router.post('/checkout/', function(req, res) {

	// 数据位json格式，一个数组
	// 数组中每个对象包括id和num两个域，分别代表图书id和购买数量

	// 结算成功后，生成订单id，并返回
    if (req.body && req.session.user){
        var items = req.body;
        if (items.id && !(items.id instanceof Array)){
            items.id = [items.id];
            items.num = [items.num];
        }
        order = new model.order();
        order.user = new ObjectId(req.session.user._id);
        var total_price = 0, count = 0;
        for(var i = 0; i < items.id.length; i++) {
            (function(){
                var j = i;
                bookModule.findBookById(items.id[j], function(err, data){
                    var book = {
                        id: new ObjectId(items.id[j]),
                        price: parseFloat((parseFloat(data.price) * data.discount.value).toFixed(2)),
                        count: parseInt(items.num[j])
                    };
                    count += 1;
                    total_price += book.price * book.count;
                    order.books.push(book);
                    if (count == items.id.length){
                        order.date = new Date();
                        order.total_price = parseFloat(total_price.toFixed(2));
                        order.save(function(err){
                            var orderid = order._id.toString();
                            var path = './public/images/qrcode/' + orderid + '.png';
                            QRCode.save(path, orderid, function(err,url){
                                if (err){
                                    console.log(err);
                                } else {
                                    order.qrcode = '/images/qrcode/' + orderid + '.png';
                                    order.save(function(err){
                                        if (err){
                                            orderid = -1;
                                        } else {
                                            req.session.cart = [];
                                        }
                                        res.json({
                                            orderid: orderid
                                        })
                                    })
                                }
                            });
                        });
                    }
                });
            }());
        }
    } else {
        res.json({
            orderid: -1
        })
    }
});

// 购买图书提交
router.post('/book/', function(req, res) {

	// 数据为图书id，每个购买一本
	// 添加到购物车，无需返回特殊数据

	var id = req.body.id;
    if(!req.session.cart) {
//        if (req.session.user){
//            model.cart.findOne({user: req.session.user._id}, function(err, cart){
//                if (!cart){
//                    cart = new model.cart();
//                    cart.user = req.session.user._id;
//                    cart.save();
//                }
//                req.session.cart = cart.books;
//                addToCart();
//            });
//        } else {
//            req.session.cart = new Array();
//        }
        req.session.cart = new Array();
        addToCart();
    } else {
        addToCart();
    }

    function addToCart(){
        var cart = req.session.cart;

        //res.cookie('cart', 'name1=value1&name2=value2', {maxAge:10*1000, path:'/', httpOnly:true});
        for(var i=0; i<cart.length; i++){
            if (cart[i].id == id){
                cart[i].count++;
                break;
            }
        }
        if (i === cart.length){
            cart.push({
                'id': id,
                'count': 1
            });
        }
        var data = 1;
        res.json(data);
    }
    function saveCart(){
        if (req.session.user){
            model.cart.update({user: new ObjectId(req.session.user._id)}, {$set: {books: req.session.cart}}, function(){});
        }
    }
});

module.exports = router;

function getIndexList(callback){
    var data = {
        title: '书城',
        categoryList: [							// 类别数组
			{
				id: 0,							// 类别id
				name: "全部类别"					// 类别名称
			}
		],
        id: 0,
        booklists: []
    };
    bookModule.getNewest(defaultBookStore._id, 10, function(err, books){
        var list = {
            title: "最新上架",					// 图书列表名称
            id: 0,								// 由id确定图书列表内容
            books: convertBookList(books)
        };
        data.booklists.push(list);
        bookModule.getHighestRating(defaultBookStore._id, 10, function(err, books){
            var list = {
                title: "最受好评",					// 图书列表名称
                id: 1,								// 由id确定图书列表内容
                books: convertBookList(books)
            };
            data.booklists.push(list);
            bookModule.getLowestDiscount(defaultBookStore._id, 10, function(err, books){
                var list = {
                    title: "最低折扣",					// 图书列表名称
                    id: 2,								// 由id确定图书列表内容
                    books: convertBookList(books)
                };
                data.booklists.push(list);
                bookModule.getRecommend(defaultBookStore._id, 10, function(err, books){
                    var list = {
                        title: "店长推荐",					// 图书列表名称
                        id: 3,								// 由id确定图书列表内容
                        books: convertBookList(books)
                    };
                    data.booklists.push(list);
                    callback(null, data);
                });
            });
        });
    });
}

function convertBook(book){
    var result = {
        id: book._id.toString(),					// id，用于获取图书详情
        name: book.title,			// 书名
        img: book.image,	// 封面图片url
        author: book.author.join(', '),		// 作者
        type: getType(book.tags),			// 类别
        price: parseFloat(book.price).toFixed(2) || '未知',			// 价格
        oldprice: -1,
        number: book.remain,				// 购买数量
        point: book.rating.average,				// 评分，0~5，保留整数或.5
        pointNum: book.rating.numRaters 			// 评论数量，即参与评分的人数
    };
    return result;
}

function convertBookList(bookList){
    var newList = [];
    for (index in bookList){
        newList.push(convertBook(bookList[index]));
    }
    return newList;
}

function getType(tags){
    if (tags.length == 0){
        return "未知";
    } else {
        return tags[0].name;
    }
}

function getBookDetail(id, callback){
    var result;
    bookModule.findBookById(id, function(err, book){
        if (err){
            console.log(err);
        } else {
            // todo: 从book中提取出书籍详情需要的信息
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
            };
            callback(null, result);
        }
    });
}


function formatDate(date){
    if (date)
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    else
        return '';
}