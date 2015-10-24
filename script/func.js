// Common Part
// 公共函数

var _ = function(id)
{
	return document.getElementById(id);
}
var _a = function(attribute)
{
	return document.body.getAttribute(attribute);
}

//类继承函数
var Extend = function(subClass, superClass)
{
    var F = function(){};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass.superclass = superClass.prototype; //加多了个属性指向父类本身以便调用父类函数
    if (superClass.prototype.constructor == Object.prototype.constructor)
	{
        superClass.prototype.constructor = superClass;
    }
}

//匿名函数被绑定后返回handle 可用以取消绑定
var _EventHandleHash = {};
var _EventHandleNum = 0;
//事件绑定函数
var EventAdd = function(obj, type, handler){
	if (!obj || !handler) return;
	if (obj.addEventListener)
	{
		obj.addEventListener(type, handler, false);
		_EventHandleHash[++_EventHandleNum] = {"handler": handler};
	}
	else if (obj.attachEvent)
	{
		obj.attachEvent("on" + type, handler);
		_EventHandleHash[++_EventHandleNum] = {"handler": handler};
	}
	return _EventHandleNum;
}
//事件移除函数
var EventRemove = function(obj, type, handleNum)
{
	if (!obj || !handleNum) return;
	if (obj.removeEventListener)
	{
		obj.removeEventListener(type, _EventHandleHash[handleNum].handler, false);
	}
	else if (obj.detachEvent)
	{
		obj.detachEvent("on" + type, _EventHandleHash[handleNum].handler);
	}
}

//设置本地存储storage
var _s = function(name, value, isDel)
{
	if (window.localStorage)
	{
		SetLocaltorage(name, value, isDel);
	}
	else  //不支持LocalStorage时用cookie代替
	{
		SetCookie(name, value, (isDel) ? '-1' : null);
	}
}
//获取本地存储storage
var _g = function(name)
{
	if (window.localStorage)
	{
		return GetLocaltorage(name);
	}
	else  //不支持LocalStorage时用cookie代替
	{
		return GetCookie(name);
	}
}

//设置localstorage
var SetLocaltorage = function(name, value, isDel)
{
	localStorage.removeItem(name);
	if (!isDel)
	{
		localStorage.setItem(name, value);
	}
}
//获取localstorage
var GetLocaltorage = function(name)
{
	return localStorage.getItem(name);
}

//设置cookie
var SetCookie = function(c_name, value, expiredays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ";path=/" + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
//获取cookie
var GetCookie = function(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{		
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

//判断是否为移动端
var GetIsMobile = function()
{
	var userAgent = navigator.userAgent.toLowerCase();
	return /mobile/.test(userAgent);
}

//返回上页面
var GoBack = function()
{
	window.history.go(-1);
}
//去url页面
var GoUrl = function(url)
{
	window.document.location = url;
}

