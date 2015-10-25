
var soundmeter_level1 = 0;
var soundmeter_level2 = 0;


document.querySelectorAll(".role-racket img")[0].src = 'image/mic.png';
document.querySelectorAll(".role-racket img")[1].src = 'image/mic.png';

var rx = 0;  //mapPlayer的当前理论坐标
var ry = 0;  //mapPlayer的当前理论坐标
var px = 0;  //mapPos的当前理论坐标
var py = 0;  //mapPos的当前理论坐标
var perMove = 30;  //每步长

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
    setTimeout(moveToMapPos, 300);
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
var net_mb1 = _('net_mb1');
var net_mb2 = _('net_mb2');
var shadow = _('shadow');
var pos = _('pos');
var player = _('player');
var ad1 = _('ad1');
var ad2 = _('ad2');
var ad3 = _('ad3');

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
var ballv = 3;  //常数 控制球速
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

var lastBally = -1;

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
            // 模拟移动
            moveToMapPos();
        }
    }

    // 麦霸模式不会死
    tempV = Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2));
    if ((fallTime*ballv > tempV * 1.8) && !nowRound)
    {
        // 模拟击打
        hit();
    }
    else if ((fallTime*ballv > tempV * 1.1) && fallPosy < 120 && !nowRound)
    {
        // 模拟击打
        hit();
    }


    // debug
    if (Math.random() > 0.85)
    {
        addNetHeight(1, 1);
    }
    if (Math.random() > 0.85)
    {
        addNetHeight(2, 1);
    }


    if (deviceId == 1) //只有PC一才判断死亡
    {
        if (!nowRound && bally < 300 && lastBally > 300) // 玩家二触网
        {
            // is_del = false;
            is_del = checkDie(2);
            if (is_del) // 玩家二死了
            {
                playerAScore++;
                showScore(1);

                //球被拦下
                bally = lastBally;
                stopBall(ballz);

                //玩家发球
                ws.synend(2);  //websocket
                ws.end(1);  //websocket
                return;
            }
            else
            {
                //网被替换
                resetNetHeight(2);
            }
        }
        else if (nowRound && bally > 300 && lastBally < 300) // 玩家一触网
        {
            // is_del = false;
            is_del = checkDie(1);
            if (is_del) // 玩家二死了
            {
                playerBScore++;
                showScore(2);

                //球被拦下
                bally = lastBally;
                stopBall(ballz);

                //玩家发球
                ws.synend(1);  //websocket
                ws.end(1);  //websocket
                return;
            }
            else
            {
                //网被替换
                resetNetHeight(1);
            }
        }
        else
        {
            lastBally = bally;
        }
    }

    // // // if ((fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 2) && !nowRound)
    // if (fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 2 && deviceId == 1)
    // {
    //     //玩家一视角下 有人死了
    //     if (!nowRound)
    //     {
    //         //玩家一死了
    //         playerBScore++;
    //         showScore(2);
    //     }
    //     else
    //     {
    //         //玩家二死了
    //         playerAScore++;
    //         showScore(1);
    //     }

    //     //玩家发球
    //     ws.end(1);  //websocket
    //     beginMapPos();  //map
    //     readyToBegin();
    // }
    // else if (fallTime*ballv > Math.sqrt(Math.pow(fallPosx-startPosx, 2) + Math.pow(fallPosy-startPosy, 2)) * 2 && deviceId == 2)
    // {
    //     //玩家二视角下 有人死了
    //     resetMapPos();  //??
    //     if (nowRound)
    //     {
    //         //玩家一死了
    //         playerBScore++;
    //         showScore(2);
    //     }
    //     else
    //     {
    //         //玩家二死了
    //         playerAScore++;
    //         showScore(1);
    //     }
    // }
    // else if (fallTime < 2000)
    // {
    //     clearTimeout(handleMoveBall);
    //     handleMoveBall = setTimeout(moveBall, 20);
    // }

    if (fallTime < 800)
    {
        clearTimeout(handleMoveBall);
        handleMoveBall = setTimeout(moveBall, 20);
    }
}


var synEndGame = function()
{
    clearTimeout(handleMoveBall);
    //玩家发球
    ws.end(1);  //websocket
    // beginMapPos();  //map
    // readyToBegin();
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

    resetNetHeight(1);
    resetNetHeight(2);

    // clearTimeout(handleMoveBall);
    // handleMoveBall = setTimeout(moveBall, 20);
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
var stopBall = function(y)  //网拦住球
{
    ballz = y;
    if (ballz > 5)
    {
        setBall(ballx, bally, ballz);
        moveCamera(ballx / 3, ballz / 20);
        setTimeout("stopBall(" + (y-3) + ")", 20);
    }
    else
    {
        beginMapPos();  //map
        readyToBegin();
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
//    makeSound();

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
//    makeSound();

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
    net_mb1.style.webkitTransform = "translateY(" + (z+300) + "px) translateX(" + (x*-1) + "px)";
    net_mb2.style.webkitTransform = "translateY(" + (z+300) + "px) translateX(" + (x*-1) + "px)";
    ad1.style.webkitTransform = "translateZ(-595px)translateY(" + (z+255) + "px)translateX(" + (x*-1) + "px)rotateX(15deg)";
    ad2.style.webkitTransform = "translateY(" + (z+256) + "px)translateX(" + (x*-1-600) + "px)rotateY(90deg)rotateX(15deg)";
    ad3.style.webkitTransform = "translateY(" + (z+255) + "px)translateX(" + (x*-1) + "px)rotateY(-90deg)rotateX(15deg)";
}
// var beginCamera = function(i) //0-20
// {
//     outer.style.webkitTransform = "rotateX(90deg) translateZ(-300px) translateZ(" + (i*15) + "px) rotateX(-" + (i*4.5) + "deg) rotateZ(-" + (i*4.5) + "deg)  translateX(" + (i*-25) + "px)";
//     net.style.webkitTransform = "translateY(300px) translateZ(" + (i*15) + "px) rotateX(-" + (i*4.5) + "deg) rotateZ(-" + (i*4.5) + "deg)  translateX(" + (i*-25) + "px)";
// }


net.style.display = 'none';
net_mb1.style.display = 'block';

var nowNet1Height = 0; //0-100
var nowNet2Height = 0; //0-100
var addNetHeight = function(player, addy)
{
    if (player == 1) //玩家一被升高网
    {
        y = nowNet1Height + addy;
        if (y < 0) y = 0;
        if (y > 100) y = 100;
        net_mb1.style.height = (54 - 50 + y) + "px";
        net_mb1.style.top = (548 + 50 - y) + "px";
        nowNet1Height = y;
    }
    else //玩家二被升高网
    {
        y = nowNet2Height + addy;
        if (y < 0) y = 0;
        if (y > 100) y = 100;
        net_mb2.style.height = (54 - 50 + y) + "px";
        net_mb2.style.top = (548 + 50 - y) + "px";
        nowNet2Height = y;
    }
}
var resetNetHeight = function(player)
{
    if (player == 1) //玩家一被恢复网
    {
        y = 0;
        net_mb1.style.height = (54 - 50 + y) + "px";
        net_mb1.style.top = (548 + 50 - y) + "px";
        nowNet1Height = y;
        net_mb1.style.display = 'none';
        net_mb2.style.display = 'block';
    }
    else //玩家二被恢复网
    {
        y = 0;
        net_mb2.style.height = (54 - 50 + y) + "px";
        net_mb2.style.top = (548 + 50 - y) + "px";
        nowNet2Height = y;
        net_mb2.style.display = 'none';
        net_mb1.style.display = 'block';
    }
}
var checkDie = function(player)
{
    if (player == 1) //检查玩家一
    {
        return Math.random() < nowNet1Height / 300.0;
    }
    else //检查玩家二
    {
        return Math.random() < nowNet2Height / 300.0;
    }
}


var initBoxPlayer = function(deviceId)
{
    var anotherPlayer = (deviceId == 1) ? boxPlayerB : boxPlayerA;
    [].slice.call(anotherPlayer.querySelectorAll("img")).forEach(function(item, index){
        var attr = item.getAttribute("src");
        item.setAttribute("src", attr.replace("blank", "zyt"));
    });
    [].slice.call(boxPlayerA.querySelectorAll("img")).forEach(function(item, index){
        var attr = item.getAttribute("src");
        item.setAttribute("src", attr.replace("blank", "cf"));
    });
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
