navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia; 
var videoElement, audioSelect,videoSelect; 
var constraintsStream; 


function initStream() {
	videoElement = document.querySelector('video#mainVideo');
	audioSelect = document.querySelector('select#audioSource');
	videoSelect = document.querySelector('select#videoSource');

	if (typeof MediaStreamTrack === 'undefined'){
	  	videoElement.style.display = "none";
		audioSelect.style.display = "none";
		videoSelect.style.display = "none";
	} else {
		navigator.mediaDevices.enumerateDevices().then(gotSources);
	  	//MediaStreamTrack.getSources(gotSources);
	}  

	//audioSelect.onchange = streamVideo;
	//videoSelect.onchange = streamVideo;
	 
	
	streamVideo();
	   

} 






function gotSources(sourceInfos) {
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option'); 
	
    option.value = sourceInfo.id; 

	console.log(sourceInfos)
    if (sourceInfo.kind === 'audioinput') {
      option.text = sourceInfo.label || 'microphone ' + (audioSelect.length + 1);
      //audioSelect.appendChild(option);
    } else if (sourceInfo.kind === 'videoinput') {
      option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
      //videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }
}

function successStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.src = window.URL.createObjectURL(stream);
  //videoElement.play();
}

function errorStream(error){
  console.log('navigator.getUserMedia error: ', error);
}

function streamVideo(){
	if (!!window.stream) {
		videoElement.src = null;
		window.stream.stop();
	}
 
	//var audioSource = audioSelect.value;
	//var videoSource = videoSelect.value; 


	if(isMobile.Android()) {
		constraintsStream = {
		  audio: {
		    //optional: [{sourceId: audioSource}]
		  },
		  video: { 
			mandatory: {
			   maxWidth: 	160,
			   maxHeight: 	120,
			   minWidth: 	160,
			   minHeight: 	120
			}, 
			exact: [
				{ frameRate: 10 },
				{ facingMode: "environment" }
			],
		  }
		};
	} else {
		constraintsStream = {
		  audio: {
		    //optional: [{sourceId: audioSource}]
		  },
		  video: { 
		    //optional: [{sourceId: videoSource}]
		  }
		};
	}

                   
  	navigator.getUserMedia(constraintsStream, successStream, errorStream);
}

