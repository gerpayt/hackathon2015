<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
	<title>3D体感网球对战</title>
	<style type="text/css">
html { overflow: hidden;}
body {font-size: 14px; margin: 0; padding:0; overflow: hidden;-webkit-transform: scale(1);}

body { -webkit-user-select: none; background: #333;}
/** {
	-webkit-transition: -webkit-transform 0.3s ease;
}*/
@-webkit-keyframes boxRotate {
	from { -webkit-transform: rotateX(10deg) translateX(-200px);}
	to { -webkit-transform: rotateX(-10deg) translateX(200px);}
}

@-webkit-keyframes playerRun {
	from { -webkit-transform: rotateX(-20deg) translateY(-80px) ;}
	to { -webkit-transform: rotateX(30deg) translateY(-80px) ;}
}

@-webkit-keyframes headerRotate {
	from { -webkit-transform: rotateY(0);}
	to { -webkit-transform: rotateY(30deg);}
}

@-webkit-keyframes boxJump {
	0 { -webkit-transform: translateY(-200px) rotateY(0);}
	50% { -webkit-transform: translateY(200px) rotateY(0);}
	100% { -webkit-transform: translateY(0) rotateY(1080deg);}
}

@-webkit-keyframes playerWin {
	from { -webkit-transform: rotateZ(0);}
	to { -webkit-transform: rotateZ(720deg);}
}

@-webkit-keyframes bodyAni {
	from { -webkit-transform: rotateY(-20deg) rotateX(-8deg);}
	to { -webkit-transform: rotateY(20deg) rotateX(-11deg);}
}

.playerWin {
	-webkit-animation: playerWin 1s ease 0 infinite;
}
.bodyAni {
	-webkit-animation: bodyAni 2s ease 0 infinite alternate !important;
	-webkit-transform-style: preserve-3d;
}

#info {position: absolute; left: 0; width: 100%; height: 100%; top:0; bottom: 0;}
.avatar {
	width: 50px;
	height: 50px;
	overflow: hidden;
	position: absolute;
	top:-40px;
	border: 1px solid #CCC;
	background: #FFF;
	padding: 3px;
	border-radius: 3px;
}
.avatar img { width: 100%; height: 100%;}
.avatar-him {
	left: 20px;
}
.avatar-me {
	right: 20px;
}
.scores {
	background: rgba(255, 255, 255, 0.3);
	box-shadow: 3px 3px 3px rgba(255, 255, 255, 0.3);
	border: 2px solid rgba(255,255,255,.5);
	position: absolute;
	width: 300px;
	font-size: 30px;
	border: 1px solid #CCC;
	border-radius: 8px;
	top: 50px;
	line-height: 40px;
	left: 50%;
	margin-left: -150px;
	text-align: center;
}
#score {
	display: inline-block;
	color: #FFF;
	font-family: "cursive";
}
#score {
	display: inline-block;
	width: 130px;
	text-align: center;
	letter-spacing: 8px;
}
#beforeGame {
	position: absolute;
	top:0;
	left:0;
	height: 100%;
	width: 100%;
	background: #333;
}
.playerA {
	position: absolute;
	top: 120px;
	left: 50%;
	margin-left: -150px;
	height: 400px;
	width: 300px;
	/*border: 1px solid #FFF;*/
	-webkit-perspective: 9000px;
	-webkit-transform-origin: 50% 50%;
	-webkit-transform-style: preserve-3d;
	-webkit-transform: rotateX(-10deg);
}

.playerA.role-action-run {
	-webkit-transform: rotateX(-10deg) rotateY(-8deg);
	-webkit-animation: boxRotate 3s linear 0 /*infinite alternate*/;
 }
 .rolebox {
	position: absolute;
	top: 120px;
	left: 50%;
	margin-left: -150px;
	height: 400px;
	width: 300px;
	/*border: 1px solid #FFF;*/
	-webkit-perspective: 9000px;
	-webkit-transform-origin: 50% 50%;
	-webkit-transform-style: preserve-3d;
	-webkit-transform: rotateX(-10deg);
}

.rolebox.role-action-run {
	-webkit-transform: rotateX(-10deg) rotateY(-8deg);
	-webkit-animation: boxRotate 3s linear 0 /*infinite alternate*/;
 }
.role-action-run {}
.role-action-run .body-down { 
	-webkit-transform: rotateY(30deg);
	-webkit-transform-style: preserve-3d;
} 
.role-action-run  .role-header {
	-webkit-animation: headerRotate 0.6s ease 0 infinite alternate;	
}


.role-action-jump {
	-webkit-animation: boxJump 3s ease;
 }
.role-action-jump .body-down { 

}
.role-action-jump .role-header {

}

.inBox {
    width:210px;
    height:140px;
    margin-left: -50%;
    overflow: hidden;
    text-align: center;
    box-shadow: 0px 0px 2px white;
    background:rgba(255,255,255,.3);
    /*background:#779443;*/
    position:absolute;
    top:40px;
    left:50%; 
    color:white;
	background-size: 140px 140px;
    -webkit-backface-visibility: hidden;
}
.inBox img { width:100%; height: 100%;}
.body-down { 
	position: absolute;
}
.box-forward {
    -webkit-transform: rotateY(0deg) translateZ(70px);
}
.box-back {
    -webkit-transform: rotateY(180deg) translateZ(70px);
}
.box-left {
	width: 140px;
    -webkit-transform: rotateY(270deg) translateZ(70px);
}
.box-right {
	width: 140px;
    -webkit-transform: rotateY(90deg) translateZ(140px);
}
.box-top {
    -webkit-transform:rotateX(90deg) translateZ(70px);
}
.box-bottom {
    -webkit-transform:rotateX(-90deg) translateZ(70px);
}

.role-header {
	/*-webkit-transform: rotateY(8deg);*/
	-webkit-transform-style: preserve-3d;
}
.role-body {
	margin-top: 140px;
	margin-left: 35px;
	-webkit-transform-style: preserve-3d;
}
.role-body .box-forward {
	width: 140px;
	height: 140px;
    -webkit-transform: rotateY(0deg) translateZ(40px);
}
.role-body .box-back {
	width: 140px;
	height: 140px;
    -webkit-transform: rotateY(180deg) translateZ(40px);
}
.role-body .box-left {
	width: 80px;
	height: 140px;
    -webkit-transform: rotateY(270deg) translateZ(40px);
}
.role-body .box-right {
	width: 80px;
	height: 140px;
    -webkit-transform: rotateY(90deg) translateZ(100px);
}
.role-body .box-top {
	width: 140px;
	height: 140px;
    -webkit-transform:rotateX(90deg) translateZ(70px);
}
.role-body .box-bottom {
	width: 140px;
	height: 80px;
    -webkit-transform:rotateX(-90deg) translateZ(100px);
}

.role-footer {
	margin-top: 280px;
	margin-left: 55px;
	-webkit-transform-style: preserve-3d;
}
.role-footer .box-forward {
	width: 100px;
	height: 60px;
    -webkit-transform: rotateY(0deg) translateZ(30px);
}
.role-footer .box-back {
	width: 100px;
	height: 60px;
    -webkit-transform: rotateY(180deg) translateZ(30px);
}
.role-footer .box-left {
	width: 60px;
	height: 60px;
    -webkit-transform: rotateY(270deg) translateZ(30px);
}
.role-footer .box-right {
	width: 60px;
	height: 60px;
    -webkit-transform: rotateY(90deg) translateZ(70px);
}
.role-footer .box-top {
	width: 100px;
	height: 60px;
    -webkit-transform:rotateX(90deg) translateZ(60px);
}
.role-footer .box-bottom {
	width: 100px;
	height: 60px;
    -webkit-transform:rotateX(-90deg) translateZ(30px);
}



.role-hand {
	margin-top: 226px;
	margin-left: -16px;
	-webkit-transform: rotateX(20deg) translateY(-80px) ;
	-webkit-transform-style: preserve-3d;
	-webkit-animation: playerRun 0.5s linear 0.5s infinite alternate;
}
.role-hand .box-forward {
	width: 50px;
	height: 100px;
    -webkit-transform: rotateY(0deg) translateZ(25px);
}
.role-hand .box-back {
	width: 50px;
	height: 100px;
    -webkit-transform: rotateY(180deg) translateZ(25px);
}
.role-hand .box-left {
	width: 50px;
	height: 100px;
    -webkit-transform: rotateY(270deg) translateZ(25px);
}
.role-hand .box-right {
	width: 50px;
	height: 100px;
    -webkit-transform: rotateY(90deg) translateZ(25px);
}
.role-hand .box-top {
	width: 50px;
	height: 50px;
    -webkit-transform:rotateX(90deg) translateZ(25px);
}
.role-hand .box-bottom {
	width: 50px;
	height: 50px;
    -webkit-transform:rotateX(-90deg) translateZ(75px);
}


.role-hand-right {
	margin-left: 176px;
	-webkit-animation: playerRun 0.5s linear 0 infinite alternate;
}

.role-racket {
	-webkit-transform-style: preserve-3d;
	-webkit-transform: translateX(-280px)translateY(45px)rotateY(180deg);
	-webkit-transition: -webkit-transform 0.1s;

}
.role-racket img {
    -webkit-backface-visibility:visible;
}



.welcome-text {
	color: #FFF;
	font-size: 24px;
	font-family: "Microsoft Yahei";
	position: absolute;
	top: -30px;
}

.weblcome-text-ver {
	width: 24px;
	left: -80px;
	overflow: hidden;
	display: inline-block;
	word-break: break-all;
}


.boxPlayerA {
	-webkit-transform: translateY(560px) translateZ(300px)translateX(00px) rotateY(180deg) scale3d(0.14,0.14,0.14);
}
.boxPlayerB {
	-webkit-transform: translateY(560px) translateZ(-300px) translateX(12px) scale3d(0.14,0.14,0.14);
}


	.garden {
	  position: relative;
	  top:-1200px;
	  width : 600px;
	  height: 600px;
	  border: 10px solid #CCC;
	  /*border-radius: 10px;*/
	}
	.mapArea {
	  position: absolute;
	  width : 400px;
	  height: 400px;
	  border: 10px solid #CCC;
	  top: -10px;
	  left: 90px;
	  /*border-radius: 10px;*/
	}

	.mapPlayer {
	  position: absolute;
	  top   : 270px;
	  left  : 270px;
	  width : 60px;
	  height: 60px;
	  background: red;
	  border-radius: 100%;
	}

	.mapPos {
	  position: absolute;
	  top   : 270px;
	  left  : 270px;
	  width : 60px;
	  height: 60px;
	  background: orange;
	  border-radius: 100%;
	}


	#box {height: 1200px; width: 600px; top:-600px; margin:0 auto;position: relative; -webkit-perspective: 800px;}
	#outer {position: absolute; border:1px solid green; height: 100%; width: 100%;-webkit-transform: rotateX(90deg)translateZ(-300px);}
	#net {position: absolute; height: 54px; width: 480px;  opacity: 0.5; top:548px; left: 60px; border:0; -webkit-transform:translateY(300px);}
	/*#bg { height: 800px; width: 400px; margin:200px 100px; position: absolute; border:1px solid green; box-shadow: 2px 2px 2px #CCC;}*/
	.ball { position: absolute; left:295px; top: 595px; width: 10px; height:10px; border-radius: 20px; border:1px solid yellow; background:rgb(253, 253, 182); -webkit-box-shadow: 0 3 5px #000;
	}
	.shadow { border:1px solid #222; background:#111; -webkit-box-shadow: 0 0 5px #000, 0 0 10px #000; opacity: 0.6;}
	.player { position: absolute; left:290px; top: 590px; width: 20px; height:20px; border-radius: 40px; border:1px solid red; background:rgb(253, 22, 22); -webkit-box-shadow: 0 0 5px #000, 0 0 10px #000; opacity: 0.6;
		display:none;}
	.pos { position: absolute; left:290px; top: 590px; width: 20px; height:20px; border-radius: 40px; border:1px solid orange; background:#E9967A; -webkit-box-shadow: 0 0 5px #000, 0 0 10px #000; opacity: 0.7;}
	</style>
</head>

<body style="background:#111;">
<div id="box">
	<div id="container" class="container" style="height: 1200px; width: 600px;-webkit-transform-style: preserve-3d;">
	    <img id="outer" src="image/bg.jpg" />
	    <div id="shadow" class="ball shadow"></div>
	    <div id="ball" class="ball"></div>
	    <div id="pos" class="pos"></div>
	    <div id="player" class="player"></div>
	    <img id="net" src="image/net.jpg" />

<div id="boxPlayer">
	<div class="role-header">
		<div class="inBox box-forward"><img src="image/spider/header/forward.jpg" /></div>
        <div class="inBox box-back"><img src="image/spider/header/back.jpg" /></div>
        <div class="inBox box-left"><img src="image/spider/header/left.jpg" /></div>
        <div class="inBox box-right"><img src="image/spider/header/right.jpg" /></div>
        <div class="inBox box-top"><img src="image/spider/header/top.jpg" /></div>
        <div class="inBox box-bottom"><img src="image/spider/header/bottom.jpg" /></div>
	</div>
	<div class="body-down">
		<div class="role-body">
			<div class="inBox box-forward"><img src="image/spider/body/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/spider/body/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/spider/body/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/spider/body/right.jpg" /></div>
	        <!-- <div class="inBox box-top"><img src="image/spider/body/top.jpg" /></div> -->
	        <div class="inBox box-bottom"><img src="image/spider/body/bottom.jpg" /></div>
		</div>
		<div class="role-hand role-hand-left">
			<div class="inBox box-forward"><img src="image/spider/hand/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/spider/hand/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/spider/hand/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/spider/hand/right.jpg" /></div>
	        <div class="inBox box-top"><img src="image/spider/hand/top.jpg" /></div>
	        <div class="inBox box-bottom"><img src="image/spider/hand/bottom.jpg" /></div>
		</div>
		<div class="role-hand role-hand-right">
			<div class="inBox box-forward"><img src="image/spider/hand/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/spider/hand/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/spider/hand/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/spider/hand/right.jpg" /></div>
	        <div class="inBox box-top"><img src="image/spider/hand/top.jpg" /></div>
	        <div class="inBox box-bottom"><img src="image/spider/hand/bottom.jpg" /></div>
		</div>
		<div class="role-footer">
			<div class="inBox box-forward"><img src="image/spider/footer/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/spider/footer/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/spider/footer/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/spider/footer/right.jpg" /></div>
	        <!-- <div class="inBox box-top"><img src="image/spider/footer/top.jpg" /></div> 
	        <div class="inBox box-bottom"><img src="image/spider/footer/bottom.jpg" /></div>-->
		</div>
	</div>
	<div class="role-racket">
		<img src="image/racket.png" />
	</div>
	<!-- <div class="welcome-text">大家好，我是小胡子哥~</div> -->
</div>


    </div>
</div>    

<div id="info">
	<div class="scores">
		<span class="avatar avatar-him"><img src="image/A.jpg" /></span>
		<span id="score">0:0</span>
		<span class="avatar avatar-me"><img src="image/B.jpg" /></span>
	</div>
</div> 


<div class="garden" style="-webkit-transform:scale(0.35); -webkit-transform-origin:0 0; ">
	<div class="mapArea"></div>
	<div class="mapPos"></div>
	<div class="mapPlayer"></div>
</div>


<div id="beforeGame" style="display:;">
	<div class="rolebox role-action-run">
		<div class="role-header">
			<div class="inBox box-forward"><img src="image/spider/header/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/spider/header/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/spider/header/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/spider/header/right.jpg" /></div>
	        <div class="inBox box-top"><img src="image/spider/header/top.jpg" /></div>
	        <div class="inBox box-bottom"><img src="image/spider/header/bottom.jpg" /></div>
		</div>
		<div class="body-down">
			<div class="role-body">
				<div class="inBox box-forward"><img src="image/spider/body/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/spider/body/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/spider/body/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/spider/body/right.jpg" /></div>
		        <!-- <div class="inBox box-top"><img src="image/spider/body/top.jpg" /></div> -->
		        <div class="inBox box-bottom"><img src="image/spider/body/bottom.jpg" /></div>
			</div>
			<div class="role-hand role-hand-left">
				<div class="inBox box-forward"><img src="image/spider/hand/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/spider/hand/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/spider/hand/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/spider/hand/right.jpg" /></div>
		        <div class="inBox box-top"><img src="image/spider/hand/top.jpg" /></div>
		        <div class="inBox box-bottom"><img src="image/spider/hand/bottom.jpg" /></div>
			</div>
			<div class="role-hand role-hand-right">
				<div class="inBox box-forward"><img src="image/spider/hand/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/spider/hand/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/spider/hand/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/spider/hand/right.jpg" /></div>
		        <div class="inBox box-top"><img src="image/spider/hand/top.jpg" /></div>
		        <div class="inBox box-bottom"><img src="image/spider/hand/bottom.jpg" /></div>
			</div>
			<div class="role-footer">
				<div class="inBox box-forward"><img src="image/spider/footer/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/spider/footer/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/spider/footer/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/spider/footer/right.jpg" /></div>
		        <!-- <div class="inBox box-top"><img src="image/spider/footer/top.jpg" /></div> 
		        <div class="inBox box-bottom"><img src="image/spider/footer/bottom.jpg" /></div>-->
			</div>
		</div>
		<div class="welcome-text">大家好，我是小胡子哥~</div>
	</div>
</div>


    <div id="log" >
    </div>
    <div id="log2" >
    </div>
    <div id="main" class="main room_main">
    </div>
    <!-- <img src="image/aa.png" id="pic" style="display:none;" /> -->
</body>

<script type="text/javascript" src="script/func.js?r=<?php echo rand(); ?>"></script>
<script type="text/javascript" src="script/ws.js?r=<?php echo rand(); ?>"></script>
<script type="text/javascript" src="script/wa.js?r=<?php echo rand(); ?>"></script>
<script>
<?php
	$id = isset($_GET['id']) ? $_GET['id'] : 1;  //1为A 2为B
	$mode = isset($_GET['mode']) ? $_GET['mode'] : 'team';  //single为单人 其余为多人
	$debug = isset($_GET['debug']) ? $_GET['debug'] : 0;  //debug下将自动打
?>
	var deviceId = <?php echo $id; ?>;
	var mode = '<?php echo $mode; ?>';
	var debug = <?php echo $debug; ?>;
	var ws = new ScreenPlayWS(_('log'), deviceId);
	var wa = new WAudio('sound/music.mp3', 0.5);
	var sounds = [];
	for (var i = 1; i <= 12; i++)
	{
		sounds.push(new WAudio('sound/' + i + '.mp3', 1));
	}
	var makeSound = function()
	{
		var ra = parseInt(Math.random() * 12);
		sounds[ra].play();
	}

	var mapPlayer   = document.querySelector('.mapPlayer');
	var mapPos   = document.querySelector('.mapPos');
	var garden = document.querySelector('.garden');
	var maxX = garden.clientWidth  - mapPlayer.clientWidth;
	var maxY = garden.clientHeight - mapPlayer.clientHeight;

	var rx = 0;  //mapPlayer的当前理论坐标
	var ry = 0;  //mapPlayer的当前理论坐标
	var px = 0;  //mapPos的当前理论坐标
	var py = 0;  //mapPos的当前理论坐标
	var perMove = 20;  //每步长

	var goMapPos = function(x, y)  //mapPlayer到达理论坐标
	{
		mapPlayer.style.left  = (maxX / 2 + x) + "px";
		mapPlayer.style.top = (maxY / 2 - y) + "px";
		// mapPlayer.style.left  = (maxX*(x + 90)/180) + "px";
		// mapPlayer.style.top = (maxY*(-y + 90)/180) + "px";
		rx = x;
		ry = y;
	}

	var setMapPos = function(x, y)  //设置mapPos理论坐标
	{
		// debugger;
		mapPos.style.left  = (maxX / 2 + x) + "px";
		mapPos.style.top = (maxY / 2 - y) + "px";
		px = x;
		py = y;
		mapPos.style.display = "block";
	}

	var moveToMapPos = function()  //mapPlayer一步步走向击打位
	{
		var mx = px - rx;
		var my = py - ry;
		if (mx == 0 && my != 0)
		{
			var moveY = (Math.abs(my) > perMove) ? perMove : my;
			goMapPos(rx, moveY * (Math.abs(my) / my) + ry);
			// playery = ;  //screen
		}
		else if (my == 0 && mx != 0)
		{
			var moveX = (Math.abs(mx) > perMove) ? perMove : mx;
			goMapPos(moveX * (Math.abs(mx) / mx) + rx, ry);
		}
		else if (mx != 0 && my != 0)
		{
			var distance = Math.sqrt(mx*mx + my*my);
			if (distance > perMove)
			{
				var moveX = perMove / distance * mx;
				var moveY = perMove / distance * my;
				goMapPos(moveX + rx, moveY + ry);
			}
			else
			{
				goMapPos(px, py);
			}
		}
		if (px != rx || py != ry)
		{
			setTimeout(moveToMapPos, 50);
		}
		else if (px != 0 || py != 0)
		{
			mapPlayer.style.background = "yellow";
			// setTimeout(resetMapPos, 1000);
		}
		else
		{
			// setTimeout(newMapPos, 3000);
		}
	}
	var resetMapPos = function()  //mapPos回至原点 mapPlayer将回位
	{
		px = 0;
		py = 0;
		mapPos.style.display = "none";
		mapPlayer.style.background = "red";
		setTimeout(moveToMapPos, 600);
	}
	var newMapPos = function(x, y)
	{
		setMapPos(x, y);
		var orient = 0;
		if (x >= 0 && y >= 0)
		{
			orient = 1;
		}
		else if (x >= 0 && y < 0)
		{
			orient = 4;
		}
		else if (x < 0 && y >= 0)
		{
			orient = 2;
		}
		else
		{
			orient = 3;
		}
		ws.sendTarget(orient);  //websocket
	}

	var beginMapPos = function()  //mapPos至发球点 mapPlayer将至发球点
	{
		px = -30;
		py = -120;
		mapPos.style.display = "none";
		mapPlayer.style.background = "red";
		goMapPos(px, py);
	}






	var ball = _('ball');
	var outer = _('outer');
	var net = _('net');
	var shadow = _('shadow');
	var pos = _('pos');
	var player = _('player');

	//每回合不一样的数据
	var ballx = 0;  //球此刻x坐标
	var bally = 0;  //球此刻x坐标
	var ballz = 0;  //球此刻x坐标
	var fallPosx = 0;  //球落点x坐标
	var fallPosy = 0;  //球落点y坐标
	var startPosx = 0;  //球出发点x坐标
	var startPosy = 0;  //球出发点y坐标
	var startPosz = 0;  //球出发点z坐标
	var ballvx = 0;  //球x方向的速度 每一回合为常量 vx vy的平方和为v*v
	var ballvy = 0;  //球x方向的速度 每一回合为常量 vx vy的平方和为v*v
	var ballv = 5;  //常数 控制球速
	var jumpTimes = 0;  //反弹次数
	var fallTime = 0;  //一回合运动时间
	var nowRound = 1; //1为球向对方移动 0为球向己方移动
	var g = 0.001;  //常数 控制重力加速度
	var yconstA = -g;  //抛物线三参数 A不变
	var yconstB = 0;  //抛物线三参数 B为计算出
	var yconstC = 0;  //抛物线三参数 C为击球时高度


	// 赢球
	var playerAScore = 0;
	var playerBScore = 0;

	function showScore(player){
		if (deviceId == 1)
		{
			var obj = document.querySelector(".avatar-him");
			if(player == 2){
				obj = document.querySelector(".avatar-me");
			}

			obj.classList.add("playerWin");
			setTimeout(function(){
				obj.classList.remove("playerWin");
			}, 1000);

			// obj.style.cssText = "-webkit-animation: playerWin 1s ease;"
			document.querySelector("#score").innerText = playerAScore * 15 + ":" + playerBScore * 15;
		}
		else
		{
			var obj = document.querySelector(".avatar-me");
			if(player == 2){
				obj = document.querySelector(".avatar-him");
			}

			obj.classList.add("playerWin");
			setTimeout(function(){
				obj.classList.remove("playerWin");
			}, 1000);

			// obj.style.cssText = "-webkit-animation: playerWin 1s ease;"
			document.querySelector("#score").innerText = playerBScore * 15 + ":" + playerAScore * 15;
		}
	}

	var setBall = function(x, y, z)
	{
		var tX = x / 3 * 2;  //因为camera完成了1/3的移动视角
		var tY = 290 - z / 10 * 9;  //因为camera完成了1/10的移动视角
		var tZ = 300 - y;
		ball.style.webkitTransform="translateY(" + tY + "px) translateZ(" + tZ + "px) translateX(" + tX + "px)";
		shadow.style.webkitTransform="translateY(295px) translateZ(" + tZ + "px)translateX(" + tX + "px) rotateX(90deg)";
		setPlayer(rx, ry, 0);  //map
		if (!nowRound)  //??
		{
			setPos(px, py, 0);  //map
			pos.style.display = "block";
		}
		else
		{
			pos.style.display = "none";
		}
	}
	var setPlayer = function(x, y, z)
	{
		var tX = x - ballx / 3;  //因为camera完成了1/3的移动视角
		var tY = - z + 299 + ballz / 20;  //因为camera完成了1/10的移动视角??
		var tZ = 300 - y;
		player.style.webkitTransform = "translateY(" + tY + "px) translateZ(" + tZ + "px)translateX(" + tX + "px) rotateX(90deg)";

		tX = x - ballx / 3 - 6;  //因为camera完成了1/3的移动视角
		tY = - z + 559 + ballz / 20;  //因为camera完成了1/10的移动视角??
		tZ = 300 - y;
		boxPlayerA.style.webkitTransform = "translateY(" + tY + "px) translateZ(" + tZ + "px) translateX(" + tX + "px) rotateY(180deg) scale3d(0.14,0.14,0.14)";
	}
	var setPos = function(x, y, z)
	{
		var tX = x - ballx / 3;  //因为camera完成了1/3的移动视角
		var tY = - z + 299 + ballz / 20;  //因为camera完成了1/10的移动视角??
		var tZ = 300 - y;
		pos.style.webkitTransform="translateY(" + tY + "px) translateZ(" + tZ + "px)translateX(" + tX + "px) rotateX(90deg)";
	}

	var moveBall = function()
	{
		fallTime += 1;

		ballx = startPosx + fallTime*ballvx;
		bally = startPosy + fallTime*ballvy;
		var temp = fallTime*ballv;
		ballz = yconstA*temp*temp + yconstB*temp + yconstC;
		while (ballz < 0)
		{
			var x2 = Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2));
			var y1 = startPosz;
			temp -= x2 + y1 / g / x2 - 1;
			ballz = yconstA*temp*temp + yconstB*temp + yconstC;
		}
		setBall(ballx, bally, ballz);
		moveCamera(ballx / 3, ballz / 20);
		if (mode == 'single')
		{
			if ((fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 1.3) && nowRound && deviceId == 1)
			{
				//模拟击打
				hit();
			}
		}
		if (debug)
		{
			if ((fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 1.3) && nowRound)
			{
				//模拟击打
				hit();
			}
			else if ((fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 1.2) && !nowRound)
			{
				// 模拟击打
				// hit();
				hitShow();hit();
			}
			else if ((fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 0.9) && !nowRound)
			{
				// 模拟击打
				moveToMapPos();
			}
		}
		// if ((fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 2) && !nowRound)
		if (fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 2 && deviceId == 1)
		{
			//玩家一视角下 有人死了
			if (!nowRound)
			{
				//玩家一死了
				playerBScore++;
				showScore(2);
			}
			else
			{
				//玩家二死了
				playerAScore++;
				showScore(1);
			}
			
			//玩家发球
			ws.end(1);  //websocket
			beginMapPos();  //map
			readyToBegin();
		}
		else if (fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 2 && deviceId == 2)
		{
			//玩家二视角下 有人死了
			resetMapPos();  //??
			if (nowRound)
			{
				//玩家一死了
				playerBScore++;
				showScore(2);
			}
			else
			{
				//玩家二死了
				playerAScore++;
				showScore(1);
			}
		}
		else if (fallTime < 500)
		{
			clearTimeout(handleMoveBall);
			handleMoveBall = setTimeout(moveBall, 20);
		}
	}

	var handleMoveBall = null;

	var init = function()
	{
		ballx = 100;
		bally = 480;
		ballz = 40;
		startPosx = ballx;
		startPosy = bally;
		startPosz = ballz;

		setFallPos(-100, -100);
	}

	var readyToBegin = function()  //准备发球
	{
		ballx = -15;
		bally = -120;
		ballz = 30;
		nowRound = 0;  //用于判断求打出去了没

		setBall(ballx, bally, ballz);
		moveCamera(ballx / 3, ballz / 20);
	}
	var throwBall = function(t)  //抛起球
	{
		if (!nowRound)
		{
			ballz = 30 + 4 * t - g * 100 * t * t / 2;
			if (ballz > 30)
			{
				setBall(ballx, bally, ballz);
				moveCamera(ballx / 3, ballz / 20);
				setTimeout("throwBall(" + (t+1) + ")", 20);
			}
			else
			{
				ballz = 30;
			}
		}
	}
	var beginBall = function()  //发出球
	{
		hitShow();
		hit();
		moveBall();
	}

	var setFallPos = function(x, y)
	{
		fallPosx = x;
		fallPosy = y;

		if (x!=startPosx || y!=startPosy)
		{
		//通过球落地点 来动态计算初始速度
		var x2 = Math.sqrt(Math.pow(x-startPosx, 2) + Math.pow(y-startPosy, 2));
		var y1 = startPosz;
		yconstB = g*x2 - y1/x2;  //分母为零
		yconstC = y1;
		var theta = Math.atan((y-startPosy) / (x-startPosx));  //分母为零
		if (x < startPosx)
		{
			theta += Math.PI;
		}
		ballvx = ballv * Math.cos(theta);
		ballvy = ballv * Math.sin(theta);
}
		if (nowRound)  //落点和击打点相关计算
		{
			var r = 10;
			var l = 35;
			if (x > 0)
			{
				var px = x - (r + l * Math.cos(theta));
				var py = y + l * Math.sin(theta);
			}
			else
			{
				var px = x + (r - l * Math.cos(theta));
				var py = y + l * Math.sin(theta);
			}
			newMapPos(px, py);  //map
		}
		else
		{
			resetMapPos();  //map
		}

		fallTime = 0;
		jumpTimes = 0;
		nowRound = !nowRound + 0;

	}

	var checkHit = function()
	{
		var scale = fallTime*ballv / Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2));
		var isHitOk = (scale > 1 && scale < 1.3);
		return isHitOk;
	}

	var hit = function()
	{
		makeSound();

		startPosx = ballx;
		startPosy = bally;
		startPosz = ballz;

		var x = parseInt(Math.random() * 380) - 190;
		var y = 0;
		while (Math.abs(x) < 50)
		{
			x = parseInt(Math.random() * 380) - 190;
		}
		if (nowRound)
		{
			y = 300 - parseInt(100 + Math.random() * 290);
			while (y < 60 && y > -60)
			{
				y = 300 - parseInt(100 + Math.random() * 290);
			}
			console.log(y);
		}
		else
		{
			y = 300 + parseInt(100 + Math.random() * 290);
			while (y - 600 < 60 && y - 600 > -60)
			{
				y = 300 + parseInt(100 + Math.random() * 290);
			}
		}

		ws.newhit(ballx, bally, ballz, x, y);  //websocket
		setFallPos(x, y);
		// moveBall();
	}
	var antHit = function(antx, anty, anth, antpx, antpy)
	{
		makeSound();
		
		ballx = antx;
		bally = anty;
		ballz = anth;
		startPosx = ballx;
		startPosy = bally;
		startPosz = ballz;

		var x = antpx;
		var y = antpy;

		nowRound = 1;

		setFallPos(x, y);
		moveBall();
	}

	var hitShow = function()  //击打动画
	{
		if (px >= 0)
		{
			boxPlayerA.querySelector(".role-racket").style.webkitTransform = "rotateY(270deg)translateX(70px)translateY(-140px)translateZ(70px)";
		}
		else
		{
			boxPlayerA.querySelector(".role-racket").style.webkitTransform = "rotateY(270deg)translateX(70px)translateY(-140px)translateZ(20px)";
		}
		setTimeout(resetHitShow, 100);
	}
	var resetHitShow = function()  //恢复击打状态
	{
		if (px >= 0)
		{
			boxPlayerA.querySelector(".role-racket").style.webkitTransform = "translateX(-280px)translateY(45px)rotateY(180deg)";
		}
		else
		{
			boxPlayerA.querySelector(".role-racket").style.webkitTransform = "translateX(190px)translateY(45px)rotateY(0deg)";
		}
	}

	var moveCamera = function(x, z)
	{
		outer.style.webkitTransform = "rotateX(90deg) translateZ(" + (z*-1-300) + "px) translateX(" + (x*-1) + "px)";
		net.style.webkitTransform = "translateY(" + (z+300) + "px) translateX(" + (x*-1) + "px)";
	}



var boxPlayerA = document.querySelector("#boxPlayer");
var boxPlayerB = boxPlayerA.cloneNode(true);
_('container').appendChild(boxPlayerB);
boxPlayerA.className = 'playerA boxPlayerA';
boxPlayerB.className = 'playerA boxPlayerB';

var initBoxPlayer = function(deviceId)
{
	var anotherPlayer = (deviceId == 1) ? boxPlayerB : boxPlayerA;
	[].slice.call(anotherPlayer.querySelectorAll("img")).forEach(function(item, index){
		var attr = item.getAttribute("src");
		// item.setAttribute("src", attr.replace("spider", "Glawind"));
	});
	[].slice.call(boxPlayerA.querySelectorAll("img")).forEach(function(item, index){
		var attr = item.getAttribute("src");
		item.setAttribute("src", attr.replace("spider", "Glawind"));
	});
	// 修改文字信息
	// var text = anotherPlayer.querySelector(".welcome-text");
	// text.classList.add("weblcome-text-ver")


	// 添加Class
	// var roleClass = anotherPlayer.getAttribute("class");
	// anotherPlayer.classList.remove("role-action-run");
	// anotherPlayer.classList.add("role-action-jump");

	// 修改背景色
	// var container = document.querySelector("#beforeGame");
	// container.style.backgroundColor = "#657965";

}
initBoxPlayer(deviceId);


	//玩家发球
	if (deviceId == 1)
	{
		beginMapPos();  //map
		readyToBegin();
	}
	else
	{
		px = 0;
		py = 0;
		// mapPos.style.display = "none";
		mapPlayer.style.background = "red";
		goMapPos(px, py);

		nowRound = 0;  //用于判断求打出去了没
		ballx = 0;
		bally = 0;
		ballz = 0;
		startPosx = ballx;
		startPosy = bally;
		startPosz = ballz;
		setBall(ballx, bally, ballz);
		moveCamera(ballx / 3, ballz / 20);

		// init();
	}

var roleBox = document.querySelector(".rolebox");
// roleBox.addEventListener('webkitAnimationEnd', function(){
var continueMovie = function()
{
	// 动画结束修改图片
	var roleBox2 = roleBox.cloneNode(true);
	[].slice.call(roleBox2.querySelectorAll("img")).forEach(function(item, index){
		var attr = item.getAttribute("src");
		item.setAttribute("src", attr.replace("spider", "Glawind"));
	});
	// 修改文字信息
	var text = roleBox2.querySelector(".welcome-text");
	text.innerHTML = "大家好，我是郭文峰~";
	text.classList.add("weblcome-text-ver")


	// 添加Class
	var roleClass = roleBox2.getAttribute("class");
	roleBox2.classList.remove("role-action-run");
	roleBox2.classList.add("role-action-jump");

	// 修改背景色
	var container = document.querySelector("#beforeGame");
	container.style.backgroundColor = "#657965";

	// 添加到容器
	container.appendChild(roleBox2);

	roleBox.style.top = "9999px";
}
var finishMovie = function()
{
	document.querySelector("#beforeGame").style.cssText = "-webkit-transition: all 1s; left: -9999px;";
	wa.play();
}
if (mode == 'single')
{
	continueMovie();
	document.querySelector(".role-action-jump").addEventListener("webkitAnimationEnd", function(){
		document.querySelector(".role-action-jump").classList.add("bodyAni")
	})
	_('info').style.display = "none";
	boxPlayerB.style.display = "none";
}

</script>
</html>
