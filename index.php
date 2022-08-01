<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Simple Recorder.js demo with record, stop and pause - addpipe.com</title>
    <meta name="viewport" http-equiv="Content-Security-Policy" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <h1>Simple Recorder.js demo</h1>

    <div id="controls">
        <button id="recordButton">Record</button>
        <button id="pauseButton" disabled>Pause</button>
        <button id="stopButton" disabled>Stop</button>
    </div>
    <div id="formats">Format: start recording to see sample rate</div>
    <p><strong>Recordings:</strong></p>
    <ol id="recordingsList"></ol>
    &lt;!&ndash; inserting these scripts at the end to be able to use all the elements in the DOM &ndash;&gt;
    <script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
    <script src="styles/js/app.js"></script>
<!--     {% if transcript != "" %} -->
    <div id="speechTranscriptContainer">
        <h1>Results</h1>
        <p id="speechText">{{transcript}}</p>
    </div>
<!--     {% endif %} -->
</body>

</html>
