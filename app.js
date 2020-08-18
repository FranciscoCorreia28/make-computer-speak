const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector('#pause-button');
const stopButton = document.querySelector('#stop-button');
const textInput = document.querySelector('#text');
const speedInput = document.querySelector('#speed');

let currentCharacter;

playButton.addEventListener('click', () => {
    // console.log("1", textInput.value);
    playText(textInput.value);
});
pauseButton.addEventListener('click', pauseText);
stopButton.addEventListener('click', stopText);
speedInput.addEventListener('input', () => {
    stopText();
    playText(utterance.text.substring(currentCharacter));
});

const utterance = new SpeechSynthesisUtterance()
utterance.addEventListener('end', () => {
    //console.log("2", textInput.value);
    textInput.disabled = false;

});
utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex
});
function playText(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume();
    }
    if (speechSynthesis.speaking) return;
    utterance.text = text;
    utterance.rate = speedInput.value || 1;
    utterance.pitch = 1.5;
    utterance.lang = 'pt-BR';
    utterance.volume = 1;
    textInput.disabled = true;
    speechSynthesis.speak(utterance)
    utterance.onerror = e => console.log('Ocorreu um erro: ' + e.error);

};

function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause
};

function stopText() {
    speechSynthesis.resume();
    speechSynthesis.cancel();
}

//To see the list of voices, use this code:
/*
console.log(`Voices #: ${speechSynthesis.getVoices().length}`)

speechSynthesis.getVoices().forEach(voice => {
  console.log(voice.name, voice.lang)
})
*/
//Note: The above code works in Firefox, Safari (and possibly Edge but I didn’t test it), but does not work in Chrome. Chrome requires the voices handling in a different way, and requires a callback that is called when the voices have been loaded:
/*
const voiceschanged = () => {
        console.log(`Voices #: ${speechSynthesis.getVoices().length}`)
        speechSynthesis.getVoices().forEach(voice => {
            console.log(voice.name, voice.lang)
        })
    }
    speechSynthesis.onvoiceschanged = voiceschanged
*/