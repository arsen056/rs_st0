const audio = document.querySelector('audio'),
      playPause = document.querySelector('.play-toggle'),
      background = document.querySelector('.background'),
      cover = document.querySelector('.cover'),
      singer = document.querySelector('.singer'),
      next = document.querySelector('.next'),
      prev = document.querySelector('.prev'),
      title = document.querySelector('.title-song');

let isPlay = false;

const musics = ["Don't Start Now", "Don't Hurt Yourself"];
const singers = ["Dua Lipa", "Beyonce"];
let musicIndex = 0;

function initMusic(music, nameSinger) {
    audio.src = `assets/audio/${music}.mp3`;
    singer.innerHTML = nameSinger;
    title.innerHTML = music;
    background.style.backgroundImage = `url('./assets/img/cover${musicIndex + 1}.png')`;
    cover.style.backgroundImage = `url('./assets/img/cover${musicIndex + 1}.png')`;
}

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

// Next music

function nextMusic() {
    musicIndex++;
    if (musicIndex > musics.length - 1) {
        musicIndex = 0;
    }
    initMusic(musics[musicIndex], singers[musicIndex]);
}
next.addEventListener('click', nextMusic);

// Prev music
function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musics.length - 1;
    }
    initMusic(musics[musicIndex], singers[musicIndex]);
}
prev.addEventListener('click', prevMusic);


function moveProgress() {

}

playPause.addEventListener('click', togglePlay);