const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector('#pause-button');
const stopButton = document.querySelector('#stop-button');
const textInput = document.querySelector('#text');
const speedInput = document.querySelector('#speed');


playButton.addEventListener('click', () => {
    playText(textInput.value);
});

function playText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speedInput.value || 1;
    speechSynthesis.speak(utterance);
};
console.log(playButton);