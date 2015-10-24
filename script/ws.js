// Module Level Web Socket Part
// 模块层 WebSocket通信功能模块

//WebSocket通信的顶级父类
var WSocket = function(log, role, rid)
{
	this.host = 'ws://' + wsHost + ':' + wsPort + '/';
	// this.host = 'ws://192.168.0.105:12345/';
	// this.host = 'ws://192.168.1.82:12345/';
	// this.host = 'ws://192.168.86.1:12345/';
	this.socket = null;
	this.rid = rid;  //我的设备id 1为A 2为B
	this.role = role;
	
	//WebSocket在1毫秒内连续发送会出错 设置发送池以缓冲
	this.sendPooling = [];
	this.lastSendTime = (new Date()).getTime();
	
	//log
	this.log = log;
	this.logCnt = 0;
	
	//初始化
	this.init();
}
//初始化
WSocket.prototype.init = function()
{
	try
	{
		var _this = this;
		this.socket = new WebSocket(this.host);
		this.logMsg('WebSocket - status ' + this.socket.readyState);
		this.socket.onopen    = function(msg) { _this.logMsg("Welcome - status " + this.readyState); _this.send(_this.role + ',' + _this.rid); }
		this.socket.onclose   = function(msg) { _this.logMsg("Disconnected - status " + this.readyState); }
		this.socket.onmessage = function(msg) { _this.onSocketMessage(msg); }
	}
	catch(ex)
	{
		this.logMsg(ex);
	}
}
//发送信息
WSocket.prototype.send = function(msg)
{
	try
	{
		var span = (new Date()).getTime() - this.lastSendTime;
		console.log('send=',span,msg);
		if (span > 5)
		{
			// console.log('y');  //debug
			this.socket.send(msg + '=');
			this.lastSendTime += span;
		}
		else
		{
			// console.log('n');  //debug
			this.sendPooling.push(msg);
			var _this = this;
			setTimeout(function(){_this.send(_this.sendPooling.shift())}, 5);
		}
	}
	catch(ex)
	{
		this.logMsg(ex);
	}
}
//记录
WSocket.prototype.logMsg = function(msg)
{
	this.logCnt++;
	log.innerHTML = this.logCnt + ' ' + msg;
	console.log(this.logCnt + ' ' + msg);
}
//获取到信息回调
WSocket.prototype.onSocketMessage = function(msg)
{
	//等待继承
}



//Play页面
var PlayWS = function(log, role, rid)
{
	WSocket.call(this, log, role, rid);
	this.mySocket = 0;  //我的socket
	this.patSocket = 0;  //对应设备的socket
	this.userArr = [];  //同组user的socketID表 若数量为0表示未加入组
}
Extend(PlayWS, WSocket);



//Play页面 Screen
var ScreenPlayWS = function(log, rid)
{
	PlayWS.call(this, log, 'screen', rid);
}
Extend(ScreenPlayWS, PlayWS);

//获取到信息回调
ScreenPlayWS.prototype.onSocketMessage = function(msg)
{
	console.log(msg.data);  //debug
	data = msg.data.split(',');
	
	if (data[1] == 'user')
	{
		// user,7,8,9,10
		this.onSocketUser([data[2], data[3], data[4], data[5]]);
	}
	else if (data[1] == 'move')
	{
		// move
		this.onSocketMove();
	}
	else if (data[1] == 'hit')
	{
		// hit,2120,-931
		this.onSocketHit(data[2], data[3]);
	}
	else if (data[1] == 'throw')
	{
		// throw
		this.onSocketThrow();
	}
	else if (data[1] == 'begin')
	{
		// begin,2120,-931
		this.onSocketBegin(data[2], data[3]);
	}
	else if (data[1] == 'newhit')
	{
		// newhit,100,210,6,330,560
		this.onSocketNewhit(data[2], data[3], data[4], data[5], data[6]);
	}
	else if (data[1] == 'shake')
	{
		// shake,1
		this.onSocketShake(data[2]);
	}
	else if (data[1] == 'code')
	{
		// shake,1
		this.onSocketCode(data[2]);
	}
}
//收到user信号
ScreenPlayWS.prototype.onSocketUser = function(userArr)
{
	this.mySocket = userArr[this.myId * 2 - 2];
	this.patSocket = userArr[this.myId * 2 - 1];
	this.userArr = userArr;
	if (userArr[0] != 0 && userArr[1] != 0 && userArr[2] != 0 && userArr[3] != 0)
	{
		//比赛开始
		// var orient = newMapPos(-100, -100);  //play
		// 
		this.end(1);  //websocket
	}

	// antHit(15, 730, 100, -80, -33);  //play
}
//收到move信号
ScreenPlayWS.prototype.onSocketMove = function()
{
	//人物开始移动
	moveToMapPos();  //play

	// this.send('connect,' + this.userArr.join(',') + ',' + this.userIdArr.join(',') + ',' + this.instrument + ',' + this.music);
	// this.logMsg('connect,' + this.userArr.join(',') + ',' + this.userIdArr.join(',') + ',' + this.instrument + ',' + this.music);
}
//收到hit信号
ScreenPlayWS.prototype.onSocketHit = function(vx, vy)
{
	//人物击球
	var isOk = checkHit();  //play
	hitShow();  //play
	this.logMsg('击球' + vx +' ' + vy);
	if (isOk)
	{
		hit();  //play
		this.logMsg('击球成功');
	}
}
//收到throw信号
ScreenPlayWS.prototype.onSocketThrow = function()
{
	//人物抛球
	throwBall(1);  //play
}
//收到begin信号
ScreenPlayWS.prototype.onSocketBegin = function(vx, vy)
{
	//人物发球
	beginBall();  //play
}
//收到newhit信号
ScreenPlayWS.prototype.onSocketNewhit = function(x, y, h, px, py)
{
	//对方击打了
	// console.log(-x, 600-y, h, -px, 600-py);
	antHit(-x, 600-y, Number(h), -px, 600-py);  //play

	// antHit(15, 730, 100, -80, -33);  //play
	// 
	// setBall(123,321,222);
	// 
	// antx = -x, anty = 600-y, anth = h, antpx=-px, antpy = 600-py;
	// ballx = antx;
	// 	bally = anty;
	// 	ballz = anth;
	// 	startPosx = ballx;
	// 	startPosy = bally;
	// 	startPosz = ballz;

	// 	var x = antpx;
	// 	var y = antpy;

	// 	nowRound = 1;

		// setFallPos(x, y);
		// moveBall();
}
//收到shake信号
ScreenPlayWS.prototype.onSocketShake = function(rid)
{
	console.log(rid);
	if (rid == 2)
	{
		continueMovie();  //play
	}
	else
	{
		finishMovie();  //play
	}
}
//收到shake信号
ScreenPlayWS.prototype.onSocketCode = function(mycode)
{
    console.log(mycode);

    if ((user[0] == 0) && ((code[0] == mycode) || (code[0].split('').reverse().join('') == mycode)))
    {
        continueMovie(1);
        ws.send('connect,0,' + data[0]);
//        cv_clear(0);
        user[0] = data[0];
        if (user[1] || user[2] || user[3])
        {
            finishMovie();
//            runTheGame();
        }
    }
    else if ((user[1] == 0) && ((code[1] == mycode) || (code[1].split('').reverse().join('') == mycode)))
    {
        continueMovie(2);
        ws.send('connect,1,' + data[0]);
//        cv_clear(1);
        user[1] = data[0];
        if (user[0] || user[2] || user[3])
        {
            finishMovie();
//            runTheGame();
        }
    }
    else if ((user[2] == 0) && ((code[2] == mycode) || (code[2].split('').reverse().join('') == mycode)))
    {
        ws.send('connect,2,' + data[0]);
//        cv_clear(2);
        user[2] = data[0];
        if (user[0] || user[1] || user[3])
        {
            finishMovie();
//            runTheGame();
        }
    }
    else if ((user[3] == 0) && ((code[3] == mycode) || (code[3].split('').reverse().join('') == mycode)))
    {
        ws.send('connect,3,' + data[0]);
//        cv_clear(3);
        user[3] = data[0];
        if (user[0] || user[1] || user[2])
        {
            finishMovie();
//            runTheGame();
        }
    }
//
//    console.log(rid);
//	if (rid == 2)
//	{
//		continueMovie();  //play
//	}
//	else
//	{
//		finishMovie();  //play
//	}
}
//发送方向给手柄
ScreenPlayWS.prototype.sendTarget = function(orient)
{
	// console.log(orient);
	this.send('target,' + orient);
	this.logMsg('target,' + orient);
}
//本轮结束
ScreenPlayWS.prototype.end = function(id)
{
	this.send('end,' + id);
	this.logMsg('end,' + id);
}
//告诉另外屏幕击打信息
ScreenPlayWS.prototype.newhit = function(x, y, h, px, py)
{
	this.send('newhit,' + x + ',' + y + ',' + h + ',' + px + ',' + py);
	this.logMsg('newhit,' + x + ',' + y + ',' + h + ',' + px + ',' + py);
}




//Play页面 Handle
var HandlePlayWS = function(log, rid)
{
	PlayWS.call(this, log, 'handle', rid);
}
Extend(HandlePlayWS, PlayWS);

//获取到信息回调
HandlePlayWS.prototype.onSocketMessage = function(msg)
{
	console.log(msg.data);  //debug
	data = msg.data.split(',');
	
	if (data[1] == 'user')
	{
		// user,7,8,9,10
		this.onSocketUser([data[2], data[3], data[4], data[5]]);
	}
	else if (data[1] == 'target')
	{
		// target,2
		this.onSocketTarget(data[2]);
	}
	else if (data[1] == 'end')
	{
		// end,1
		this.onSocketEnd(data[2]);
	}
}
//收到user信号
HandlePlayWS.prototype.onSocketUser = function(userArr)
{
	this.mySocket = userArr[this.myId * 2 - 2];
	this.patSocket = userArr[this.myId * 2 - 1];
	this.userArr = userArr;
	if (userArr[0] != 0 && userArr[1] != 0 && userArr[2] != 0 && userArr[3] != 0)
	{
		//比赛开始
	}
}
//收到target信号
HandlePlayWS.prototype.onSocketTarget = function(orient)
{
	//开始跑位
	dm.timeBlock = 1;  //play
	dm.targetOrient = orient;  //play
	_('main').innerHTML = '<br>屏幕为' + orient + _('main').innerHTML;  //play debug
}
//收到end信号
HandlePlayWS.prototype.onSocketEnd = function(playerId)
{
	//本轮结束
	if (playerId == this.rid)
	{
		dm.timeBlock = 4;  //play
		_('main').innerHTML = '<br>发球' + _('main').innerHTML;  //play debug
	}
	else
	{
		dm.timeBlock = 3;  //play
		_('main').innerHTML = '<br>等待发球' + _('main').innerHTML;  //play debug
	}
	dm.targetOrient = 0;  //play
}
//击打
HandlePlayWS.prototype.hit = function(x, y)
{
	this.send('hit,' + x + ',' + y);
	this.logMsg('hit,' + x + ',' + y);
}
//移位正确
HandlePlayWS.prototype.move = function()
{
	this.send('move');
	this.logMsg('move');
}
//抛出球
HandlePlayWS.prototype.throwBall = function()
{
	this.send('throw');
	this.logMsg('throw');
}
//发出球
HandlePlayWS.prototype.begin = function(x, y)
{
	this.send('begin,' + x + ',' + y);
	this.logMsg('begin,' + x + ',' + y);
}
//抖动开始游戏
HandlePlayWS.prototype.shake = function()
{
	this.send('shake,' + this.rid);
	this.logMsg('shake,' + this.rid);
}
