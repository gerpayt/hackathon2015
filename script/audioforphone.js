

document.getElementById("recordBtn").onclick = function() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.audioContext = new AudioContext();
    } catch (e) {
      alert('Web Audio API not supported.');
    }
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia ||  navigator.webkitGetUserMedia || navigator.msGetUserMedia;
    var constraints = window.constraints = {
      audio: true,
      video: false
    };

    function successCallback(stream) {
      window.stream = stream;
      var soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
      soundMeter.connectToSource(stream);

      setInterval(function() {
        var param = soundMeter.instant.toFixed(4)
        //webparam 通过websocket传输
        ws.send('volume,'+deviceId+',' + param);
          console.log('volume,'+deviceId+',' + param);

      }, 200);
    }

    function errorCallback(error) {
      console.log('navigator.getUserMedia error: ', error);
    }

    navigator.getUserMedia(constraints, successCallback, errorCallback);


}