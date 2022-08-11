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
// listenBtn.addEventListener('click', (e) => {
// 	e.preventDefault();

// 	const msg = new SpeechSynthesisUtterance(
// 		"Hello, hope my code is helpful"
// 	);
// 	window.speechSynthesis.speak(msg);

// });



function startRecording() {
	console.log("recordButton clicked");

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/

	var constraints = { audio: true, video: false }

	/*
		Disable the record button until we get a success or fail from getUserMedia()
	*/

	recordButton.disabled = true;
	stopButton.disabled = false;
	// pauseButton.disabled = false

	/*
		We're using the standard promise based getUserMedia()
		https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device
		*/
		audioContext = new AudioContext();

		//update the format
		// document.getElementById("formats").innerHTML = "Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz"

		/*  assign to gumStream for later use  */
		gumStream = stream;

		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/*
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input, { numChannels: 1 })

		//start the recording process
		rec.record()

		console.log("Recording started");

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
	console.log("stopButton clicked");

	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	recordButton.disabled = false;
	// pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	// pauseButton.innerHTML = "Pause";

	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {

	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	// var li = document.createElement('li');
	// var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
	var filename = "yash"//new Date().toISOString();

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//upload link
	var upload = document.createElement('a');
	upload.href = "http://192.168.71.154:5000/yash";
	// upload.innerHTML = "Upload";
	// upload.addEventListener("click", function (event) {
// 	var xhr = new XMLHttpRequest();
// 	// var output = "";
// 	xhr.onload = function (e) {
// 		if (this.readyState === 4) {
// 			window.output = JSON.parse(e.target.responseText);
// 			console.log("Server ASR returned: ", output);
// 			document.getElementById("speechText").innerHTML = "USER : " + output.query;
// 			document.getElementById("aiText").innerHTML = "XOXI : " + output.response;
// 			const msg = new SpeechSynthesisUtterance(
// 				output.response
// 			);
// 			window.speechSynthesis.speak(msg);


// 		}
// 	};
	var fd = new FormData();
	fd.append("file", blob, filename);
	var settings = {
		"url": "http://35.239.35.55:4444/yash",
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


	// var xhr2 = new XMLHttpRequest();
	// xhr2.onload = function (e) {
	// 	if (this.readyState === 4) {
	// 		const ai_result = JSON.parse(e.target.responseText);
	// 		console.log("Server ai returned: ", ai_result);
	// 		document.getElementById("ai_text").innerHTML = ai.response;
	// 	}
	// 	console.log("ouput : ", window.output);
	// 	xhr2.open("POST", "http://localhost:8000/ai_query");
	// 	var data = JSON.stringify({ "text": document.getElementById("speechText").textContent });
	// 	console.log(data);
	// 	xhr2.send(data);
	// };

	// })
	// li.appendChild(document.createTextNode(" "))//add a space in between
	// li.appendChild(upload)//add the upload link to li

	//add the li element to the ol
	// recordingsList.appendChild(li);
}
