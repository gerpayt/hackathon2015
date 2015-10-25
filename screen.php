<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
	<title>动感麦霸</title>
    <link rel="stylesheet" type="text/css" href="css/screen.css?r=<?php echo rand(); ?>">
</head>

<body style="background:#17453d;">
<div id="box">
	<div id="container" class="container" style="height: 1200px; width: 600px;-webkit-transform-style: preserve-3d;">
	    <img id="outer" src="image/bg.jpg" />

	    <div id="graphicsWrapperID" class="graphicsWrapper" style="display:none">
			<div id="visualizer_wrapper" style="float:left;">
		        <canvas id='canvas' width="600" height="600" style=" position: relative; top: -150px;"></canvas>
		    </div>
		    <div id="timevisualizer_wrapper" style="float:left;">
		        <canvas id='timecanvas2' class="timecanvas" width="600" height="300" style=" position: relative; top: -75px;"></canvas>
		        <canvas id='timecanvas3' class="timecanvas" width="600" height="300" style=" position: relative; top: -200px;"></canvas>
		        <canvas id='timecanvas1' class="timecanvas" width="600" height="300" style=" position: relative; top: -350px;"></canvas>
		    </div>
		</div>

	    <div id="shadow" class="ball shadow"></div>
	    <div id="ad" class="ad">
			<div id="ad1" class="ad1"></div>
			<div id="ad2" class="ad2"></div>
			<div id="ad3" class="ad3"></div>
	    </div>
	    <div id="pos" class="pos"></div>
	    <div id="player" class="player"></div>
	    <img id="net" src="image/net.jpg" />
	    <img id="net_mb1" src="image/net_mb1.jpg" />
	    <img id="ball" class="ball" src="image/ball_dg.png"></div>
	    <img id="net_mb2" src="image/net_mb2.jpg" />
	    <!-- <div id="viewer" class="viewer">
			<div id="viewer1" class="viewer1"></div>
			<div id="viewer2" class="viewer2"></div>
			<div id="viewer3" class="viewer3"></div>
	    </div> -->
<div id="boxPlayer">
	<div class="role-header">
		<div class="inBox box-forward"><img src="image/blank/header/forward.jpg" /></div>
        <div class="inBox box-back"><img src="image/blank/header/back.jpg" /></div>
        <div class="inBox box-left"><img src="image/blank/header/left.jpg" /></div>
        <div class="inBox box-right"><img src="image/blank/header/right.jpg" /></div>
        <div class="inBox box-top"><img src="image/blank/header/top.jpg" /></div>
        <div class="inBox box-bottom"><img src="image/blank/header/bottom.jpg" /></div>
	</div>
	<div class="body-down">
		<div class="role-body">
			<div class="inBox box-forward"><img src="image/blank/body/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/blank/body/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/blank/body/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/blank/body/right.jpg" /></div>
	        <!-- <div class="inBox box-top"><img src="image/blank/body/top.jpg" /></div> -->
	        <div class="inBox box-bottom"><img src="image/blank/body/bottom.jpg" /></div>
		</div>
		<div class="role-hand role-hand-left">
			<div class="inBox box-forward"><img src="image/blank/hand/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/blank/hand/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/blank/hand/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/blank/hand/right.jpg" /></div>
	        <div class="inBox box-top"><img src="image/blank/hand/top.jpg" /></div>
	        <div class="inBox box-bottom"><img src="image/blank/hand/bottom.jpg" /></div>
		</div>
		<div class="role-hand role-hand-right">
			<div class="inBox box-forward"><img src="image/blank/hand/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/blank/hand/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/blank/hand/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/blank/hand/right.jpg" /></div>
	        <div class="inBox box-top"><img src="image/blank/hand/top.jpg" /></div>
	        <div class="inBox box-bottom"><img src="image/blank/hand/bottom.jpg" /></div>
		</div>
		<div class="role-footer">
			<div class="inBox box-forward"><img src="image/blank/footer/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/blank/footer/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/blank/footer/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/blank/footer/right.jpg" /></div>
	        <!-- <div class="inBox box-top"><img src="image/blank/footer/top.jpg" /></div>
	        <div class="inBox box-bottom"><img src="image/blank/footer/bottom.jpg" /></div>-->
		</div>
	</div>
	<div class="role-racket">
		<img src="image/racket.png" />
	</div>
</div>


    </div>
</div>    

<div id="info" style="display:none">
	<div id="scoreID" class="scores" style="display:none">
		<span class="avatar avatar-him"><img src="image/zyt/header/forward.jpg" /></span>
        <span id="score">0:0</span>
		<span class="avatar avatar-me"><img src="image/cf/header/forward.jpg" /></span>
	</div>

	<!-- 歌词显示  -->
	<div id="lyricWrapper" style="display:none">
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
<!-- 
    <div id="graphicsWrapperID" class="graphicsWrapper" style="display:none">

		<div id="visualizer_wrapper">
	        <canvas id='canvas' width="400" height="300"></canvas>
	    </div>
	    <div id="timevisualizer_wrapper">
	        <canvas id='timecanvas1' class="timecanvas" width="300" height="300"></canvas>
	        <canvas id='timecanvas2' class="timecanvas" width="300" height="300"></canvas>
	        <canvas id='timecanvas3' class="timecanvas" width="300" height="300"></canvas>
	    </div>
	</div> -->
</div>




<div class="garden" style="-webkit-transform:scale(0.35); -webkit-transform-origin:0 0; ">
	<div class="mapArea"></div>
	<div class="mapPos"></div>
	<div class="mapPlayer"></div>
</div>


<div id="beforeGame" style="display:;">
	<div class="rolebox role-a role-action-run">
		<div class="role-header">
			<div class="inBox box-forward"><img src="image/blank/header/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/blank/header/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/blank/header/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/blank/header/right.jpg" /></div>
	        <div class="inBox box-top"><img src="image/blank/header/top.jpg" /></div>
	        <div class="inBox box-bottom"><img src="image/blank/header/bottom.jpg" /></div>
		</div>
		<div class="body-down">
			<div class="role-body">
				<div class="inBox box-forward"><img src="image/blank/body/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/blank/body/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/blank/body/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/blank/body/right.jpg" /></div>
		        <!-- <div class="inBox box-top"><img src="image/blank/body/top.jpg" /></div> -->
		        <div class="inBox box-bottom"><img src="image/blank/body/bottom.jpg" /></div>
			</div>
			<div class="role-hand role-hand-left">
				<div class="inBox box-forward"><img src="image/blank/hand/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/blank/hand/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/blank/hand/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/blank/hand/right.jpg" /></div>
		        <div class="inBox box-top"><img src="image/blank/hand/top.jpg" /></div>
		        <div class="inBox box-bottom"><img src="image/blank/hand/bottom.jpg" /></div>
			</div>
			<div class="role-hand role-hand-right">
				<div class="inBox box-forward"><img src="image/blank/hand/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/blank/hand/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/blank/hand/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/blank/hand/right.jpg" /></div>
		        <div class="inBox box-top"><img src="image/blank/hand/top.jpg" /></div>
		        <div class="inBox box-bottom"><img src="image/blank/hand/bottom.jpg" /></div>
			</div>
			<div class="role-footer">
				<div class="inBox box-forward"><img src="image/blank/footer/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/blank/footer/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/blank/footer/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/blank/footer/right.jpg" /></div>
		        <!-- <div class="inBox box-top"><img src="image/blank/footer/top.jpg" /></div>
		        <div class="inBox box-bottom"><img src="image/blank/footer/bottom.jpg" /></div>-->
			</div>
		</div>
	</div>
	<div class="rolebox role-b role-action-run">
		<div class="role-header">
			<div class="inBox box-forward"><img src="image/blank/header/forward.jpg" /></div>
	        <div class="inBox box-back"><img src="image/blank/header/back.jpg" /></div>
	        <div class="inBox box-left"><img src="image/blank/header/left.jpg" /></div>
	        <div class="inBox box-right"><img src="image/blank/header/right.jpg" /></div>
	        <div class="inBox box-top"><img src="image/blank/header/top.jpg" /></div>
	        <div class="inBox box-bottom"><img src="image/blank/header/bottom.jpg" /></div>
		</div>
		<div class="body-down">
			<div class="role-body">
				<div class="inBox box-forward"><img src="image/blank/body/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/blank/body/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/blank/body/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/blank/body/right.jpg" /></div>
		        <!-- <div class="inBox box-top"><img src="image/blank/body/top.jpg" /></div> -->
		        <div class="inBox box-bottom"><img src="image/blank/body/bottom.jpg" /></div>
			</div>
			<div class="role-hand role-hand-left">
				<div class="inBox box-forward"><img src="image/blank/hand/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/blank/hand/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/blank/hand/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/blank/hand/right.jpg" /></div>
		        <div class="inBox box-top"><img src="image/blank/hand/top.jpg" /></div>
		        <div class="inBox box-bottom"><img src="image/blank/hand/bottom.jpg" /></div>
			</div>
			<div class="role-hand role-hand-right">
				<div class="inBox box-forward"><img src="image/blank/hand/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/blank/hand/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/blank/hand/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/blank/hand/right.jpg" /></div>
		        <div class="inBox box-top"><img src="image/blank/hand/top.jpg" /></div>
		        <div class="inBox box-bottom"><img src="image/blank/hand/bottom.jpg" /></div>
			</div>
			<div class="role-footer">
				<div class="inBox box-forward"><img src="image/blank/footer/forward.jpg" /></div>
		        <div class="inBox box-back"><img src="image/blank/footer/back.jpg" /></div>
		        <div class="inBox box-left"><img src="image/blank/footer/left.jpg" /></div>
		        <div class="inBox box-right"><img src="image/blank/footer/right.jpg" /></div>
		        <!-- <div class="inBox box-top"><img src="image/blank/footer/top.jpg" /></div>
		        <div class="inBox box-bottom"><img src="image/blank/footer/bottom.jpg" /></div>-->
			</div>
		</div>
	</div>
    <div id="playerDiv">
        <div class="player-1"></div>
        <div class="player-2"></div>
        <div class="player-3"></div>
        <div class="player-4"></div>
    </div>
    <div class="light" id="light-1" style="display: none"></div>
    <div class="light" id="light-2" style="display: none"></div>
    <div id="codeDiv">
        <canvas id="canvas2" width="500" height="300" style="width:210px; height:120px;"></canvas>
        <canvas id="canvas0" width="500" height="300" style="width:210px; height:120px;"></canvas>
        <canvas id="canvas1" width="500" height="300" style="width:210px; height:120px;"></canvas>
        <canvas id="canvas3" width="500" height="300" style="width:210px; height:120px;"></canvas>
    </div>
    <div id="modeDiv" style="display: none">
        <div class="mode-1" onclick="dongganGame();ws.send('donggan');"></div>
        <div class="mode-2" onclick="maibaGame();ws.send('maiba');"></div>
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
	include('socket/config.php');
?>
	var wsHost = '<?php echo $host; ?>';
	var wsPort = '<?php echo $port; ?>';

	var deviceId = <?php echo $id; ?>;
	var mode = '<?php echo $mode; ?>';
	var debug = <?php echo $debug; ?>;
</script>
<script type="text/javascript" src="script/screen_start.js?r=<?php echo rand(); ?>"></script>
</html>
