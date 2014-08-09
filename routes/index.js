var express = require('express');
var router = express.Router();
var bookModule = require('../lib/book');

var defaultBookStore;
bookModule.getDefaultBookstore(function(err, store){
    defaultBookStore = store;
});

/* GET home page. */
router.get('/', function(req, res) {
	getIndexList(function(err, data){
        res.render('index', data);
    });
});

router.get('/booklist/:id', function(req, res){
	// 传入图书列表id，由id获取列表内书籍
	// 该id与上面函数中“booklist”数组每一项的id一致
	var id = req.params.id;
	// data格式如下：
	var data = {
		title: "账单详情",
		type: "books",
		url: "/",
		id: id,
        books: [						// 图书，数组，传入该订单下的全部图书
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				number: 0,
				point: 3.5,				// 评分，0~5，保留整数或.5
				pointNum: 100 			// 评论数量，即参与评分的人数
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				number: 0,
				point: 4.5,				// 评分，0~5，保留整数或.5
				pointNum: 100 			// 评论数量，即参与评分的人数
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				number: 0,
				point: 0.5,				// 评分，0~5，保留整数或.5
				pointNum: 100 			// 评论数量，即参与评分的人数
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				number: 0,
				point: 0,				// 评分，0~5，保留整数或.5
				pointNum: 100 			// 评论数量，即参与评分的人数
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				number: 0,
				point: 5,				// 评分，0~5，保留整数或.5
				pointNum: 100 			// 评论数量，即参与评分的人数
			}
		]
	};
	res.render('booklist', data);
});

router.get('/book/:listid/:id', function(req, res) {
	// 由图书id获取图书信息
	var listid = req.params.listid;
	var id = req.params.id;
	// data个数如下：
	var data = {
		title: "图书详情",
		name: "书名",						// 书名
		type: "books",
		url: "/booklist/" + listid
	}
	res.render('book', data);
});

router.get('/book/:id', function(req, res) {
	// 由图书id获取图书信息
	var id = req.params.id;
    bookModule.findBookById(id, function(err, book){
        if (err){
            console.log(err);
        } else {
            data = convertBook(book);
            //res.render('book', data);
        }
    });
	// data个数如下：
	var data = {
		title: "图书详情",
		name: "书名",						// 书名
		type: "books",
		url: "/"
	}
	res.render('book', data);
});

router.get('/location', function(req, res) {
	var data = {
		title: "附近的图书",
		type: "location",
		url: ""
	}
	res.render('booklist', data);
});

router.get('/cart', function(req, res) {
	res.render('cart', { title: '购物车' });
});

module.exports = router;

function getIndexList(callback){
    var data = {
        title: '书城',
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
                id: 0,								// 由id确定图书列表内容
                books: convertBookList(books)
            };
            data.booklists.push(list);
            bookModule.getLowestDiscount(defaultBookStore._id, 10, function(err, books){
                var list = {
                    title: "最低折扣",					// 图书列表名称
                    id: 0,								// 由id确定图书列表内容
                    books: convertBookList(books)
                };
                data.booklists.push(list);
                bookModule.getRecommend(defaultBookStore._id, 10, function(err, books){
                    var list = {
                        title: "店长推荐",					// 图书列表名称
                        id: 0,								// 由id确定图书列表内容
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
        type: "book.tags[0].name",			// 类别
        price: book.price,			// 价格
        number: book.saleNumber,				// 购买数量
        point: book.rating.average,				// 评分，0~5，保留整数或.5
        pointNum: book.rating.numRaters 			// 评论数量，即参与评分的人数
    }
    return result;
}

function convertBookList(bookList){
    var newList = [];
    for (index in bookList){
        newList.push(convertBook(bookList[index]));
    }
    return newList;
}