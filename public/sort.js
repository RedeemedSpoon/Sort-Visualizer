// Shuffle Array
const shuffleBtn = document.getElementById('shuffle');

// Execute/pause Algorithm
const executeBtn = document.getElementById('execute');
const runIcon = executeBtn.childNodes[1];
const pauseIcon = executeBtn.childNodes[3];

executeBtn.addEventListener('click', () => {
  if (pauseIcon.style.display ==='none') {
    runIcon.style.display = 'none'
    pauseIcon.style.display = 'block'
  } else {
    runIcon.style.display = 'block'
    pauseIcon.style.display = 'none'
  };
});

// Mute/Unmute Algorithm
const audioBtn = document.getElementById('audio');
const unmuteIcon = audioBtn.childNodes[1];
const muteIcon = audioBtn.childNodes[3];

audioBtn.addEventListener('click', () => {
  if (muteIcon.style.display ==='none') {
    unmuteIcon.style.display = 'none'
    muteIcon.style.display = 'block'
  } else {
    unmuteIcon.style.display = 'block'
    muteIcon.style.display = 'none'
  };
});
