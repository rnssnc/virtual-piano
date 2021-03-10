const pianoKeys = document.querySelectorAll('.piano-key');

const AUDIO_PATH = `assets/audio`;
let isClicked = false;

function playSound(element) {
  const audio = new Audio(`${AUDIO_PATH}/${element.dataset.note}.mp3`);
  if (!audio) return;

  element.classList.add('piano-key-active');
  audio.play();
}

function removeTransition(e) {
  e.target.classList.remove('piano-key-active');
}
// Mouse events
function handleMouseEvent(e) {
  if (!isClicked) return;
  playSound(e.target);
}

window.addEventListener('mouseup', () => (isClicked = false));
pianoKeys.forEach((key) => {
  key.addEventListener('mousedown', (e) => {
    isClicked = true;
    handleMouseEvent(e);
  });
  key.addEventListener('mouseover', handleMouseEvent);
  key.addEventListener('mouseleave', removeTransition);
  key.addEventListener('mouseup', removeTransition);
  key.addEventListener('contextmenu', (e) => e.preventDefault());
});

// Key events
let keyState = {};

function handleKeyEvent(e) {
  let elem = [...pianoKeys].find((elem) => elem.dataset.keycode == e.code);
  if (elem && !keyState[e.code]) {
    keyState[e.code] = true;
    playSound(elem);
  }
}

window.addEventListener('keydown', handleKeyEvent);

window.addEventListener('keyup', (e) => {
  const elem = [...pianoKeys].find((elem) => elem.dataset.keycode == e.code);
  if (elem) elem.classList.remove('piano-key-active');
  keyState[e.code] = false;
});

// Fullscreen
const fullScreenButon = document.querySelector('.fullscreen');

function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

fullScreenButon.addEventListener('click', toggleFullScreen);

// Letters mode
const lettersButton = document.querySelector('.btn-letters');
const notesButton = document.querySelector('.btn-notes');

function toggleLettersMode(e) {
  notesButton.classList.remove('btn-active');
  lettersButton.classList.add('btn-active');
  pianoKeys.forEach((key) => key.classList.add('letter'));
}

lettersButton.addEventListener('click', toggleLettersMode);

function toggleNotesMode(e) {
  notesButton.classList.add('btn-active');
  lettersButton.classList.remove('btn-active');
  pianoKeys.forEach((key) => key.classList.remove('letter'));
}

notesButton.addEventListener('click', toggleNotesMode);
