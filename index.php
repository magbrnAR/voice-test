<!DOCTYPE html>
<html>

<head>
    <?php header('Access-Control-Allow-Origin: *'); ?>

    <meta charset="UTF-8">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- <title>Simple Recorder.js demo with record, stop and pause - addpipe.com</title> -->
</head>
<style>
    #myVideo {
        width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}

#speechTranscriptContainer {
  border-style:inset;
  color:#ffffff;
  background: rgba(0, 0, 0, 0.5);
    width: 70%;
    height:70%;
}
/* #aiText {
  border-style:outset;
  color:#ffffff;
  background: rgba(0, 0, 0, 0.5);
    width: 70%;
    height:70%;
    
} */
bodY {
  margin: 10;
  padding: 10;
  box-sizing: border-box;
}
.center {
  
  display: flex;
  justify-content: center;
  align-items: center;
}
.wave {
  width: 5px;
  height: 100px;
  background: linear-gradient(45deg, cyan, #fff);
  margin: 10px;
  animation: wave 1s infinite;
  border-radius: 20px;
}
.wave:nth-child(2) {
  animation-delay: 0.1s;
}
.wave:nth-child(3) {
  animation-delay: 0.2s;
}
.wave:nth-child(4) {
  animation-delay: 0.3s;
}
.wave:nth-child(5) {
  animation-delay: 0.4s;
}
.wave:nth-child(6) {
  animation-delay: 0.5s;
}
.wave:nth-child(7) {
  animation-delay: 0.6s;
}
.wave:nth-child(8) {
  animation-delay: 0.7s;
}
.wave:nth-child(9) {
  animation-delay: 0.8s;
}
.wave:nth-child(10) {
  animation-delay: 0.9s;
}

@keyframes wave {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}



.content{
  
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}

.myBtn {
  border: none;
  background: #2e3c53;
  color: #fff;
  cursor: pointer;
}

.myBtn:hover {
  background: #ddd;
  color: black;
}
</style>
<body class="container mt-5 bg-dark">
<select id="voices" class="form-select bg-secondary text-light"></select>
    <div class="d-flex mt-4 text-light">
      <div>
        <p class="lead">Volume</p>
        <input type="range" min="0" max="1" value="1" step="0.1" id="volume" />
        <span id="volume-label" class="ms-2">1</span>
      </div>
      <div class="mx-5">
        <p class="lead">Rate</p>
        <input type="range" min="0.1" max="2" value="1" id="rate" step="0.1" />
        <span id="rate-label" class="ms-2">1</span>
      </div>
      <div>
        <p class="lead">Pitch</p>
        <input type="range" min="0" max="2" value="1" step="0.1" id="pitch" />
        <span id="pitch-label" class="ms-2">1</span>
      </div>
    </div>
<div class = "content">
    <center>
    <br>
    <!-- <h1>Simple Recorder.js demo</h1> -->
    <div id="controls">
        <textarea rows="5" cols="60" class="content" id="inputtext" type="text"></textarea>
        <button class="myBtn" id="myvoice" >speack</button><br>
        <button  id="recordButton">Record</button>
        <!-- <button id="pauseButton" disabled>Pause</button> -->
        <button id="stopButton" disabled>Stop</button>

        <!-- <button type="button" id='myvoice'>Listen to me</button> -->

    </div>
    <br>
    <!-- <div id="formats">Format: start recording to see sample rate</div> -->
    <!-- <ol id="recordingsList"></ol> -->
    <!-- &lt;!&ndash; inserting these scripts at the end to be able to use all the elements in the DOM &ndash;&gt; -->
    <script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
    <script src="styles/js/app.js"></script>
<!--     {% if transcript != "" %} -->
    <div id="speechTranscriptContainer">
        <!-- <h1>Results</h1> -->
        <p id="speechText"></p>
        <br><br>
        <p id="aiText"></p>

        
    </div>
</center>
</div>
<video autoplay muted loop id="myVideo">
  <source src="background.mp4" type="video/mp4">
</video>




<span class="center" id="myname" >
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
</span>


<script>document.getElementById("myname").style.display="none"</script>


<!--     {% endif %} -->
</body>

</html>
