var express = require('express');
var router = express.Router();

// 注意：data格式由注释给出，没有注释的内容为写死的，不必特别更改。例如：title

/* GET users listing. */
router.get('/', function(req, res) {
	// 没有用户登录
	// res.redirect('/user/login');

	// 有用户登录
	// data格式如下：
	var data = {
		username: "cc",				// 用户名
		email: "cc@c.com",			// 电子邮箱
		cellphone: "13812345678",	// 手机号码
		orders: [					// 订单，数组，按照时间顺序由现在到过去
			{
				id: 0,				// 账单id
				date: "2014-5-5",	// 订单时间
				price: 20,			// 订单价格
				books: [			// 图书，数组，如果数目过多，只传入20（或更少）个即可
					{
						id: 0,					// id，用于获取图书详情
						name: "书目",			// 书名
						img: "/images/1.png",	// 封面图片url
						author: "郑灿彬",		// 作者
						type: "历史",			// 类别
						price: 99.99			// 价格
					},
					{
						id: 1,
						name: "书目",			// 书名
						img: "/images/2.png",	// 封面图片url
						author: "文庆福",
						type: "百科",
						price: 99.99
					},
					{
						id: 2,
						name: "书目",			// 书名
						img: "/images/3.png",	// 封面图片url
						author: "储超群",
						type: "写实",
						price: 99.99
					},
					{
						id: 3,
						name: "书目",			// 书名
						img: "/images/4.png",	// 封面图片url
						author: "王学成",
						type: "小说",
						price: 99.99
					},
					{
						id: 4,
						name: "书目",			// 书名
						img: "/images/5.png",	// 封面图片url
						author: "林梓佳",
						type: "写真",
						price: 99.99
					}
				]
			},
			{
				id: 1,							// 账单id
				date: "2012-10-10",
				price: 20,
				books: [
					{
						id: 0,
						name: "书目",			// 书名
						img: "/images/4.png",	// 封面图片url
						author: "文庆福",
						type: "百科",
						price: 99.99
					},
					{
						id: 1,
						name: "书目",			// 书名
						img: "/images/5.png",	// 封面图片url
						author: "文庆福",
						type: "百科",
						price: 99.99
					}
				]
			}
		]
	};
  	res.render('user/user', data);
});

router.post('/', function(req, res) {
	// 修改失败
	/*
	var data = {
		fail: "[报错信息]"
	};
	*/

	// 修改成功
	// data格式如下
	var data = {
		success: 1
	};

	res.json(data);
});

router.get('/logout', function(req, res) {
	// 注销

	// 删除用户的session

	res.redirect('/user/login');
});

router.get('/login', function(req, res) {
	res.render('user/login', {title: "登录"});
});

router.post('/login', function(req, res) {
	// 登录失败
	/*
	var data = {
		fail: "[报错信息]"
	};
	*/

	// 登录成功
	// data格式如下
	var data = {
		success: 1
	};

	// 登录成功记录session

	res.json(data);
});

router.get('/register', function(req, res) {
	res.render('user/register', {title: "注册"});
});

router.post('/register', function(req, res) {
	// 登录失败
	/*
	var data = {
		fail: "[报错信息]"
	};
	*/

	// 登录成功
	// data格式如下
	var data = {
		success: 1
	};

	// 登录成功记录session

	res.json(data);
});

router.get('/order/:id', function(req, res){
	// 传入账单id，由id获取账单内信息
	var id = req.params.id;
	// data格式如下：
	var data = {
		title: "账单详情",
		type: "user",
		url: "/user",
		qrcode: "/images/1.png",		// 账单二维码url
		id: id,
		books: [						// 图书，数组，传入该订单下的全部图书
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
			},
			{
				id: 0,					// id，用于获取图书详情
				name: "书目",			// 书名
				img: "/images/4.png",	// 封面图片url
				author: "文庆福",		// 作者
				type: "百科",			// 类别
				price: 99.99,			// 价格
				number: 10,				// 购买数量
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
				number: 10,				// 购买数量
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
				number: 10,				// 购买数量
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
				number: 10,				// 购买数量
				point: 5,				// 评分，0~5，保留整数或.5
				pointNum: 100 			// 评论数量，即参与评分的人数
			}
		]
	};
	res.render('booklist', data);
});

router.get('/book/:id', function(req, res) {
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
		type: "user",
		url: "/user"
	}
	res.render('book', data);
});

router.get('/book/:orderid/:id', function(req, res) {
	// 由图书id获取图书信息
	var orderid = req.params.orderid;
	var id = req.params.id;
	// data个数如下：
	var data = {
		title: "图书详情",
		name: "书名",						// 书名
		type: "user",
		url: "/user/order/" + orderid
	}
	res.render('book', data);
});

module.exports = router;
