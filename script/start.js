var log = document.getElementById("log");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pos=[[0,0],[0,0]];  //A键x,y B键x,y
var posCenter=[[130,145],[380,145]];  //A键x,y B键x,y 按键中心触点坐标
var lastSendTime = (new Date()).getTime();
var lastSendMsg = '';

var code = '';
var isLogin = false;

function init()
{
    //添加canvas事件监视
    canvasAddListener();
    //绘制手柄图
    cv_init();
    //初始化WebSocket
//    ws_init();
}
function canvasAddListener()
{
    canvas.addEventListener('touchstart', onTouchCodeStart, false);
    canvas.addEventListener('touchmove', onTouchCodeMove, false);
    canvas.addEventListener('touchend', onTouchCodeEnd, false);
}

var numPos = [];
numPos[3] = [170, 230];
numPos[6] = [250, 230];
numPos[9] = [330, 230];
numPos[2] = [170, 150];
numPos[5] = [250, 150];
numPos[8] = [330, 150];
numPos[1] = [170, 70];
numPos[4] = [250, 70];
numPos[7] = [330, 70];

function cv_init()
{
    ctx.rotate(Math.PI*(-0.5));
    ctx.scale(-1, 1);
    cv_clear_code();
}
function cv_clear_code()
{
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.beginPath();
    drawCircle("#333333", 170, 70, 25);
    drawCircle("#CCCCCC", 170, 70, 10);
    drawCircle("#333333", 250, 70, 25);
    drawCircle("#CCCCCC", 250, 70, 10);
    drawCircle("#333333", 330, 70, 25);
    drawCircle("#CCCCCC", 330, 70, 10);
    drawCircle("#333333", 170, 150, 25);
    drawCircle("#CCCCCC", 170, 150, 10);
    drawCircle("#333333", 250, 150, 25);
    drawCircle("#CCCCCC", 250, 150, 10);
    drawCircle("#333333", 330, 150, 25);
    drawCircle("#CCCCCC", 330, 150, 10);
    drawCircle("#333333", 170, 230, 25);
    drawCircle("#CCCCCC", 170, 230, 10);
    drawCircle("#333333", 250, 230, 25);
    drawCircle("#CCCCCC", 250, 230, 10);
    drawCircle("#333333", 330, 230, 25);
    drawCircle("#CCCCCC", 330, 230, 10);

    // canvas.save();

    // var codeArr = code[k].split('');
    // for (var i = 1; i < codeArr.length; i++)
    // {
    // drawLine("rgba(255,255,0,.8)", numPos[codeArr[i - 1]][0], numPos[codeArr[i - 1]][1], numPos[codeArr[i]][0], numPos[codeArr[i]][1], 18);
    // }
}
function cv_clear_input()
{
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.beginPath();
    drawCircle("#3399CC", 125, 140, 90);
    drawCircle("#FFFFFF", 125, 140, 42);
    drawCircle("#3399CC", 125, 140, 38);
    drawCircle("#C24747", 375, 140, 90);
    drawCircle("#FFFFFF", 375, 140, 42);
    drawCircle("#C24747", 375, 140, 38);
}
function drawCircle(color, x, y, r)
{
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.fill();
}
function drawLine(color, x1, y1, x2, y2, w)
{
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.fill();
    ctx.stroke();
}

function beginPlay()
{
    cv_clear_input();
    canvas.removeEventListener('touchstart', onTouchCodeStart, false);
    canvas.removeEventListener('touchmove', onTouchCodeMove, false);
    canvas.removeEventListener('touchend', onTouchCodeEnd, false);
    canvas.addEventListener('touchstart', onTouchStart, false);
    canvas.addEventListener('touchmove', onTouchMove, false);
    canvas.addEventListener('touchend', onTouchEnd, false);
}


function onTouchCodeStart(event)
{
    event.preventDefault();
    cv_clear_code();
    code = '';
    checkTouch(event);
}

function onTouchCodeMove(event)
{
    event.preventDefault();
    checkTouch(event);
}

function onTouchCodeEnd(event)
{
    event.preventDefault();
    uploadCode();
}

function checkTouch(event)
{
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;

    for (var i = 1; i <= 9; i++)
    {
        if ((x - numPos[i][1] - 5) * (x - numPos[i][1] - 5) + (y - numPos[i][0] - 5) * (y - numPos[i][0] - 5) < 30 * 30)
        {
            lightButton(i);
        }
    }

    moveTouchLine(x, y);
}
function lightButton(i)
{
    try
    {
        if (code != '')
        {
            var j = code.substr(-1);
            if (i != j)
            {
                // canvas.restore();
                drawLine("rgba(255,255,0,.8)", numPos[j][0], numPos[j][1], numPos[i][0], numPos[i][1], 18);
                // canvas.save();
                code += i;
                logMsg(code);
            }
        }
        else
        {
            drawCircle("rgba(255,255,0,.8)", numPos[i][0], numPos[i][1], 10);
            // canvas.save();
            code += i;
            logMsg(code);
        }
    }
    catch(ex)
    {
        logMsg('123'+ex);
    }
}
function moveTouchLine(x, y)
{
    try
    {
        if (code != '')
        {
            // var j = code.substr(-1);
            // // canvas.restore();
            // // canvas.save();
            // drawLine("rgba(255,255,0,.8)", numPos[j][0], numPos[j][1], y - 5, x - 5, 18);
        }
    }
    catch(ex)
    {
        logMsg('456'+ex);
    }
}
function uploadCode()
{
    if ((code.length == 4) || (code.length == 5))
    {
//        send('code,' + code);
        send('code,' + code);
//        _('canvas').remove();

    }
}



function onTouchStart(event)
{
    event.preventDefault();
    setPosByTouch(event);
}

function onTouchMove(event)
{
    event.preventDefault();
    setPosByTouch(event);
}

function onTouchEnd(event)
{
    event.preventDefault();
    setPosEnd(event);
}

function setPosByTouch(event)
{
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    setPos(x,y);

    if (event.touches.length == 2) {
        x = event.touches[1].clientX;
        y = event.touches[1].clientY;
        setPos(x,y);
    }

    if (lastSendTime < (new Date()).getTime() - 20)  //30毫秒以上才发送
    {
        send("data," + pos[0][0] + "," + pos[0][1] + "," + pos[1][0] + "," + pos[1][1] + ","
            + getAngle(pos[0][0],pos[0][1]) + "," + getAngle(pos[1][0],pos[1][1]));
        lastSendTime = (new Date()).getTime();
    }

    logMsg(pos[0][0] + "," + pos[0][1] + "," + pos[1][0] + "," + pos[1][1] + ","
        + getAngle(pos[0][0],pos[0][1]) + "," + getAngle(pos[1][0],pos[1][1]));
}

function setPos(x,y)
{
    if (y > 260)  //B按钮
    {
        pos[1][0] = y - posCenter[1][0];
        pos[1][1] = x - posCenter[1][1];
    }
    else  //A按钮
    {
        pos[0][0] = y - posCenter[0][0];
        pos[0][1] = x - posCenter[0][1];
    }
}

function setPosEnd(event)
{
    if (event.touches.length == 0)
    {
        pos = [[0, 0], [0, 0]];
    }
    else
    {
        y = event.touches[0].clientY;
        if (y > 260)  //B按钮
        {
            pos[0][0] = 0;
            pos[0][1] = 0;
        }
        else  //A按钮
        {
            pos[1][0] = 0;
            pos[1][1] = 0;
            return;
        }
    }
    send("data," + pos[0][0] + "," + pos[0][1] + "," + pos[1][0] + "," + pos[1][1] + ","
        + getAngle(pos[0][0],pos[0][1]) + "," + getAngle(pos[1][0],pos[1][1]));
}

function getAngle(x,y)
{
    // -1为没有按 -2为按在内圆 0~6.28为与x正半轴夹角
    if ((x == 0) && (y == 0))  //没有按
    {
        return -1;
    }
    if (x * x + y * y < 32 * 32)  //按在内圆
    {
        return -2;
    }
    var ang;
    if (x == 0)
    {
        ang = (y > 0) ? Math.PI : (-Math.PI);
    }
    else
    {
        ang = Math.atan(y / x);
    }
    if (x < 0)
    {
        ang += Math.PI;
    }
    if (ang < 0)
    {
        ang += Math.PI * 2;
    }
    return ang.toFixed(2);
}



function ws_init()
{
    var host = 'ws://' + wsHost + ':' + wsPort + '/';
    try
    {
        socket = new WebSocket(host);
        logMsg('WebSocket - status '+socket.readyState);
        socket.onopen    = function(msg) { logMsg("Welcome - status " + this.readyState); send('input'); };
        socket.onclose   = function(msg) { logMsg("Disconnected - status " + this.readyState); };
        socket.onmessage =
            function(msg)
            {
                data = msg.data.split(',');
                if (data[1] == 'connect')
                {
                    cv_clear_input();
                    beginPlay();
                    isLogin = true;
                }
            };
    }
    catch(ex)
    {
        logMsg(ex);
    }
}
function send(msg)
{
    if (msg != lastSendMsg)
    {
        lastSendMsg = msg;
        try
        {
            ws.send(msg);
        }
        catch(ex)
        {
            logMsg(ex);
        }
    }
}


var logCnt = 0;
function logMsg(msg)
{
    logCnt++;
    log.innerHTML = logCnt + ' ' + msg;
}

init();