//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;


let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
	voices = window.speechSynthesis.getVoices();
	speech.voice = voices[0];
	let voiceSelect = document.querySelector("#voices");
	voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

document.querySelector("#rate").addEventListener("input", () => {
	const rate = document.querySelector("#rate").value;
	speech.rate = rate;
	document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
	const volume = document.querySelector("#volume").value;
	speech.volume = volume;
	document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
	const pitch = document.querySelector("#pitch").value;
	speech.pitch = pitch;
	document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
	speech.voice = voices[document.querySelector("#voices").value];
});



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

	// const msg = new SpeechSynthesisUtterance(
	// 	intermed.value
	// );
	speech.text = intermed.value
	// msg.rate = 0.75;
	// console.log(window.speechSynthesis.getVoices())//) = 1.5;
	window.speechSynthesis.speak(speech);

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
	document.getElementById("myname").style.display = "flex";
	stopButton.disabled = true;
	recordButton.disabled = true;
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
// 	const fd = new FormData();
// 	fd.append("file", blob);
// 	const options = {
// 		method: 'POST',
// 		headers: {accept: 'application/json', 'Content-Type': 'application/json'}
// 	};
// 	options.body = fd
// 	console.log(options)
// 	fetch('http://34.136.44.96:4444/yash', options).then(data => data.json())
// 		.then(data => {
// 			// window.output = JSON.parse(e.target.responseText);
// 			// console.log("Server ASR returned: ", output);
// 			document.getElementById("speechText").innerHTML = "USER : " + data.query;
// 			document.getElementById("aiText").innerHTML = "XOXE : " + data.response;
// 			speech.text = data.response
// 			window.speechSynthesis.speak(speech);
// 			recordButton.disabled = false;
// 			document.getElementById("myname").style.display = "none";
// 		}).catch((error) => {
// 			console.error('Error:', error);
// 		});
	var fd = new FormData();
	fd.append("file", blob, filename);
	// xhr.open("POST", "http://35.239.35.55:4444/yash");
	// xhr.send(fd);
	var settings = {
		"url": "http://34.136.44.96:4444/yash",
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
		recordButton.disabled = false;
		document.getElementById("myname").style.display = "none";
	});

}



function myFunction() {
	document.getElementById("myname").style.display = "flex";
}
