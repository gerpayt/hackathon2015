
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
} else {
    _('beforeGame').style.display = 'none';
}

var roleBox = document.querySelector(".rolebox");
// roleBox.addEventListener('webkitAnimationEnd', function(){
var continueMovie = function(role)
{
    // 动画结束修改图片
    if (role == 1) {
//        var roleBox1 = roleBox.cloneNode(true);
        var roleBox1 = document.querySelector(".role-a");
        [].slice.call(roleBox1.querySelectorAll("img")).forEach(function(item, index){
            var attr = item.getAttribute("src");
            item.setAttribute("src", attr.replace("blank", "zyt"));
        });

        [].slice.call(document.querySelectorAll(".boxPlayerA img")).forEach(function(item, index){
            var attr = item.getAttribute("src");
            item.setAttribute("src", attr.replace("blank", "zyt"));
        });

        // 添加Class
        var roleClass = roleBox1.getAttribute("class");
        roleBox1.classList.remove("role-action-run");
        roleBox1.classList.add("role-action-jump");

        _('light-1').style.display = 'block';

    } else {
//        var roleBox2 = roleBox.cloneNode(true);
        var roleBox2 = document.querySelector(".role-b");

        [].slice.call(roleBox2.querySelectorAll("img")).forEach(function(item, index){
            var attr = item.getAttribute("src");
            item.setAttribute("src", attr.replace("blank", "cf"));
        });

        [].slice.call(document.querySelectorAll(".boxPlayerB img")).forEach(function(item, index){
            var attr = item.getAttribute("src");
            item.setAttribute("src", attr.replace("blank", "cf"));
            item.setAttribute("src", attr.replace("blank", "cf"));
        });

        // 添加Class
        var roleClass = roleBox2.getAttribute("class");
        roleBox2.classList.remove("role-action-run");
        roleBox2.classList.add("role-action-jump");

        _('light-2').style.display = 'block';
    }
}

var finishMovie = function()
// 双方划码完成// 选择模式
{
    setTimeout(function(){
        _('codeDiv').style.display = "none";
        _('playerDiv').style.display = "none";
        _('light-1').style.display = "none";
        _('light-2').style.display = "none";
        _('modeDiv').style.display = "block";
    }, 2500);

//    document.querySelector("#beforeGame").remove();
}
var dongganGame = function()
{
    document.querySelector("#beforeGame").style.cssText = "-webkit-transition: all 1s; left: -9999px;";
    wa.play();
//    document.querySelector("#beforeGame").remove();
    var s = document.createElement('script');
    s.src = 'script/screen_dg.js';
    document.getElementsByTagName('head')[0].appendChild(s);
//    document.innerHTML += '<script type="text/javascript" src=></script>';
}

var maibaGame = function()
{
    document.querySelector("#beforeGame").style.cssText = "-webkit-transition: all 1s; left: -9999px;";
    wa.play();
//    document.querySelector("#beforeGame").remove();
    var s = document.createElement('script');
    s.src = 'script/screen_mb.js';
    document.getElementsByTagName('head')[0].appendChild(s);
//    document.innerHTML += '<script type="text/javascript" src=></script>';
}



var boxPlayerA = document.querySelector("#boxPlayer");
var boxPlayerB = boxPlayerA.cloneNode(true);
_('container').appendChild(boxPlayerB);
boxPlayerA.className = 'playerA boxPlayerA';
boxPlayerB.className = 'playerA boxPlayerB';




if (mode == 'single')
{
    continueMovie(1);
    continueMovie(2);
    document.querySelector(".role-action-jump").addEventListener("webkitAnimationEnd", function(){
        document.querySelector(".role-action-jump").classList.add("bodyAni")
    })
    _('info').style.display = "none";
//    if ()
    boxPlayerB.style.display = "none";
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
