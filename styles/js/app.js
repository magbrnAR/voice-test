//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream;                      //stream from getUserMedia()
var rec;                            //Recorder.js object
var input;                          //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
// var pauseButton = document.getElementById("pauseButton");
var result = document.getElementById("speechText")
//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
// pauseButton.addEventListener("click", pauseRecording);
var intermed = document.getElementById("inputtext");
var listenBtn = document.getElementById('myvoice');
listenBtn.addEventListener("click", speak);

function speak() {

	const msg = new SpeechSynthesisUtterance(
		intermed.value
	);
	window.speechSynthesis.speak(msg);

}


function startRecording() {

	var constraints = { audio: true, video: false }


	recordButton.disabled = true;
	stopButton.disabled = false;

	navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		audioContext = new AudioContext();

		gumStream = stream;

		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		rec = new Recorder(input, { numChannels: 1 })

		rec.record()


	}).catch(function (err) {
		//enable the record button if getUserMedia() fails
		recordButton.disabled = false;
		stopButton.disabled = true;
		// pauseButton.disabled = true
	});
}

function pauseRecording() {
	console.log("pauseButton clicked rec.recording=", rec.recording);
	if (rec.recording) {
		//pause
		rec.stop();
		// pauseButton.innerHTML = "Resume";
	} else {
		//resume
		rec.record()
		// pauseButton.innerHTML = "Pause";

	}
}

function stopRecording() {
	stopButton.disabled = true;
	recordButton.disabled = false;
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {

	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var filename = "yash"//new Date().toISOString();

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//upload link
	// var upload = document.createElement('a');
	// var xhr = new XMLHttpRequest();
	// xhr.onload = function (e) {
	// 	if (this.readyState === 4) {
	// 		window.output = JSON.parse(e.target.responseText);
	// 		console.log("Server ASR returned: ", output);
	// 		document.getElementById("speechText").innerHTML = "USER : " + output.query;
	// 		document.getElementById("aiText").innerHTML = "XOXI : " + output.response;
	// 		const msg = new SpeechSynthesisUtterance(
	// 			output.response
	// 		);
	// 		window.speechSynthesis.speak(msg);


	// 	}
	// };
	var fd = new FormData();
	fd.append("file", blob, filename);
	// xhr.open("POST", "http://35.239.35.55:4444/yash");
	// xhr.send(fd);
	var settings = {
		"url": "https://abrixs.herokuapp.com/yash",
		"method": "POST",
		"timeout": 0,
		"processData": false,
		"mimeType": "multipart/form-data",
		"contentType": false,
		"data": fd
	};

	$.ajax(settings).done(function (result) {
		window.output = JSON.parse(result);
		document.getElementById("speechText").innerHTML = "USER : " + output["query"];
		document.getElementById("aiText").innerHTML = "XOXI : " + output["response"];
		const msg = new SpeechSynthesisUtterance(
			output.response
		);
		window.speechSynthesis.speak(msg);
	});

}
