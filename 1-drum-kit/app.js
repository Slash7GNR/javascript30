function createAllInstruments() {
    const drumKitElement = document.querySelector('.drum-kit');
    
    instruments.forEach((instrument) => {
        const kbdElement = createKeyboardElement(instrument.keyValue);
        const imageElement = createImageElement(instrument.imageSource);
        const audioElement = createAudioElement(instrument.keyCode, instrument.audioSource);
        const boxElement = createDrumKitBoxElement(instrument.keyCode);
        const componentElement = createDrumKitComponentElement();
        boxElement.appendChild(imageElement);
        componentElement.appendChild(kbdElement);
        componentElement.appendChild(boxElement);
        drumKitElement.appendChild(componentElement);
        document.body.appendChild(audioElement);
    });
}

function createKeyboardElement(keyValue) {
    const kbdElement = document.createElement('kbd');
    kbdElement.classList.add('drum-kit__component__keyboard');
    kbdElement.textContent = keyValue;

    return kbdElement;
}

function createImageElement(imageSource) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', imageSource);
    imageElement.classList.add('drum-kit__component__box__instrument');

    return imageElement;
}

function createAudioElement(keyCode, audioSource) {
    const audioElement = document.createElement('audio');
    audioElement.setAttribute('src', audioSource);
    audioElement.setAttribute('data-key', keyCode);

    return audioElement;
}

function createDrumKitBoxElement(keyCode) {
    const boxElement = document.createElement('div');
    boxElement.classList.add('drum-kit__component__box');
    boxElement.setAttribute('data-key', keyCode);

    return boxElement;
}

function createDrumKitComponentElement() {
    const componentElement = document.createElement('div');
    componentElement.classList.add('drum-kit__component');
    
    return componentElement;
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('play');
}

function onBoxClicked() {
    const dataKey = this.getAttribute('data-key');
    const selectedAudio = document.querySelector(`audio[data-key="${dataKey}"]`);
    playAndAnimate(this, selectedAudio);
}

function addBoxesEventListeners() {
    const boxes = document.querySelectorAll('.drum-kit__component__box');
    boxes.forEach((box) => {
        box.addEventListener('transitionend', removeTransition);
        box.addEventListener('click', onBoxClicked)
    })
}

function playByKeyCode(keyCode) {
    const selectedInstrument = document.querySelector(`.drum-kit__component__box[data-key="${keyCode}"`);
    const selectedAudio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if(!selectedInstrument || !selectedAudio) return;
    playAndAnimate(selectedInstrument, selectedAudio);  
}

function playAndAnimate(instrumentElement, audioElement) {
    instrumentElement.classList.add('play');
    audioElement.currentTime = 0;
    audioElement.play();
}

const instruments = [{
    keyCode: 65,
    keyValue: 'A',
    imageSource: 'images/claps.png',
    audioSource: 'sounds/clap.wav'
}, {
    keyCode: 83,
    keyValue: 'S',
    imageSource: 'images/hihat2.jpg',
    audioSource: 'sounds/hihat.wav'
}, {
    keyCode: 68,
    keyValue: 'D',
    imageSource: 'images/kick.jpg',
    audioSource: 'sounds/kick.wav'
}, {
    keyCode: 70,
    keyValue: 'F',
    imageSource: 'images/open-hihat.jpg',
    audioSource: 'sounds/openhat.wav'
}, {
    keyCode: 71,
    keyValue: 'G',
    imageSource: 'images/boom-bass.jpg',
    audioSource: 'sounds/boom.wav'
}, {
    keyCode: 72,
    keyValue: 'H',
    imageSource: 'images/ride.jpg',
    audioSource: 'sounds/ride.wav'
}, {
    keyCode: 74,
    keyValue: 'J',
    imageSource: 'images/snare.jpg',
    audioSource: 'sounds/snare.wav'
}, {
    keyCode: 75,
    keyValue: 'K',
    imageSource: 'images/tom.jpg',
    audioSource: 'sounds/tom.wav'
}, {
    keyCode: 76,
    keyValue: 'L',
    imageSource: 'images/cow-bell.jpg',
    audioSource: 'sounds/tink.wav'
}];
createAllInstruments();
addBoxesEventListeners();
window.addEventListener('keydown', (key) => {
    playByKeyCode(key.keyCode);
});