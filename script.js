// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector("#voices");
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const textInput = document.querySelector('[name="text"]');

// Function to populate available voices
function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes("en"))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

// Function to set the selected voice
function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
}

// Function to speak the text
function speak() {
    if (!textInput.value.trim()) {
        alert("Please enter some text!");
        return;
    }

    msg.text = textInput.value;
    speechSynthesis.cancel(); // Reset speech before starting
    speechSynthesis.speak(msg);
}

// Function to stop speech immediately
function stopSpeech() {
    speechSynthesis.cancel();
}

// Update Rate & Pitch dynamically
function updateSpeechOptions() {
    msg[this.name] = this.value;
}

// Event Listeners
speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
speakButton.addEventListener("click", speak);
stopButton.addEventListener("click", stopSpeech);
options.forEach(option => option.addEventListener("change", updateSpeechOptions));

// Initial population of voices
populateVoices();
