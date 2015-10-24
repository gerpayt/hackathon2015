// Module Level DeviceMotion Part
// 模块层 DeviceMotion加速度传感器功能模块

//DeviceMotion加速度传感器的主类
var DMotion = function(steadyCallBack)
{
	//检测到稳定时回调
	this.steadyCallBack = steadyCallBack;
	
	this.eventHandle = {};  //匿名函数被绑定后返回的handle 用以取消绑定

	this.aBase = 999;  //999表示未赋值 初始方向
	
	this.lastTime = 0;
	this.xLast = 0;
	this.yLast = 0;
	this.zLast = 0;

	this.lastTime2 = 0;
	this.aLast = 0;
	this.bLast = 0;
	this.gLast = 0;

	this.lastTime3 = 0;
	this.aiLast = 0;
	this.ajLast = 0;
	this.akLast = 0;
	this.viLast = 0;
	this.vjLast = 0;
	this.vkLast = 0;
	// this.siLast = 0;
	// this.sjLast = 0;
	this.vOrientLastArr = [];  //跑位期移动方向数组 记录3组

	this.viArr = [];  //击球期i速度方向数组 记录3组
	this.vjArr = [];  //击球期j速度方向数组 记录3组
	this.vkArr = [];  //击球期k速度方向数组 记录3组
	this.vArr = [];  //击球期ij速度方向数组 记录3组


	this.lastTime4 = 0;  //抛出球时间

	this.timeBlock = 0;  //0为未开始 1为跑位期 2为击球期 3为回位期 4为发球期
	this.targetOrient = 0;

	this.isBegin = 0;
	
	//初始化
	this.init();
}

//初始化
DMotion.prototype.init = function()
{
	this.eventHandle = {'devicemotion' : null};
}
//开始监视
DMotion.prototype.start = function()
{
	if (window.DeviceMotionEvent)
	{
		var _this = this;
		this.eventHandle.devicemotion = EventAdd(window, 'devicemotion', function(){_this.onMove(event);});
		this.eventHandle.deviceorientation = EventAdd(window, 'deviceorientation', function(){_this.onRotate(event);});
	}
}
//抖动事件
DMotion.prototype.onMove = function(event)
{
	var now = (new Date()).getTime();
	if (now - this.lastTime > 40)
	{
		var acceleration = event.accelerationIncludingGravity;
		
		this.lastTime = now;
		var x = acceleration.x;  
		var y = acceleration.y;  
		var z = acceleration.z; 
		// var xChange = parseInt(Math.abs(this.xLast - x) * 100);
		// var yChange = parseInt(Math.abs(this.yLast - y) * 100);
		// var zChange = parseInt(Math.abs(this.zLast - z) * 100);
		var xChange = parseInt(Math.pow((this.xLast - x), 2) * 10000);
		var yChange = parseInt(Math.pow((this.yLast - y), 2) * 10000);
		var zChange = parseInt(Math.pow((this.zLast - z), 2) * 10000);
		this.xLast = x;
		this.yLast = y;
		this.zLast = z;
		
		// if ((xChange < 300) && (yChange < 300) && (zChange < 300))
		// {
			// this.xArr.push(xChange);
			// this.yArr.push(yChange);
			// this.zArr.push(zChange);
			// var lastChange = xChange + yChange + zChange;
			var lastChange = parseInt(Math.sqrt(xChange + yChange + zChange));
			this.sumChange += lastChange;
		// }
		// if (this.xArr.length > 3)
		// {
			// var last = parseInt(Math.sqrt(this.xArr.shift() + this.yArr.shift() + this.zArr.shift()));
			// this.sumChange -= last;
			
			// //3秒内基本稳定
			// if ((this.sumChange < 150))
			// {
			// 	this.steadyCallBack();
			// 	this.remove();
			// }
			
			
			// if ((lastChange > 30))
			// {
				// _('main').innerHTML += ' ' + lastChange;
				this.getOrient(lastChange);
			// }
		// }
		
		
		var xChange = parseInt(Math.abs(x) * 100);
		var yChange = parseInt(Math.abs(y) * 100);
		var zChange = parseInt(Math.abs(z) * 100);
		this.log([xChange, yChange, zChange]);  //debug
	}
}
//抖动事件
DMotion.prototype.onRotate = function(event)
{
	// alert();
	var now = (new Date()).getTime();
	if (now - this.lastTime2 > 15)
	{
		var a = event.alpha;
		var b = event.beta;
		var g = event.gamma;
		
		this.lastTime2 = now;
		// var x = acceleration.x;  
		// var y = acceleration.y;  
		// var z = acceleration.z; 
		// var xChange = parseInt(Math.abs(this.xLast - x) * 100);
		// var yChange = parseInt(Math.abs(this.yLast - y) * 100);
		// var zChange = parseInt(Math.abs(this.zLast - z) * 100);

		if (this.aBase == 999 && a != 0)  //方向修正
		{
			this.aBase = a;
		}
		a -= this.aBase;

		this.aLast = a;
		this.bLast = b;
		this.gLast = g;
		
		// if ((xChange < 300) && (yChange < 300) && (zChange < 300))
		// {
		// 	this.xArr.push(xChange);
		// 	this.yArr.push(yChange);
		// 	this.zArr.push(zChange);
		// 	var lastChange = xChange + yChange + zChange;
		// 	this.sumChange += lastChange;
		// }
		// if (this.xArr.length > 6)
		// {
		// 	var last = this.xArr.shift() + this.yArr.shift() + this.zArr.shift();
		// 	this.sumChange -= last;
			
		// 	// //3秒内基本稳定
		// 	// if ((this.sumChange < 150))
		// 	// {
		// 	// 	this.steadyCallBack();
		// 	// 	this.remove();
		// 	// }
		// }
		var aChange = parseInt(a);
		var bChange = parseInt(b);
		var gChange = parseInt(g);
		this.log2([aChange, bChange, gChange]);  //debug

		// _('pic').style.webkitTransform = "rotate(" + aChange + "deg) rotate3d(1,0,0, " + (bChange*-1) + "deg) rotate3d(0,1,0, " + (gChange*-1) + "deg)";
	}
}

//计算方向
DMotion.prototype.getOrient = function(lastChange)
{
		// _('main').innerHTML = ' ' + lastChange;
	if (lastChange > 80)
	{
		var dx = this.xLast;
		var dy = this.yLast;
		var dz = this.zLast;
		var da = this.aLast;
		var db = this.bLast;
		var dg = this.gLast;







		var pa = 2*Math.PI/360*da;
		var pb = 2*Math.PI/360*db;
		var pg = 2*Math.PI/360*dg;

		cosa = Math.cos(pa);
		sina = Math.sin(pa);
		cosb = Math.cos(pg);
		sinb = Math.sin(pg);
		cosg = Math.cos(pb);
		sing = Math.sin(pb);

		ax = cosa*cosb*dx + (cosa*sinb*sing-sina*cosg)*dy + (cosa*sinb*cosg+sina*sing)*dz;
		ay = sina*cosb*dx + (sina*sinb*sing+cosa*cosg)*dy + (sina*sinb*cosg-cosa*sing)*dz;
		az = -sinb*dx + (cosb*sing)*dy + (cosb*cosg)*dz;



		// var x = ax / 10 * 90;
		// var y = -ay / 10 * 90;
		// ball.style.left  = (maxX*(x + 90)/180) + "px";
		// ball.style.top = (maxY*(y + 90)/180) + "px";

		// _('main').innerHTML = ' ' + az;


		var now = (new Date()).getTime();
		if (this.lastTime3 == 0)
		{
			this.lastTime3 = now;
			return;
		}
		var time = now - this.lastTime3;
		this.lastTime3 = now;

		var vx = this.viLast + time * (this.aiLast + ax) / 2;
		var vy = this.vjLast + time * (this.ajLast + ay) / 2;
		var vz = this.vkLast + time * (this.akLast + az) / 2;


		this.aiLast = ax;
		this.ajLast = ay;
		this.akLast = az;

		var x = vx / 1000 * 90;
		var y = -vy / 1000 * 90;
		ball.style.left  = (maxX*(x + 90)/180) + "px";
		ball.style.top = (maxY*(y + 90)/180) + "px";

		// _('main').innerHTML += ' ' + vx;
		
		var v = parseInt(Math.sqrt(vx*vx + vy*vy));

		if (!this.isBegin)  //未开始
		{
			if (v > 500)
			{
				ws.shake();  //websocket
				this.isBegin = true;
			}
		}
		else
		{
			if (this.timeBlock == 2)  //击球期
			{
				if (v > 800)
				{
				// _('main').innerHTML = '<br>' + this.timeBlock + ' ' + v + _('main').innerHTML;
					// console.log(this.timeBlock + ' ' + v)
					this.viArr.push(vx);
					this.vjArr.push(vy);
					this.vkArr.push(vz);
					this.vArr.push(v);
					if (this.viArr.length > 3)
					{
						this.viArr.shift();
						this.vjArr.shift();
						this.vkArr.shift();
						this.vArr.shift();
						if (this.vArr[1] > 1200 && this.vArr[0] < this.vArr[1] && this.vArr[1] > this.vArr[2]) // 找到最高峰
						{
							//有效击打
							_('main').innerHTML = '<br>击' + parseInt(this.viArr[1]) +' ' + parseInt(this.vjArr[1]) +' ' + parseInt(this.vkArr[1]) + _('main').innerHTML;
							ws.hit(parseInt(this.viArr[1]), parseInt(this.vjArr[1]));  //websocket
							navigator.vibrate && navigator.vibrate([200]);
						}
					}
				}
			}

			if (this.timeBlock == 1)  //跑位期
			{
				var orient = 0;
				if (v > 800)
				{
					if (x >= 0 && y >= 0)
					{
						orient = 4;
					}
					else if (x >= 0 && y < 0)
					{
						orient = 1;
					}
					else if (x < 0 && y >= 0)
					{
						orient = 3;
					}
					else
					{
						orient = 2;
					}
					_('main').innerHTML = '<br>' + orient + ' ' + lastChange + ' ' + v + ' ' + time + _('main').innerHTML;
				}
				// _('main').innerHTML = '<br>' + this.timeBlock + ' ' + v + _('main').innerHTML;
				this.vOrientLastArr.push(orient);
				if (this.vOrientLastArr.length > 3)
				{
					this.vOrientLastArr.shift();
					if ((orient != 0) && (this.vOrientLastArr[0] == 0) && (this.vOrientLastArr[1] == this.vOrientLastArr[2]))
					{
						//方向已定
						_('main').innerHTML = '<br>定' + orient + _('main').innerHTML;
						if (orient == this.targetOrient && orient != 0)
						{
							ws.move();  //websocket
							this.timeBlock = 2;
							this.viArr = [];
							this.vjArr = [];
							this.vkArr = [];
							this.vArr = [];
						}
		  				// navigator.vibrate([100, 0]);
					}
				}

				// var sx = this.siLast + time * (this.viLast + vx) / 2;
				// var sy = this.sjLast + time * (this.vjLast + vy) / 2;

				this.viLast = vx;
				this.vjLast = vy;
			}

			if (this.timeBlock == 4)  //发球期
			{
				if ((new Date()).getTime() - this.lastTime4 > 2500)  //可抛球
				{
					if (this.akLast > 20)
					{
						//抛出球
						_('main').innerHTML = '<br>扔' + _('main').innerHTML;
						ws.throwBall();  //websocket
						this.lastTime4 = (new Date()).getTime();
						navigator.vibrate && navigator.vibrate([100]);
					}
				}
				else if ((new Date()).getTime() - this.lastTime4 > 1000)  //可击球
				{
					// _('main').innerHTML = '<br>' + this.timeBlock + ' ' + v + _('main').innerHTML;
					if (v > 700)
					{
						//击出球
						_('main').innerHTML = '<br>发' + _('main').innerHTML;
						ws.begin(vx, vy);  //websocket
						this.timeBlock = 1;
						navigator.vibrate && navigator.vibrate([100]);
					}
				}
			}
		}
	}
	else
	{
		if (this.viLast != 0 || this.vjLast != 0)
		{
			_('main').innerHTML = '<br>' + 0 + ' ' + lastChange + _('main').innerHTML;
		}

		// var ax = 0;
		// var ay = 0;

		// var vx = time * (this.aiLast + ax) / 2;
		// var vy = time * (this.ajLast + ay) / 2;
		var vx = 0;
		var vy = 0;
		var now = (new Date()).getTime();
		this.lastTime3 = now;
		this.aiLast = 0;
		this.ajLast = 0;
		this.viLast = 0;
		this.vjLast = 0;

		var x = vx / 1000 * 90;
		var y = -vy / 1000 * 90;
		ball.style.left  = (maxX*(x + 90)/180) + "px";
		ball.style.top = (maxY*(y + 90)/180) + "px";

		// _('main').innerHTML += ' ' + vx;
		
		var orient = 0;
		this.vOrientLastArr.push(orient);
		if (this.vOrientLastArr.length > 3)
		{
			this.vOrientLastArr.shift();
		}
	}

	// var x = vx / 1000 * 90 + 90;
	// var y = -vy / 1000 * 90 + 90;
	// ball.style.left  = (maxX*x/180) + "px";
	// ball.style.top = (maxY*y/180) + "px";

	// _('main').innerHTML = ' ' + vx;
}
//移除对加速度的监视
DMotion.prototype.remove = function()
{
	EventRemove(window, 'devicemotion', this.eventHandle.devicemotion);
}
//显示3个坐标变化
DMotion.prototype.log = function(pos)
{
	var log = '';
	var sum = 0;
	for (var i = 0; i < 3; i++)
	{
		sum += pos[i];
		var c = pos[i].toString().length;
		if (c == 2)
		{
			log += '0' + pos[i];
		}
		else if (c == 1)
		{
			log += '00' + pos[i];
		}
		else
		{
			log += pos[i];
		}
		log += ' ';
	}
	log += sum;
	// log += ' ' + this.sumChange;
	_('log').innerHTML = log;
}
//显示3个坐标变化
DMotion.prototype.log2 = function(pos)
{
	var log = '';
	var sum = 0;
	for (var i = 0; i < 3; i++)
	{
		sum += pos[i];
		var c = pos[i].toString().length;
		if (c == 2)
		{
			log += '0' + pos[i];
		}
		else if (c == 1)
		{
			log += '00' + pos[i];
		}
		else
		{
			log += pos[i];
		}
		log += ' ';
	}
	log += sum;
	// log += ' ' + this.sumChange;
	_('log2').innerHTML = log;
}

