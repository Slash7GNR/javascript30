function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('play');
}

function onBoxClicked() {
    this.classList.add('play');
    const dataKey = this.getAttribute('data-key');
    const selectedAudio = document.querySelector(`audio[data-key="${dataKey}"]`);
    selectedAudio.currentTime = 0;
    selectedAudio.play();
}

function addTransitionendEventListener() {
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
    selectedInstrument.classList.add('play');
    selectedAudio.currentTime = 0;
    selectedAudio.play();
}

addTransitionendEventListener();
window.addEventListener('keydown', (key) => {
    playByKeyCode(key.keyCode);
});