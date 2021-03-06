<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
	<title>3D体感网球对战</title>
	<style type="text/css">
	.garden {
	  position: relative;
	  width : 200px;
	  height: 200px;
	  border: 5px solid #CCC;
	  border-radius: 10px;
	}

	.ball {
	  position: absolute;
	  top   : 90px;
	  left  : 90px;
	  width : 20px;
	  height: 20px;
	  background: green;
	  border-radius: 100%;
	}</style>

</head>

<body>
<canvas id="canvas" width="300" height="500"></canvas>
<div class="garden">
        <div class="ball"></div>
    </div>
    <div id="log" >
    </div>
    <div id="log2" >
    </div>
    <div id="pos" class="main room_main">
    </div>
    <div id="main" class="main room_main">
    </div>
</body>
<script>
    <?php
        $id = isset($_GET['id']) ? $_GET['id'] : 1;  //1为A 2为B
        include('socket/config.php');
    ?>
    var wsHost = '<?php echo $host; ?>';
    var wsPort = '<?php echo $port; ?>';

    var deviceId = <?php echo $id; ?>;
</script>
<script type="text/javascript" src="script/func.js?r=<?php echo rand(); ?>"></script>
<script type="text/javascript" src="script/start.js?r=<?php echo rand(); ?>"></script>
<script type="text/javascript" src="script/ws.js?r=<?php echo rand(); ?>"></script>
<script>
	var ws = new HandlePlayWS(_('log'), deviceId);

	var ball   = document.querySelector('.ball');
	var garden = document.querySelector('.garden');
	var maxX = garden.clientWidth  - ball.clientWidth;
	var maxY = garden.clientHeight - ball.clientHeight;

	navigator.vibrate = navigator.vibrate ||
       navigator.webkitVibrate ||
       navigator.mozVibrate ||
       navigator.msVibrate;
 

	// _('pic').style.webkitTransform = "rotate(30deg) rotate3d(1,0,0, 70deg)";

</script>
</html>
