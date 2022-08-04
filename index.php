<!DOCTYPE html>
<html>

<head>
    <?php header('Access-Control-Allow-Origin: *'); ?>

    <meta charset="UTF-8">
    
    <!-- <title>Simple Recorder.js demo with record, stop and pause - addpipe.com</title> -->
</head>

<body>
    <center>
    <br><br><br><br><br><br>
    <!-- <h1>Simple Recorder.js demo</h1> -->
    <div id="controls">
        <button id="recordButton">Record</button>
        <!-- <button id="pauseButton" disabled>Pause</button> -->
        <button id="stopButton" disabled>Stop</button>

        <!-- <button type="button" id='myvoice'>Listen to me</button> -->

    </div>

    <!-- <div id="formats">Format: start recording to see sample rate</div> -->
    <!-- <ol id="recordingsList"></ol> -->
    <!-- &lt;!&ndash; inserting these scripts at the end to be able to use all the elements in the DOM &ndash;&gt; -->
    <script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
    <script src="styles/js/app.js"></script>
<!--     {% if transcript != "" %} -->
    <div id="speechTranscriptContainer">
        <h1>Results</h1>
        <p id="speechText"></p>
        <p id="aiText"></p>
    </div>
</center>
<!--     {% endif %} -->
</body>

</html>
