var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
  
  var speechRecognitionList = new SpeechGrammarList();
  var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var outputBox = document.querySelector('#output');
var startBtn = document.querySelector('#start-btn');
var copyBtn = document.querySelector('#copy-btn')
var bg = document.querySelector('html');

let speechTimeout;
let recievedText = '';
let recognitionRunning = false;
let isListening = false;


startBtn.onclick = function() {
  isListening = ! isListening;
  if(isListening){
    outputBox.textContent=  "listening"   ;     
    recognition.start();
    recognitionRunning = true;

    startBtn.style.backgroundColor = '#FF0047';
    startBtn.textContent = "🎤 Stop Recording";
    
  }
  else{
    recognition.stop();
    recognitionRunning = false;
    recievedText = '';
    startBtn.style.backgroundColor = '#2AFF00';
    startBtn.textContent = "🎤 Start Recording";

  }

}

copyBtn.onclick= function(){
  outputBox.select();
  document.execCommand('copy');
  alert('Text copied to clipboard');
}

recognition.onresult = function(event) {  
  
  var color = event.results[0][0].transcript;
  recievedText = recievedText+ " "+ color;
  
  outputBox.textContent = recievedText;
  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence); 

}

recognition.onspeechend = function() {
  recognition.stop();
  // recognition.start();  
  console.log("continue");  

}

recognition.onend = function() {
  // Once recognition has stopped, start it again if it was previously running
  if (recognitionRunning) {
    recognition.start();
    console.log("Recognition restarted.");
  }
};


recognition.onnomatch = function(event) {
  outputBox.textContent = "I didn't recognise that.";
}

recognition.onerror = function(event) {
  console.log('Error occurred in recognition: ' + event.error);
}
