var express = require('express')
   , User = require('../lib/model').user
   , crypto = require('crypto')
   , router = express.Router();
var model = require('../lib/model');
var bookModule = require('../lib/book');
var ObjectId = require('mongoose').Types.ObjectId;
var Index = require('./index');


// 注意：data格式由注释给出，没有注释的内容为写死的，不必特别更改。例如：title

/* GET users listing. */
router.get('/', function(req, res) {
	// 没有用户登录
	 if(!req.session.user){
         res.redirect('/user/login');
     }


	// 有用户登录
	// data格式如下：
	var user = req.session.user;
	var data = {
		username: user.username,				// 用户名
		email: user.email,			// 电子邮箱
		cellphone: user.cellphone	// 手机号码
	};
    getOrders(req.session.user._id, function(err, orders){
        if (err){
            // todo: error handling
        } else {
            data.orders = orders;
            res.render('user/user', data);
        }
    });
});

router.post('/', function(req, res) {
    var data = {
        fail: "",
        success: 0
    };

    if (req.body.oldpass != undefined){
        var md5 = crypto.createHash('md5');
        var oldpass = md5.update(req.body.oldpass).digest('base64');

        User.findOne({username:req.session.user.username},function(err, user){
            if(user.password != oldpass) {
                data.fail = "密码错误";
            }else{
                var md5 = crypto.createHash('md5');
                var password = md5.update(req.body.password).digest('base64');
                user.password = password;
                data.success = 1;
                req.session.user = user;
                user.save();
            }
            res.json(data);
        });
    }
    else if (req.body.cellphone != undefined){
        User.findOne({username:req.session.user.username},function(err, user){
            user.cellphone = req.body.cellphone;
            user.save();
            data.success = 1;
            req.session.user = user;
            res.json(data);
        });
    }
    else if (req.body.email != undefined){
        User.findOne({username:req.session.user.username},function(err, user){
            user.email = req.body.email;
            user.save();
            data.success = 1;
            req.session.user = user;
            res.json(data);
        });
    }

});

router.get('/logout', function(req, res) {
	// 注销

	req.session.user = "";
	res.redirect('/user/login');
});

router.get('/login', function(req, res) {
    if(req.session.user){
        res.redirect('/user');
    }
	else{
        res.render('user/login', {title: "登录"});
    }
});

router.post('/login', function(req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var username = req.body.username;

    var data = {
        fail: "",
        success: 0
    };

    User.findOne({$or:[{username:username}, {email:username}, {cellphone:username}]},function(err, user) {
        if(!user){
            data.fail = "用户名不存在或密码错误";
        }
        else
        {
            if(user.password != password){
                data.fail = "用户名不存在或密码错误";
            }
            else{
                data.success = 1;
                req.session.user = user;     // 登录成功记录session
            }
        }
        res.json(data);
    });
});

router.get('/register', function(req, res) {
	res.render('user/register', {title: "注册"});
});

router.post('/register', function(req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var username = req.body.username;
    var email = req.body.email;
    var cellphone = req.body.cellphone;

    var data = {
        fail: "",
        success: 0
    };
    User.findOne({$or:[{username:username}, {email:email}, {cellphone:cellphone}]},function(err, user){
        if(!user){
            var user = new User({
                username:username,
                password:password,
                email:email,
                cellphone:cellphone
            });
            user.save();
            req.session.user = user;
            data.success = 1;
        }
        else{
            if(user.username == username) {
                data.fail = "用户名已存在";
            }
            else if (user.email == email){
                data.fail = "邮箱已存在";
            }
            else if (user.cellphone == cellphone){
                data.fail = "手机号已存在"
            }
        }
        res.json(data);
    });
});

router.get('/order/:id', function(req, res){
	// 传入账单id，由id获取账单内信息
	var id = req.params.id;
	// data格式如下：
    if (req.session.user){
        model.order.findById(id, function(err, order){
            if (err){
                // todo: 添加错误处理
            } else {
                var data = {
                    title: '账单详情',
                    type: 'user',
                    url: '/user',
                    qrcode: order.qrcode,
                    id: id,
                    books: []
                };
                for (var i=0; i<order.books.length; i++){
                    (function(){
                        var index = i;
                        bookModule.findBookById(order.books[i].id, function(err, book){
                            if (err){
                                // todo: 错误处理
                            } else {
                                data.books.push({
                                    id: book._id.toString(),
                                    name: book.title,
                                    img: book.image,
                                    author: book.author.join(', '),
                                    type: getType(book.tags),
                                    price: order.books[index].price,
                                    number: order.books[index].count,
                                    point: book.rating.average,
                                    pointNum: book.rating.numRaters
                                });
                                if (data.books.length === order.books.length){
                                    res.render('booklist', data);
                                }
                            }
                        });
                    }());
                }
            }
        });
    } else {
        res.redirect('/user/login');
    }
});

router.get('/book/:id', function(req, res) {
	// 由图书id获取图书信息
	var id = req.params.id;
    Index.getBookDetail(id, function(err, book){
        if (err){
            // todo: error handling
        } else {
            res.render('book', book);
        }
    });
});

router.get('/book/:orderid/:id', function(req, res) {
	// 由图书id获取图书信息
	var orderid = req.params.orderid;
	var id = req.params.id;
    Index.getBookDetail(id, function(err, book){
        if (err){
            // todo: error handling
        } else {
            res.render('book', book);
        }
    });
});

module.exports = router;

function getOrders(userId, callback){
    if (typeof userId === 'string') userId = new ObjectId(userId);
    model.order.find({user: userId}, function(err, orders){
        if (err){
            callback(err, null);
        } else {
            var result = [];
            for (var i=0; i<orders.length; i++){
                getOrderById(orders[i]._id, function(err, order){
                    result.push(order);
                    if (result.length === orders.length){
                        callback(null, result);
                    }
                });
            }
        }
    });
}

function getOrderById(orderId, callback){
    if (typeof orderId === 'string') orderId = new ObjectId(orderId);
    model.order.findById(orderId, function(err, order){
        if (err){
            callback(err, null);
        } else {
            var data = {
                title: '账单详情',
                type: 'user',
                url: '/user',
                qrcode: "/images/1.png",
                id: orderId,
                date: formatDate(order.date),
                price: order.total_price.toFixed(2),
                books: []
            };
            for (var i=0; i<order.books.length; i++){
                (function(){
                    var index = i;
                    bookModule.findBookById(order.books[i].id, function(err, book){
                        if (err){
                            // todo: 错误处理
                        } else {
                            data.books.push({
                                id: book._id.toString(),
                                name: book.title,
                                img: book.image,
                                author: book.author.join(', '),
                                type: getType(book.tags),
                                price: order.books[index].price,
                                number: order.books[index].count,
                                point: book.rating.average,
                                pointNum: book.rating.numRaters
                            });
                            if (data.books.length === order.books.length){
                                callback(null, data);
                            }
                        }
                    });
                }());
            }
        }
    });
}

function getType(tags){
    if (tags.length == 0){
        return "未知";
    } else {
        return tags[0].name;
    }
}

function formatDate(date){
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}