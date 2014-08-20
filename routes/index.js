var express = require('express');
var router = express.Router();
var bookModule = require('../lib/book');

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
	/*if (id == 0){
		getIndexList(function(err, data){
	        res.render('index', data);
	    });
	} else {
		// todo: 书籍类目数据库中没有明确定义
	}*/
	var data = {
		title: '书城',
		id: id,
		categoryList: [							// 类别数组
			{
				id: 0,							// 类别id
				name: "全部类别"					// 类别名称
			}, {
				id: 1,
				name: "小说"
			}
		],
		booklists: [							// 图书列表数组
			{
				title: "最新上架",					// 图书列表名称
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
						point: 4.5,				// 评分，0~5，保留整数或.5
						pointNum: 100 			// 评论数量，即参与评分的人数
					}, {
						id: 0,					// id，用于获取图书详情
						name: "书目",			// 书名
						img: "/images/4.png",	// 封面图片url
						author: "文庆福",		// 作者
						type: "百科",			// 类别
						price: 99.99,			// 价格
						number: 10,				// 购买数量
						point: 0.5,				// 评分，0~5，保留整数或.5
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
				title: "最受好评",					// 图书列表名称
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
					}, {
						id: 0,					// id，用于获取图书详情
						name: "书目",			// 书名
						img: "/images/4.png",	// 封面图片url
						author: "文庆福",		// 作者
						type: "百科",			// 类别
						price: 99.99,			// 价格
						number: 10,				// 购买数量
						point: 0.5,				// 评分，0~5，保留整数或.5
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
				title: "店长推荐",					// 图书列表名称
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
					}, {
						id: 0,					// id，用于获取图书详情
						name: "书目",			// 书名
						img: "/images/4.png",	// 封面图片url
						author: "文庆福",		// 作者
						type: "百科",			// 类别
						price: 99.99,			// 价格
						number: 10,				// 购买数量
						point: 0.5,				// 评分，0~5，保留整数或.5
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
				title: "最低折扣",					// 图书列表名称
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
					}, {
						id: 0,					// id，用于获取图书详情
						name: "书目",			// 书名
						img: "/images/4.png",	// 封面图片url
						author: "文庆福",		// 作者
						type: "百科",			// 类别
						price: 99.99,			// 价格
						number: 10,				// 购买数量
						point: 0.5,				// 评分，0~5，保留整数或.5
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
			}
		]
	}
	res.render('index', data);
});

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
    // data格式如下：
	/*var data = {
		title: "最受好评",				// 列表名称
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
	res.render('booklist', data);*/
});

router.get('/book/location/:id', function(req, res) {
	// 由图书id获取图书信息
	var id = req.params.id;
	// data个数如下：
	var data = {
		id: id,
		title: "图书详情",
		name: "书名",						// 书名
		img: "/images/3.png",				// 图书封面图片url
		author: "作者",						// 作者
		introduction: "图书简介blablabla",	// 图书简介
		language: "中文",					// 语言
		date: "2012-10-10",					// 出版日期
		price: "99.99",						// 价格
		isbn: "/images/5.png",				// ISBN码图片url
		category: "小说",					// 图书类别
		point: "3.5",						// 图书评分
		pointRatio: [50, 20, 15, 10, 5],	// 每种评分所占百分比：按顺序分别为5星评分比例，4星评分比例，...，1星评分比例
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
		type: "location",
		url: "/location"
	}
	res.render('book', data);
});

router.get('/book/cart/:type/:id', function(req, res) {
	// 由图书id获取图书信息
	var id = req.params.id;
	var type = req.params.type;
	// data个数如下：
	var data = {
		id: id,
		title: "图书详情",
		name: "书名",						// 书名
		img: "/images/3.png",				// 图书封面图片url
		author: "作者",						// 作者
		introduction: "图书简介blablabla",	// 图书简介
		language: "中文",					// 语言
		date: "2012-10-10",					// 出版日期
		price: "99.99",						// 价格
		isbn: "/images/5.png",				// ISBN码图片url
		category: "小说",					// 图书类别
		point: "3.5",						// 图书评分
		pointRatio: [50, 20, 15, 10, 5],	// 每种评分所占百分比：按顺序分别为5星评分比例，4星评分比例，...，1星评分比例
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
		type: "cart",
		url: "/cart/Books"
	}
	res.render('book', data);
});

router.get('/book/:listid/:id', function(req, res) {
	// 由图书id获取图书信息
	var listid = req.params.listid;
	var id = req.params.id;
	// data个数如下：
	var data = {
		id: id,
		title: "图书详情",
		name: "书名",						// 书名
		img: "/images/3.png",				// 图书封面图片url
		author: "作者",						// 作者
		introduction: "图书简介blablabla",	// 图书简介
		language: "中文",					// 语言
		date: "2012-10-10",					// 出版日期
		price: "99.99",						// 价格
		isbn: "/images/5.png",				// ISBN码图片url
		category: "小说",					// 图书类别
		point: "3.5",						// 图书评分
		pointRatio: [50, 20, 15, 10, 5],	// 每种评分所占百分比：按顺序分别为5星评分比例，4星评分比例，...，1星评分比例
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
	res.render('book', data);
});

router.get('/book/:id', function(req, res) {
	// 由图书id获取图书信息
	var id = req.params.id;
    bookModule.findBookById(id, function(err, book){
        if (err){
            console.log(err);
        } else {
             // todo: 从book中提取出书籍详情需要的信息
            // data = convertBook(book);
            //res.render('book', data);
        }
    });
	// data个数如下：
	var data = {
		id: id,
		title: "图书详情",
		name: "书名",						// 书名
		img: "/images/3.png",				// 图书封面图片url
		author: "作者",						// 作者
		introduction: "图书简介blablabla",	// 图书简介
		language: "中文",					// 语言
		date: "2012-10-10",					// 出版日期
		price: "99.99",						// 价格
		isbn: "/images/5.png",				// ISBN码图片url
		category: "小说",					// 图书类别
		point: "3.5",						// 图书评分
		pointRatio: [50, 20, 15, 10, 5],	// 每种评分所占百分比：按顺序分别为5星评分比例，4星评分比例，...，1星评分比例
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
	res.render('book', data);
});

router.get('/location', function(req, res) {
	var data = {
		title: "附近的图书",
		type: "location",
		url: "",
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
	}
	res.render('booklist', data);
});

router.get('/cart/:type', function(req, res) {
	var type = req.params.type;
	var data = {
		title: "购物车",
		type: type,
		books: [						// 图书，数组，传入该订单下的全部图书
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				oldprice: 100,			// 原价，如原价与现价一致，则置为-1
				number: 2,				// 购买数量
				point: 3.5,				// 评分，0~5，保留整数或.5
				pointNum: 100,			// 评论数量，即参与评分的人数
				inNervous: true			// 如果库存紧张，置为true，否则置为false
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				oldprice: -1,			
				number: 5,
				point: 4.5,				// 评分，0~5，保留整数或.5
				pointNum: 100, 			// 评论数量，即参与评分的人数
				inNervous: true			// 如果库存紧张，置为true，否则置为false
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				oldprice: 100,
				number: 3,
				point: 0.5,				// 评分，0~5，保留整数或.5
				pointNum: 100, 			// 评论数量，即参与评分的人数
				inNervous: true	
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				oldprice: -1,			
				number: 1,
				point: 0,				// 评分，0~5，保留整数或.5
				pointNum: 100, 			// 评论数量，即参与评分的人数
				inNervous: false	
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				oldprice: -1,			
				number: 1,
				point: 5,				// 评分，0~5，保留整数或.5
				pointNum: 100, 			// 评论数量，即参与评分的人数
				inNervous: false	
			}
		]
	}
	res.render('cart', data);
});

// 购物车提交
router.post('/cart/', function(req, res) {

	// 数据位json格式，一个数组
	// 数组中每个对象包括id和num两个域，分别代表图书id和购买数量

	// 结算成功后，生成订单id，并返回
	var data = {
		orderid: 0
	}
	res.json(data);
});

// 购买图书提交
router.post('/book/', function(req, res) {

	// 数据为图书id，每个购买一本
	// 添加到购物车，无需返回特殊数据

	var data = {}
	res.json(data);
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
        type: getType(book.tags),			// 类别
        price: book.price || '未知',			// 价格
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

function getType(tags){
    if (tags.length == 0){
        return "未知";
    } else {
        return tags[0].name;
    }
}
