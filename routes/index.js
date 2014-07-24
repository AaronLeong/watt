var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var data = {
		title: '书城',
		booklists: [							// 图书列表数组
			{
				title: "最新上架",					// 图书列表名称
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
	res.render('cart', { title: 'Express' });
});

module.exports = router;
