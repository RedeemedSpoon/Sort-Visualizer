// Global Variables
let array = [];
let speed = 2;
let length = 100;
let lineHeight = 0;
let lineWidth = 0;
let isRunning = false;
let isMuted = false;
let firstRun = true;

// Functions
async function run() {
  customPage && eval(codeEditor.value);
  await sort();
  if (!firstRun) {
    success();
    executeBtn.click();
    firstRun = true;
  }
}

async function sleep() {
  await until(() => isRunning || firstRun);
  return new Promise(function (resolve) {
    setTimeout(resolve, 500 / speed);
  });
}

function until(condition) {
  const poll = (resolve) => {
    if (condition()) resolve();
    else setTimeout((_) => poll(resolve), 100);
  };

  return new Promise(poll);
}

function draw(index, height) {
  const bar = document.createElement('div');
  bar.style.width = `${lineWidth}px`;
  bar.style.height = `${lineHeight * height}px`;
  bar.style.left = `${index * lineWidth}px`;
  bar.classList.add('bar');
  canvas.appendChild(bar);
}

function getBar(index) {
  for (let i = 0; i < canvas.children.length; i++) {
    if (parseInt(canvas.children[i].style.left) == parseInt(index * lineWidth)) {
      return canvas.children[i];
    }
  }
}

function swap(i, j, method) {
  let bar1 = getBar(i);
  let bar2 = getBar(j);

  [bar1.style.left, bar2.style.left] = [bar2.style.left, bar1.style.left];
  [array[i], array[j]] = [array[j], array[i]];
  play((array[i] + array[j]) / 2);

  [bar1, bar2].forEach((bar) => {
    method == 'flip' && bar.classList.add('flip');
    method == 'shuffle' ? bar.classList.add('shuffle') : bar.classList.add('swap');
    bar.addEventListener('transitionend', () => {
      method == 'flip' && bar.classList.remove('flip');
      method == 'shuffle' ? bar.classList.remove('shuffle') : bar.classList.remove('swap');
    });
  });
}

async function flip(i) {
  let start = 0;
  while (start < i) {
    swap(start, i, 'flip');
    await sleep();
    if (firstRun) return;
    start++;
    i--;
  }
}

async function shuffle() {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    swap(i, j, 'shuffle');
  }

  await sleep();
  if (firstRun) return;

  await sleep();
  if (firstRun) return;
}

function play(frequency) {
  if (isMuted) return;

  const audioCtx = new AudioContext();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.frequency.value = frequency * 5 + 100;
  gainNode.gain.value = 0.015;
  oscillator.type = 'square';

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}

function success() {
  let i = 0;
  let interval = setInterval(() => {
    if (i >= array.length) {
      clearInterval(interval);
      return;
    }

    const bar = getBar(i);
    bar.classList.add('success');
    setTimeout(() => bar.classList.remove('success'), 500);
    play(array[i]);
    i++;
  }, 50);
}

// Shuffle Button
const shuffleBtn = document.getElementById('shuffle');
const canvas = document.getElementById('canvas');
const rects = canvas.getBoundingClientRect();

shuffleBtn.addEventListener('click', () => {
  array = Array.from({length}, (_, i) => i + 1);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  lineWidth = rects.width / array.length;
  lineHeight = rects.height / array.length;
  canvas.innerHTML = '';

  array.forEach((height, index) => draw(index, height));
  firstRun = true;
});

// Execute/Pause Button
const executeBtn = document.getElementById('execute');
const runIcon = executeBtn.childNodes[1];
const pauseIcon = executeBtn.childNodes[3];

executeBtn.addEventListener('click', () => {
  isRunning = !isRunning;
  shuffleBtn.disabled = isRunning;
  lengthSlide.disabled = isRunning;

  if (pauseIcon.style.display === 'none') {
    runIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    firstRun && run();
    firstRun = false;
  } else {
    runIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
});

// Mute/Unmute Button
const audioBtn = document.getElementById('audio');
const unmuteIcon = audioBtn.childNodes[1];
const muteIcon = audioBtn.childNodes[3];

audioBtn.addEventListener('click', () => {
  if (muteIcon.style.display === 'none') {
    unmuteIcon.style.display = 'none';
    muteIcon.style.display = 'block';
    isMuted = true;
  } else {
    unmuteIcon.style.display = 'block';
    muteIcon.style.display = 'none';
    isMuted = false;
  }
});

// Range Slider
const speedSlide = document.getElementById('speed');
const lengthSlide = document.getElementById('length');
const speedValue = document.getElementById('speed-value');
const lengthValue = document.getElementById('length-value');

speedSlide.addEventListener('input', () => {
  speed = speedSlide.value;
  speed = speed.length === 1 ? `${speed}.00` : speed;
  speed = speed.length === 3 ? `${speed}0` : speed;
  speedValue.textContent = `(${speed})`;
});

lengthSlide.addEventListener('input', () => {
  length = lengthSlide.value;
  length = length.length === 2 ? `0${length}` : length;
  lengthValue.textContent = `(${length})`;
  shuffleBtn.click();
});

// Code Section
const customPage = window.location.href.match(/custom/);
const codeEditor = document.querySelector('textarea');

if (customPage) {
  codeEditor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      codeEditor.value = codeEditor.value.substring(0, start) + '\t' + codeEditor.value.substring(end);
      codeEditor.selectionStart = start + 1;
      codeEditor.selectionEnd = end + 1;
    }
  });
} else {
  const codeBtn = document.querySelectorAll('.btn');
  const codeContent = document.querySelectorAll('.content');

  codeBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      codeContent.forEach((content) => content.classList.remove('active'));
      codeContent[index].classList.add('active');
      codeBtn.forEach((btn) => btn.classList.remove('pressed'));
      btn.classList.add('pressed');
    });
  });
}

// On Load
document.addEventListener('DOMContentLoaded', () => {
  lengthSlide.value = length;
  speedSlide.value = speed;

  shuffleBtn.click();
  !customPage && document.querySelector('.Python').click();
  !customPage && hljs.highlightAll();
});
