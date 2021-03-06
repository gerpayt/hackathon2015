<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
	<title>3D体感网球对战</title>
    <link rel="stylesheet" type="text/css" href="css/screen.css?r=<?php echo rand(); ?>">
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
	<div class="scores" style="display:none">
		<span class="avatar avatar-him"><img src="image/A.jpg" /></span>
		<span id="score">0:0</span>
		<span class="avatar avatar-me"><img src="image/B.jpg" /></span>
	</div>

	<!-- 歌词显示  -->
	<div id="lyricWrapper">
        <div id="songPlayer">
	        <audio controls="" id="audio" src="sound/song.mp3">not supported</audio>
	    </div>
	    <div id="songPlayer2">
	        <audio controls="" id="audio2" src="sound/songA.mp3" style="display:none">not supported</audio>
	    </div>
	    <div id="songPlayer3">
	        <audio controls="" id="audio3" src="sound/songB.mp3" style="display:none">not supported</audio>
	    </div>

        <div id="lyricContainer">
             歌词显示  
        </div>
    </div>

    <div class="graphicsWrapper">
		
		<div id="visualizer_wrapper">
	        <canvas id='canvas' width="400" height="300"></canvas>
	    </div>
	    <div id="timevisualizer_wrapper">
	        <canvas id='timecanvas1' class="timecanvas" width="300" height="300"></canvas>
	        <canvas id='timecanvas2' class="timecanvas" width="300" height="300"></canvas>
	        <canvas id='timecanvas3' class="timecanvas" width="300" height="300"></canvas>
	    </div>
	</div>
</div> 




<div class="garden" style="-webkit-transform:scale(0.35); -webkit-transform-origin:0 0; ">
	<div class="mapArea"></div>
	<div class="mapPos"></div>
	<div class="mapPlayer"></div>
</div>


<div id="beforeGame" style="display:none;">
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
		<!-- <div class="welcome-text">大家好，我是小胡子哥~</div> -->
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

<script>
<?php
	$id = isset($_GET['id']) ? $_GET['id'] : 1;  //1为A 2为B
	$mode = isset($_GET['mode']) ? $_GET['mode'] : 'team';  //single为单人 其余为多人
	$debug = isset($_GET['debug']) ? $_GET['debug'] : 0;  //debug下将自动打
	include('socket/config.php');
?>
	var wsHost = '<?php echo $host; ?>';
	var wsPort = '<?php echo $port; ?>';

	var deviceId = <?php echo $id; ?>;
	var mode = '<?php echo $mode; ?>';
	var debug = <?php echo $debug; ?>;
</script>
<script type="text/javascript" src="script/audio.js?r=<?php echo rand(); ?>"></script>

</html>
