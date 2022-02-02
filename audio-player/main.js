const audio = document.querySelector('audio');
let isPlay = false;
const playPause = document.querySelector('.play-toggle');

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function togglePlay() {
    if (!isPlay) {
        isPlay = true;
        playAudio();  
        playPause.classList.toggle('pause');      
    } else {
        isPlay = false;
        pauseAudio();
        playPause.classList.toggle('pause');
    }
}

function moveProgress() {
  
}

playPause.addEventListener('click', togglePlay);