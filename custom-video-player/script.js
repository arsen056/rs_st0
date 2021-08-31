console.log("10 баллов - Повторить исходный проект");
console.log("10 баллов - Обязательный дополнительный фукционал. Горячие клавиши: Пробел - пауза, M - отключение/включение звука, F - полноэкранный режим, >< - ускорение/замедление видео");
console.log("Итого: 20 баллов");
const player = document.querySelector('.video-box');
const video = player.querySelector('.video');
const playVideo = player.querySelector('.play-video');
const playPause = player.querySelector('.play-pause');
const ranges = player.querySelectorAll('.range-progress');
const videoProgress = player.querySelector('.video-progress');
const soundProgress = player.querySelector('.sound-progress');
const soundBtn = player.querySelector('.sound-btn');
const fullScreen = player.querySelector('.full-screen-btn');
let isMuted = true;
let keyDownFlag = true; let keyFlag = false;

function changePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playPause.blur();
}

function updateBtn() {
  if (this.paused) {
    playPause.style.background = 'url("./svg/play-button.svg")';
  } else {
    playPause.style.background = 'url("./svg/pause.svg")';
  }
}

playVideo.addEventListener('click', () => {
  video.play();   
});

function handleVideo() {
  const percent = (video.currentTime / video.duration) * 100;
  videoProgress.style.background = `-webkit-linear-gradient(left, #24809E 0%, #24809E ${percent}%, #C4C4C4 ${percent}%, #C4C4C4 100%)`;
  videoProgress.value = percent;
}

function scrub(e) {
  const scrubTime = (e.offsetX / videoProgress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function videoVolume() {
  let vol = this.value;
  video.volume = vol / 100;
  if (video.volume != 0) {
    video.muted = false;
    soundBtn.style.backgroundImage = 'url("./svg/volume.svg")'; 
    isMuted = true;
  } else {
    video.muted = true;  
    soundBtn.style.backgroundImage = 'url("./svg/mute.svg")';
    isMuted = false;
  }
}

function changeMute() {
  if (isMuted) {
    if (video.muted) { 
      video.muted = false;
      soundBtn.style.backgroundImage = 'url("./svg/volume.svg")';   
      soundProgress.value = video.volume * 100; 
      soundProgress.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${video.volume * 100}%, #C4C4C4 ${video.volume * 100}%, #C4C4C4 100%)`;
    } else {    
      video.muted = true;
      soundBtn.style.backgroundImage = 'url("./svg/mute.svg")';      
      soundProgress.value = 0;
      soundProgress.style.background = `linear-gradient(to right, #24809E 0%, #24809E 0%, #C4C4C4 0%, #C4C4C4 100%)`;
    }
  }
}

function moveProgress() {  
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
}

function enterFS() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  fullScreen.blur();
}

function speedUp() {
  video.play();
  if (video.playbackRate != 2) {
    video.playbackRate += 0.25;
    console.log("speed: " + video.playbackRate)
  }  
}

function speedDown() {
  video.play();
  if (video.playbackRate != 0.25) {
    video.playbackRate -= 0.25;
    console.log("speed: " + video.playbackRate)
  }  
}

function keyDown(event) {
    if (event.code == "Space" && keyDownFlag) {
      changePlay();
      keyDownFlag = false;  
    } else if (event.code == "KeyM" && keyDownFlag) {
      changeMute();
      keyDownFlag = false;
    } else if (event.code == "KeyF" && keyDownFlag) {
      enterFS();
      keyDownFlag = false;
    } else if (event.code == "ShiftLeft") {
        keyFlag = true;       
        document.onkeyup = function(event) {
          if (event.code == "Period" && keyFlag) {
            speedUp();                   
          } else if (event.code == "Comma" && keyFlag) {
            speedDown();            
          }
        }
    }
  }

function keyUp(event) {
  keyDownFlag = true; 
}

video.addEventListener('click', changePlay);
playPause.addEventListener('click', changePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleVideo);
videoProgress.addEventListener('click', scrub);
videoProgress.addEventListener('input', moveProgress);
soundBtn.addEventListener('click', changeMute);
soundProgress.addEventListener('input', moveProgress);
soundProgress.addEventListener('input', videoVolume);
videoProgress.addEventListener('click', scrub);
fullScreen.addEventListener('click', enterFS);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);