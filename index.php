<!DOCTYPE html>
<html>

<head>
    <?php header('Access-Control-Allow-Origin: *'); ?>

    <meta charset="UTF-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

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
<body>

<div class = "content">
    <center>
    <br><br><br><br><br><br>
    <!-- <h1>Simple Recorder.js demo</h1> -->
    <div id="controls">
        <textarea rows="5" cols="60" class="content" id="inputtext" type="text"></textarea>
        <button class="myBtn" id="myvoice" >speack</button><br><br><br>
        <button class="myBtn" id="recordButton">Record</button>
        <!-- <button id="pauseButton" disabled>Pause</button> -->
        <button id="stopButton" disabled>Stop</button>

        <!-- <button type="button" id='myvoice'>Listen to me</button> -->

    </div>
    <br><br><br>
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
  <source src="video_1.mp4" type="video/mp4">
</video>

<!--     {% endif %} -->
</body>

</html>
