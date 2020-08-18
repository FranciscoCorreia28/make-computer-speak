const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector('#pause-button');
const stopButton = document.querySelector('#stop-button');
const textInput = document.querySelector('#text');
const speedInput = document.querySelector('#speed');



playButton.addEventListener('click', () => {
    // console.log("1", textInput.value);
    playText(textInput.value);
});

function playText(text) {

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speedInput.value || 1;
    utterance.pitch = 1.5;
    utterance.lang = 'pt-BR';
    utterance.volume = 1;

    utterance.addEventListener('end', () => {
        //console.log("2", textInput.value);
        textInput.disabled = false;

    });
    textInput.disabled = true;

    speechSynthesis.speak(utterance)
    utterance.onerror = e => console.log('Ocorreu um erro: ' + e.error);
    console.log(utterance);

};



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