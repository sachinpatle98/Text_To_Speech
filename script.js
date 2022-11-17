const textArea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let speechBtn = document.querySelector('.submit');

let synth = speechSynthesis;
let isSpeaking = true;

function voiceSpeech() {
    for(let voice of synth.getVoices()){
        let option = document.createElement('option');
        option.text = voice.name;
        voiceList.add(option);
    }
}

synth.addEventListener('voicechanged' , voiceSpeech);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance);
}

// Speech Button work

speechBtn.addEventListener('click' , (e) => {
    e.preventDefault();if(textArea.value != ''){
        if(!synth.isSpeaking){
            textToSpeech(textArea.value);
        }
        if(textArea.value.length > 80){
            if(isSpeaking){
                synth.resume();
                isSpeaking = true;
                speechBtn.innerHTML = 'resume Speech';
            }
            else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerHTML = 'Resume Speech';
            }
            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerHTML = 'Convert to Speech';
                }
            })
    
        }
        else{
            speechBtn.innerHTML = 'Convert to Speech';
        }
    }
    
})
