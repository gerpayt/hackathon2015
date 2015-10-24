// Module Level Web Audio Part
// 模块层 WebAudio音频功能模块

//WebAudio音频的主类
var WAudio = function(source, level)
{
	this.source = source;
	this.level = level;
	this.buffer = null;
	this.isLoaded = false;
	this.panner = null;
	this.volume = null;
	this.isEnabled = true;
	
	//初始化
	this.init();
}

AudioContext = new AudioContext();

//初始化
WAudio.prototype.init = function()
{
	// if (typeof(window.AudioContext) === 'undefined')
	// {
	// 	try
	// 	{
	// 		// AudioContext = new webkitAudioContext;
	// 	}
	// 	catch(e)
	// 	{
	// 		this.isEnabled = false;
	// 	}
	// }
	if (this.isEnabled)
	{
		this.panner = AudioContext.createPanner();
		this.volume = AudioContext.createGain();
		if (!this.level)
		{
			this.volume.gain.value = 1;
		}
		else
		{
			this.volume.gain.value = this.level;
		}
		
		var _this = this;
		var getSound = new XMLHttpRequest();  //WebAudio通过httprequest的方式获得源
		getSound.open("GET", this.source, true);
		getSound.responseType = "arraybuffer";
		getSound.onload = function()  //获取解码后存在缓存里
		{
			AudioContext.decodeAudioData(getSound.response, function(buffer)
			{
				_this.buffer = buffer;
				_this.isLoaded = true;
			});
		}
		getSound.send();
	}
}
//发声
WAudio.prototype.play = function()
{
	if (this.isEnabled && (this.isLoaded === true))
	{
		var playSound = AudioContext.createBufferSource(); //从缓存里读取
		playSound.buffer = this.buffer;
		playSound.connect(this.panner);
		this.panner.connect(this.volume);  //如果不需要调节音量和声道，直接connect到destination
		this.volume.connect(AudioContext.destination);
		// playSound.noteOn(0);  //发音延迟
		playSound.start();
	}
}
//设置音量大小
WAudio.prototype.setVolume = function(level)
{
	if (this.isEnabled)
	{
		this.volume.gain.value = level;
	}
}
//设置声道
WAudio.prototype.setPan = function(xValue)
{
	if (this.isEnabled)
	{
		this.panner.setPosition(xValue,0,0);
	}
}

