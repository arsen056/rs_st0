const audio = document.querySelector('audio'),
      playPause = document.querySelector('.play-toggle'),
      background = document.querySelector('.background'),
      cover = document.querySelector('.cover'),
      singer = document.querySelector('.singer'),
      currentTimeAudio = document.querySelector('.current-time'),
      next = document.querySelector('.next'),
      prev = document.querySelector('.prev'),
      progress = document.querySelector('.progress'),
      duration = document.querySelector('.duration-time'),
      title = document.querySelector('.title-song');

let isPlay = false;

var audioDuration = 300;
audio.onloadedmetadata = function(){
    duration.textContent = getTimeFromNum(audio.duration);
    audioDuration = audio.duration;
}

const musics = [["Dua Lipa", "Don't Start Now",], ["Beyonce", "Don't Hurt Yourself"], ["Любэ", "Солдат"]]
let musicIndex = 0;

function initMusic(music, nameSinger) {
    audio.src = `assets/audio/${music}.mp3`;
    singer.innerHTML = nameSinger;
    title.innerHTML = music;
    background.style.backgroundImage = `url('./assets/img/cover${musicIndex + 1}.png')`;
    cover.style.backgroundImage = `url('./assets/img/cover${musicIndex + 1}.png')`;    
}
initMusic(musics[0][1], musics[0][0]);

// Play pause audio
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
        cover.classList.toggle('enlargement');
           
    } else {
        isPlay = false;
        pauseAudio();
        playPause.classList.toggle('pause');
        cover.classList.toggle('enlargement');
    }
}
playPause.addEventListener('click', togglePlay);

// Next music
function nextMusic() {    
    musicIndex++;
    if (musicIndex > musics.length - 1) {
        musicIndex = 0;
    }
    initMusic(musics[musicIndex][1], musics[musicIndex][0]);
    addPause(); 
      
}
next.addEventListener('click', nextMusic);

// Prev music
function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musics.length - 1;
    }
    initMusic(musics[musicIndex][1], musics[musicIndex][0]);
    addPause();
}
prev.addEventListener('click', prevMusic);

function addPause() {
    playAudio();
    isPlay = true;
    if (!playPause.classList.contains('pause')) playPause.classList.add('pause');
    if (isPlay) {
        cover.classList.add('enlargement');
    }
}

// Move progress
function moveProgress() {
    const percent = (audio.currentTime / audioDuration) * 100;
    progress.value = percent;
    let timeupdate = getTimeFromNum(audio.currentTime);
    currentTimeAudio.textContent = timeupdate;
    console.log(progress.value)
    console.log(progress.value === 100)
    if(progress.value == 100) {
        nextMusic();
    }
}
audio.addEventListener('timeupdate', moveProgress);

// Rewind
function rewind(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
}
progress.addEventListener('click', rewind);

// Get time from num
function getTimeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) {
        return `${minutes}:${String(seconds % 60).padStart(2,0)}`;
    }
}