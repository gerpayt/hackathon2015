
var log = [];
log[0] = document.getElementById("log0");
log[1] = document.getElementById("log1");
var canvas = [];
canvas[0] = document.getElementById("canvas0");
canvas[1] = document.getElementById("canvas1");
canvas[2] = document.getElementById("canvas2");
canvas[3] = document.getElementById("canvas3");
var ctx = [];
ctx[0] = canvas[0].getContext("2d");
ctx[1] = canvas[1].getContext("2d");
ctx[2] = canvas[2].getContext("2d");
ctx[3] = canvas[3].getContext("2d");
var posState=[];
posState[0]=[-1, -1];
posState[1]=[-1, -1];
var posCenter=[[125, 140], [375, 140]];

var user = [];  //user的socketID
user[0] = 0;
user[1] = 0;

ctx[0].translate(0, 300);
ctx[0].scale(1, -1);
ctx[1].translate(0, 300);
ctx[1].scale(1, -1);
ctx[2].translate(0, 300);
ctx[2].scale(1, -1);
ctx[3].translate(0, 300);
ctx[3].scale(1, -1);


function makeCode()
{
    var codeMaker = [];
    codeMaker[1] = [2,4,5];
    codeMaker[2] = [1,3,4,5,6];
    codeMaker[3] = [2,5,6];
    codeMaker[4] = [1,2,5,7,8];
    codeMaker[5] = [1,2,3,4,5,6,7,8,9];
    codeMaker[6] = [2,3,5,8,9];
    codeMaker[7] = [4,5,8];
    codeMaker[8] = [4,5,6,7,9];
    codeMaker[9] = [5,6,8];

    var numArr = [1,2,3,4,5,6,7,8,9];
    var num = Math.floor(Math.random() * 9) + 1;
    var code = '' + num;
    var count = Math.floor(Math.random() * 2) + 4;  //4~5
    for (var i = 1; i < count; i++)
    {
        numArr.splice(numArr.indexOf(num),1);
        var tempArr = [];
        for (var j = 0; j < codeMaker[num].length; j++)
        {
            var temp = codeMaker[num][j];
            if (numArr.indexOf(temp) > -1)
            {
                tempArr.push(temp);
            }
        }
        if (!tempArr.length)
        {
            break;
        }
        num = tempArr[Math.floor(Math.random() * tempArr.length)];
        code += num;
    }
    console.log(code);
    return code;
}
var code = [];
code[0] = makeCode();
code[1] = makeCode();
code[2] = makeCode();
code[3] = makeCode();
while (code[0] == code[1])
{
    code[1] = makeCode();
}
while (code[1] == code[2])
{
    code[2] = makeCode();
}
while (code[2] == code[3])
{
    code[3] = makeCode();
}

var numPos = [];
numPos[1] = [170, 230];
numPos[2] = [250, 230];
numPos[3] = [330, 230];
numPos[4] = [170, 150];
numPos[5] = [250, 150];
numPos[6] = [330, 150];
numPos[7] = [170, 70];
numPos[8] = [250, 70];
numPos[9] = [330, 70];

function cv_init(k)
{
    ctx[k].beginPath();
    drawCircle("#333333", 170, 70, 25, k);
    drawCircle("#CCCCCC", 170, 70, 10, k);
    drawCircle("#333333", 250, 70, 25, k);
    drawCircle("#CCCCCC", 250, 70, 10, k);
    drawCircle("#333333", 330, 70, 25, k);
    drawCircle("#CCCCCC", 330, 70, 10, k);
    drawCircle("#333333", 170, 150, 25, k);
    drawCircle("#CCCCCC", 170, 150, 10, k);
    drawCircle("#333333", 250, 150, 25, k);
    drawCircle("#CCCCCC", 250, 150, 10, k);
    drawCircle("#333333", 330, 150, 25, k);
    drawCircle("#CCCCCC", 330, 150, 10, k);
    drawCircle("#333333", 170, 230, 25, k);
    drawCircle("#CCCCCC", 170, 230, 10, k);
    drawCircle("#333333", 250, 230, 25, k);
    drawCircle("#CCCCCC", 250, 230, 10, k);
    drawCircle("#333333", 330, 230, 25, k);
    drawCircle("#CCCCCC", 330, 230, 10, k);

    var codeArr = code[k].split('');
    for (var i = 1; i < codeArr.length; i++)
    {
        drawLine("rgba(255,255,0,.8)", numPos[codeArr[i - 1]][0], numPos[codeArr[i - 1]][1], numPos[codeArr[i]][0], numPos[codeArr[i]][1], 18, k);
    }

}
function cv_clear(k)
{
    ctx[k].clearRect(0, 0, canvas[k].width, canvas[k].height);
    ctx[k].beginPath();
    drawCircle("#3399CC", 125, 140, 90, k);
    drawCircle("#FFFFFF", 125, 140, 42, k);
    drawCircle("#3399CC", 125, 140, 38, k);
    drawCircle("#C24747", 375, 140, 90, k);
    drawCircle("#FFFFFF", 375, 140, 42, k);
    drawCircle("#C24747", 375, 140, 38, k);
}
function drawCircle(color, x, y, r, k)
{
    ctx[k].beginPath();
    ctx[k].fillStyle = color;
    ctx[k].arc(x, y, r, 0, Math.PI * 2, true);
    ctx[k].fill();
}
function drawLine(color, x1, y1, x2, y2, w, k)
{
    ctx[k].beginPath();
    ctx[k].lineCap = 'round';
    ctx[k].strokeStyle = color;
    ctx[k].lineWidth = w;
    ctx[k].moveTo(x1, y1);
    ctx[k].lineTo(x2, y2);
    ctx[k].fill();
    ctx[k].stroke();
}
if (deviceId == 1) {

    cv_init(0);
    cv_init(1);
    cv_init(2);
    cv_init(3);
}










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
    var isHitOk = (scale > 1 && scale < 1.5);
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
        item.setAttribute("src", attr.replace("spider", "a"));
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
//    document.querySelector("#beforeGame").remove();
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
