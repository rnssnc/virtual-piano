const pianoKeys = document.querySelectorAll('.piano-key');

const AUDIO_PATH = `assets/audio`;
let isClicked = false;

function playSound(e) {
  let element = e.target || e;
  let audio = new Audio(`${AUDIO_PATH}/${element.dataset.note}.mp3`);
  if (!audio) return;

  element.classList.add('piano-key-active');
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName === 'transform') e.target.classList.remove('piano-key-active');
}

// Mouse events
function handleMouseEvent(e) {
  if (!isClicked) return;
  playSound(e);
}

window.addEventListener('keydown', handleMouseEvent);

pianoKeys.forEach((key) =>
  key.addEventListener('mousedown', (e) => {
    isClicked = true;
    handleMouseEvent(e);
  })
);
pianoKeys.forEach((key) => key.addEventListener('mouseup', () => (isClicked = false)));
pianoKeys.forEach((key) => key.addEventListener('mouseover', handleMouseEvent));

pianoKeys.forEach((key) => key.addEventListener('contextmenu', (e) => e.preventDefault()));

pianoKeys.forEach((key) => key.addEventListener('transitionend', removeTransition));

// Key events
let keySet = new Set();

function handleKeyEvent(e) {
  let key = [...pianoKeys].find((elem) => elem.dataset.letter == e.code.slice(-1));
  if (key)
    if (!keySet.has(e.code)) {
      keySet.add(e.code);
      playSound(key);
    }
}

window.addEventListener('keydown', handleKeyEvent);

window.addEventListener('keyup', (e) => {
  keySet.delete(e.code);
});

// Fullscreen
let fullScreenButon = document.querySelector('.fullscreen');

function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

fullScreenButon.addEventListener('click', toggleFullScreen);

// Letters mode
let lettersButton = document.querySelector('.btn-letters');
let notesButton = document.querySelector('.btn-notes');

function toggleLetterMode(e) {
  notesButton.classList.toggle('btn-active');
  lettersButton.classList.toggle('btn-active');
  pianoKeys.forEach((key) => key.classList.toggle('letter'));
}

lettersButton.addEventListener('click', toggleLetterMode);
notesButton.addEventListener('click', toggleLetterMode);
