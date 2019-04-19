function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('play');
}

function addTransitionendEventListener() {
    const boxes = document.querySelectorAll('.drum-kit__component__box');
    boxes.forEach((box) => box.addEventListener('transitionend', removeTransition))
}

function playByKeyCode(keyCode) {
    const selectedInstrument = document.querySelector(`.drum-kit__component__box[data-key="${keyCode}"`);
    const selectAudio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if(!selectedInstrument || !selectAudio) return;
    selectedInstrument.classList.add('play');
    selectAudio.currentTime = 0;
    selectAudio.play();
}

addTransitionendEventListener();
window.addEventListener('keydown', (key) => {
    playByKeyCode(key.keyCode);
});