//wa





var canvasCoor = function(option) {
    this.target = option.target;
    this.pic = this.target.getContext('2d');
    this.height = this.target.height;
    this.ratio = 1;
    this.coorArr=option.coorArr;
    this.color=option.color;
};
canvasCoor.prototype = {
    drawContLine:function(option){    
        this.pic.beginPath();
        var path = option.path;
        this.pic.moveTo(path[0][0],path[0][1]);
        var n = 1;
        var len = path.length;
        for(;n<len;n++){
            this.pic.lineTo(path[n][0],path[n][1]);
        }
        this.pic.lineWidth = 5;
        this.pic.strokeStyle = this.color;
        this.pic.stroke();
        this.pic.closePath();
    },
    transforCoor:function(option){
        var that = this;
        var scroes = option.scroes;
        var scale = 10;
        var len = scroes.length;
        var a_path = [];
        for(var n=0;n<len;n++){
            var x = that.height - (scroes[n])*that.ratio;
            var arry = [scale*(n+1),x];
            a_path.push(arry);
        }
        this.drawContLine({'path':a_path,'color':that.color});
    },
    resetCanvas:function(){
        this.pic.clearRect(0,0,800,400);
    },
    init:function(){
        this.resetCanvas();
        for(var i=0;i<this.coorArr.length;i++){
            this.transforCoor(this.coorArr[i]);
        }
    }
}

var Selected = function(option) {
    this.audio = option.audio;
    this.audio2 = option.audio2; 
    this.audio3 = option.audio3; 
    this.lyricContainer = document.getElementById('lyricContainer');
    this.lyricArr = null;
};
Selected.prototype = {
    constructor: Selected,
    //请求歌词文件
    getLyric:function(){
        var that = this;
        var url = "sound/song.lrc";
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'text';
        request.onload = function() {
            var lyric = request.response;
//            console.log(lyric);
            that.lyricArr = that.parseLyric(lyric);
            that.lyricToDom();
            that.audio.volume = 0;
            that.audio.onplay=function(){
                new Visualizer({
                    audioSrc:that.audio.src,
                    audioSrc2:that.audio2.src
                }).ini();
                setTimeout(function(){
                    new Record({
                        audioSrc:that.audio2.src,
                        canvas:document.getElementById("timecanvas2"),
                        color:"#f00",
                        role:1
                    }).ini();
                    new Record({
                        audioSrc:that.audio3.src,
                        canvas:document.getElementById("timecanvas3"),
                        color:"#fff",
                        role:2
                    }).ini();
                },3000);
            }
        };
        request.send();
    },
    //分隔歌词
    parseLyric:function(text){
        var lines = text.split('\n');
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        var pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
        var result = [];
        while (!pattern.test(lines[0])) {
            lines = lines.slice(1);
        };
        lines[lines.length - 1].length === 0 && lines.pop();
        for(var i=0;i<lines.length;i++){
            var v = lines[i];
            var time = v.match(pattern) ? v.match(pattern)[0] : "3000";
            var value = v.replace(pattern, '');
            var t = time.slice(1, -1).split(':');

            var r = parseFloat(parseInt(t[0], 10) * 60 + parseFloat(t[1])).toFixed(4);
            var date = (r / 60).toFixed(5);
            
            var s = parseInt(t[0]) + (parseFloat(t[1])/60).toFixed(4);

            console.log(s);
            result.push([r,value]);
            // result.push([date,value]);
        }
        console.log(result);
        return result;
    },
    //显示到Dom
    lyricToDom : function(){
        var that = this;
        //监听ontimeupdate事件
        that.audio.ontimeupdate = function(e) {
            //遍历所有歌词，看哪句歌词的时间与当然时间吻合
            console.log(that.lyricArr);
            for (var i = 0, l = that.lyricArr.length; i < l; i++) {
                console.log(this.currentTime);
                if (this.currentTime > that.lyricArr[i][0]) {
                    //显示到页面
                    that.lyricContainer.innerHTML = that.lyricArr[i][1];
                };
            };
        }
    },
    init:function(){
        this.getLyric()
    }
};


new Selected({audio:document.getElementById("audio"),audio2:document.getElementById("audio2"),audio3:document.getElementById("audio3")}).init();

//样本图谱
var Visualizer = function(option) {
    this.audioSrc = option.audioSrc;
    this.audioSrc2 = option.audioSrc2;
    this.audioContext = null;
    this.source = null; 
    this.infoUpdateId = null; 
    this.animationId = null;
    this.status = 0;
    this.forceStop = false;
    this.allCapsReachBottom = false;
    this.coor={
        scroes:[],
        color:option.color || "#0f0"
    };
    this.coor2=
        {
        scroes:[],
        color:"#555"
    };

};
Visualizer.prototype = {
    ini: function() {
        var that = this;
        this._prepareAPI();
        this._start();
        setTimeout(function(){
            that._audioEnd(that);
            console.log("end");
        },102*1000);
    },
    _prepareAPI: function() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia ||  navigator.webkitGetUserMedia || navigator.msGetUserMedia;
        try {
            // this.audioContext = new AudioContext();
            this.audioContext = AudioContext;
        } catch (e) {
            console.log(e);
        }
    },
    _start: function() {
        var that = this;
        var audioContext = that.audioContext;
        var getSound = new XMLHttpRequest();
        getSound.open("GET", this.audioSrc, true);
        getSound.responseType = "arraybuffer";
        getSound.onload = function() 
        {
            audioContext.decodeAudioData(getSound.response, function(buffer)
            {
                that._visualize(audioContext, buffer);
            });
        }
        getSound.send();
    },
    _visualize: function(audioContext, buffer , type) {
        var audioBufferSouceNode = audioContext.createBufferSource();
        var analyser = audioContext.createAnalyser();
        var that = this;
        audioBufferSouceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        audioBufferSouceNode.buffer = buffer;
        if (!audioBufferSouceNode.start) {
            audioBufferSouceNode.start = audioBufferSouceNode.noteOn;
            audioBufferSouceNode.stop = audioBufferSouceNode.noteOff;
        };
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.source !== null) {
            this.source.stop(0);
        }
        
        audioBufferSouceNode.start(0);

        this.status = 1;
        this.source = audioBufferSouceNode;
        audioBufferSouceNode.onended = function() {
            that._audioEnd(that);
        };

        this._drawSpectrum(analyser);         
    },
    _drawSpectrum: function(analyser) {
        var that = this,
            canvas = document.getElementById('canvas'),
            cwidth = canvas.width,
            cheight = canvas.height - 2,
            meterWidth = 10, 
            gap = 2, 
            capHeight = 5,
            capStyle = '#fff',
            meterNum = 800 / (10 + 2), 
            capYPositionArray = []; 
        ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(1, '#0f0');
        gradient.addColorStop(0.5, '#ff0');
        gradient.addColorStop(0, '#f00');
        
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            if(that.coor.scroes.length<50){
                that.coor.scroes.push(array[100]);
            }else{
                that.coor.scroes.shift();
                that.coor.scroes.push(array[100]);
            }
            var coorArr = [];
            coorArr.push(that.coor);
            new canvasCoor({
                target:document.getElementById("timecanvas1"),
                coorArr:coorArr,
                color:"#0f0"
            }).init();
            if (that.status === 0) {
                for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = 0;
                };
                allCapsReachBottom = true;
                for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                    allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
                };
                if (allCapsReachBottom) {
                    cancelAnimationFrame(that.animationId); 
                    return;
                };
            };
            var step = Math.round(array.length / meterNum); //sample limited data from the total array
            ctx.clearRect(0, 0, cwidth, cheight);
            for (var i = 0; i < meterNum; i++) {
                var value = array[i * step];
                if (capYPositionArray.length < Math.round(meterNum)) {
                    capYPositionArray.push(value);
                };
                ctx.fillStyle = capStyle;
                //draw the cap, with transition effect
                if (value < capYPositionArray[i]) {
                    ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                } else {
                    ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                    capYPositionArray[i] = value;
                };
                ctx.fillStyle = gradient; 
                ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
            }
            that.animationId = requestAnimationFrame(drawMeter);
        }
        this.animationId = requestAnimationFrame(drawMeter);
    },
    _audioEnd: function(instance) {
        if (this.forceStop) {
            this.forceStop = false;
            this.status = 1;
            return;
        };
        this.status = 0;

    },
}

// new Visualizer({color:"#f00"}).ini();




//录音频谱
var Record = function(option) {
    this.audioSrc = option.audioSrc;
    this.canvas = option.canvas;
    this.audioContext = null;
    this.source = null;
    this.role = option.role;
    this.color = option.color;
    this.coor={
        scroes:[],
        params:[],
        color:option.color
    };
};
Record.prototype = {
    ini: function() {
        this._prepareAPI();
        this._start();
        setTimeout(function(){
            that._audioEnd(that);
             console.log("end2");
        },102*1000);
    },
    _prepareAPI: function() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia ||  navigator.webkitGetUserMedia || navigator.msGetUserMedia;
        try {
            this.audioContext = AudioContext || new AudioContext();
        } catch (e) {
            console.log(e);
        }
    },
    _start: function() {
        var that = this;
        console.log(that.audioSrcA)
        var audioContext = that.audioContext;
        var getSound = new XMLHttpRequest();
        getSound.open("GET", that.audioSrc, true);
        getSound.responseType = "arraybuffer";
        getSound.onload = function() 
        {
            audioContext.decodeAudioData(getSound.response, function(buffer)
            {
                that._visualize(audioContext, buffer);
            });
        }
        getSound.send();
    },
    _visualize:function(audioContext, buffer){
        var audioBufferSouceNode = audioContext.createBufferSource();
        var analyser = audioContext.createAnalyser();
        
        var panner = audioContext.createPanner();
        var volume = audioContext.createGain();
        
        var gainNode = audioContext.createGain();
        gainNode.gain.value = 0;

        var that = this;

        audioBufferSouceNode.connect(analyser);
        analyser.connect(gainNode); 
        gainNode.connect(audioContext.destination);

        audioBufferSouceNode.buffer = buffer;
        if (!audioBufferSouceNode.start) {
            audioBufferSouceNode.start = audioBufferSouceNode.noteOn;
            audioBufferSouceNode.stop = audioBufferSouceNode.noteOff;
        };
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.source !== null) {
            this.source.stop(0);
        }
        // TODO
        audioBufferSouceNode.start(0);

        this.status = 1;
        this.source = audioBufferSouceNode;
        audioBufferSouceNode.onended = function() {
            that._audioEnd(that);
        };



        this._drawSpectrum(analyser); 
    },
    _drawSpectrum: function(analyser) {
        var that = this;
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            
            // console.log(array[10]);
            //TODO random代替
            if (that.role == 1) {
                // console.log(soundmeter_level1);
                var param = soundmeter_level1;
            } else {
                // console.log(soundmeter_level2);
                var param = soundmeter_level2;
            }
            //parseInt(100*Math.random());

            if(param<0.1){
                param = 0;
            }else{
                param = 1
            }
            // console.log(array[100]);
            if(that.coor.scroes.length<50){
//                that.coor.scroes.push(array[100]);
                that.coor.scroes.push(parseInt(array[100]*param));

            }else{
                that.coor.scroes.shift();
//                that.coor.scroes.push(array[100]);
                that.coor.scroes.push(parseInt(array[100]*param));

            }


            var coorArr = [];
            coorArr.push(that.coor);
            new canvasCoor({
                target:that.canvas,
                coorArr:coorArr,
                color:that.color
            }).init();
            that.animationId = requestAnimationFrame(drawMeter);
        }
       
        this.animationId = requestAnimationFrame(drawMeter);
       
    },
    _audioEnd: function(instance) {
        if (this.forceStop) {
            this.forceStop = false;
            this.status = 1;
            return;
        };
        this.status = 0;
    },
}