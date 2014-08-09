function togglePanel(button) {
    if(button.next().css('display') == 'none') {
      button.next().show(200);
      button.find('.arrow').remove();
      button.append('<span class="icon-arrow-up arrow"></span>');
    } else {
      button.next().hide(200);
      button.find('.arrow').remove();
      button.append('<span class="icon-arrow-down arrow"></span>');
    }
}

function checkUsername() {
	var username = $("input[name$='username']");
	var reg = /^[^_][A-Za-z]*[a-z0-9_]*$/;
	if(!username.val()) {
		username.prev().text('用户名不能为空');
		username.prev().show();
	}
	else if(!reg.test(username.val())) {
		username.prev().text('用户名只能由数字、字母或下划线组成');
		username.prev().show();
	}
	else {
		username.prev().hide();
		return true;
	}
	return false;
}

function checkEmail() {
	var email = $("input[name$='email']");
	var reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if(!email.val()) {
		email.prev().text('电子邮箱不能为空');
		email.prev().show();
	}
	else if(!reg.test(email.val())) {
		email.prev().text('电子邮箱格式不正确');
		email.prev().show();
	}
	else {
		email.prev().hide();
		return true;
	}
	return false;
}

function checkCellphone() {
	var cellphone = $("input[name$='cellphone']");
	var reg = /^(((13[0-9]{1})|159|153)+\d{8})$/;
	if(!cellphone.val()) {
		cellphone.prev().text('手机号码不能为空');
		cellphone.prev().show();
	}
	else if(!reg.test(cellphone.val())) {
		cellphone.prev().text('手机号码格式不正确');
		cellphone.prev().show();
	}
	else {
		cellphone.prev().hide();
		return true;
	}
	return false;
}

function checkPassword() {
	var password = $("input[name$='password']");
	if(password.val().length < 6) {
		password.prev().text('密码不能少于6位');
		password.prev().show();
	}
	else {
		password.prev().hide();
		return true;
	}
	return false;
}

function checkConfirm() {
	var confirm = $("input[name$='confirm']");
	if($("input[name$='password']").val() != confirm.val()) {
		confirm.prev().text('两次输入密码不一致');
		confirm.prev().show();
	}
	else {
		confirm.prev().hide();
		return true;
	}
	return false;
}

function getAmount() {
	var amount = 0;
	for(var i = 0; i < $('.icon-radio-checked').length - 1; i++)
	{
		var price = parseFloat($($('.icon-radio-checked')[i]).parent().find('.newprice').text());
		var num = parseInt($($('.icon-radio-checked')[i]).parent().find('.num').text());
		amount += price * num;
	}
	return amount.toFixed(2);
}

function getItems() {
	var items = [];
	for(var i = 0; i < $('.check.icon-radio-checked').length; i++)
	{
		var item = {
			id: parseInt($($('.check.icon-radio-checked')[i]).parent().find('.id').text()),
			num: parseInt($($('.check.icon-radio-checked')[i]).parent().find('.num').text())
		}
		items.push(item);
	}
	return items;
}

$(function(){
	$("input[name$='username']").blur(function(){
		checkUsername();
	});

	$("input[name$='email']").blur(function(){
		checkEmail();
	});

	$("input[name$='cellphone']").blur(function(){
		checkCellphone();
	});

	$("input[name$='password']").blur(function(){
		checkPassword();
	});

	$("input[name$='confirm']").blur(function(){
		checkConfirm();
	});

	$('#user-orders').find('.showAll').click(function(){
		var id = $(this).find('.id').html();
		window.location.href = "/user/order/" + id;
	});

	$('#index').find('.showAll').click(function(){
		var id = $(this).find('.id').html();
		window.location.href = "/booklist/" + id;
	});

	$('.check').click(function(){
		if($(this).hasClass('icon-radio-unchecked')) {
			$(this).removeClass('icon-radio-unchecked');
			$(this).addClass('icon-radio-checked');
		} else {
			$(this).removeClass('icon-radio-checked');
			$(this).addClass('icon-radio-unchecked');
		}
		$('.amount').text(getAmount());
	});

	$('.checkall').click(function(){
		if($(this).hasClass('icon-radio-unchecked')) {
			$(this).removeClass('icon-radio-unchecked');
			$(this).addClass('icon-radio-checked');
			$(this).parent().parent().find('.check').removeClass('icon-radio-unchecked');
			$(this).parent().parent().find('.check').addClass('icon-radio-checked');
		} else {
			$(this).removeClass('icon-radio-checked');
			$(this).addClass('icon-radio-unchecked');
			$(this).parent().parent().find('.check').removeClass('icon-radio-checked');
			$(this).parent().parent().find('.check').addClass('icon-radio-unchecked');
		}
		$('.amount').text(getAmount());
	});

	$('.control-item').click(function(){
		$('.card>.active').removeClass('active');
		$('.checkall').removeClass('icon-radio-checked');
		$('.checkall').addClass('icon-radio-unchecked');
		$('.check').removeClass('icon-radio-checked');
		$('.check').addClass('icon-radio-unchecked');
		$('#' + $(this).attr('class').split(' ')[1]).addClass('active');
		$('.amount').text('0');
	});

	$('.icon-qrcode').click(function(){
		if($('.qrcode').css('display') == 'none') {
			$('.qrcode-back').show(300);
			$('.qrcode').show(300);
		} else {
			$('.qrcode-back').hide(300);
			$('.qrcode').hide(300);
		}
	});
});