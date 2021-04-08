const panel = document.querySelector('.player__panel'),
    video = document.querySelector('.features__video'),
    videoBox = document.querySelector('.features__player'),
    playBtn = document.querySelector('.features__player-btn'),
    playTime = document.querySelector('.player__time-now'),
    fullTime = document.querySelector('.player__time-full'),
    progress = document.querySelector('.player__progress'),
    progressLine = document.querySelector('.player__progress-line'),
    progressHover = document.querySelector('.player__progress-hover'),
    playB = document.querySelector('.player__playOrPause-play'),
    pauseB = document.querySelector('.player__playOrPause-pause'),
    stopB = document.querySelector('.player__stop'),
    speedDown = document.querySelector('.player__speed-down'),
    speedUp = document.querySelector('.player__speed-up'),
    volumeOn = document.querySelector('.player__volume-on'),
    volumeOff = document.querySelector('.player__volume-off'),
    volumeLevel = document.querySelector('.player__volume-level'),
    download = document.querySelector('.player__download'),
    zoomIn = document.querySelector('.player__zoom-in'),
    zoomOut = document.querySelector('.player__zoom-out');

let speed = 1,
    playT,
    clickDisplay = 0,
    videoSrc = video.getAttribute('src');
download.setAttribute('href', videoSrc);
function videoPlay() {
    video.play();
    playB.classList.remove('active');
    pauseB.classList.add('active');
    autoplayL();
}

function videoPause() {
    video.pause();
    pauseB.classList.remove('active');
    playB.classList.add('active');
}

function videoStop() {
    video.pause();
    video.currentTime = 0;
    speed = 1;
    video.playbackRate = speed;
    pauseB.classList.remove('active');
    playB.classList.add('active');
    progressLine.style.width = "0";
    clearTimeout(playT);
}

function speedU() {
    speed *= 2;
    if (speed > 5) {
        speed = 4;
    }
    video.playbackRate = speed;
}
function speedD() {
    speed /= 2;
    if (speed < 0.2) {
        speed = 0.25;
    }
    video.playbackRate = speed;
}
function timeInSecond(even) {
    let hour = Math.floor(even / 360) < 10 ? `0${Math.floor(even / 360)}` : Math.floor(even / 360),
        minutes = Math.floor(even / 60) < 10 ? `0${Math.floor(even / 60)}` : Math.floor(even / 60),
        seconds = Math.floor(even % 60) < 10 ? `0${Math.floor(even % 60)}` : Math.floor(even % 60);
    if (hour == 0) {
        return ` ${minutes} : ${seconds} `;
    } else {
        return `${hour} : ${minutes} : ${seconds} `;
    }
}
function click() {
    if (clickDisplay == 0) {
        clickDisplay = 1
    } else clickDisplay = 0
}

function videoVolume(level) {
    level = level == undefined ? volumeLevel.value : level;
    video.volume = level / 100;
}
function autoplayL() {
    progressLine.style.width = `${(video.currentTime * 100) / video.duration}%`;
    playTime.innerHTML = `${timeInSecond(Math.floor(video.currentTime))}`;

    if (video.currentTime == video.duration) {
        videoStop()
        clearTimeout(playT);
        return false;
    }
    playT = setTimeout(autoplayL, 1000);

}
function playL(even) {
    let w = progress.offsetWidth,
        e = even.offsetX;
    progressLine.style.width = `${(e * 100) / w}%`;
    video.currentTime = video.duration * (e / w);
}
playBtn.addEventListener("click", () => {
    fullTime.innerHTML = timeInSecond(Math.floor(video.duration));
    playBtn.classList.add('active');
    setTimeout(() => { panel.classList.add('active') }, 500);
    setTimeout(videoPlay, 500);
    videoVolume();
    autoplayL();
    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 32 ) {
            e.preventDefault();
            if (clickDisplay == 0) {
                videoPause();
                click();
            } else {
                videoPlay();
                click();
            }
        } 
    })
}, false)
video.addEventListener('click', () => {
    if (clickDisplay == 0) {
        click();
        videoPause();
    } else if (clickDisplay == 1) {
        click();
        videoPlay();
    }
})

video.addEventListener('dblclick', (e) => {
    let rect = video.getBoundingClientRect(),
        left = rect.left;
    if (e.clientX > left && e.clientX < innerWidth / 2) {
        video.currentTime -= 10
    } else if (e.clientX < innerWidth - left && e.clientX > innerWidth / 2) {
        video.currentTime += 10
    }

})

pauseB.addEventListener('click', () => {
    videoPause();
    clearTimeout(playT);
    click();
})

playB.addEventListener('click', () => {
    videoPlay();
    autoplayL();
    click();
})

stopB.addEventListener('click', () => {
    videoStop();
})

speedDown.addEventListener('click', () => {
    speedD();
})
speedUp.addEventListener('click', () => {
    speedU();
})

volumeLevel.addEventListener('change', () => {
    videoVolume(volumeLevel.value);
    if (volumeLevel.value == 0) {
        volumeOn.classList.remove('active');
        volumeOff.classList.add('active');
    } else {
        volumeOff.classList.remove('active');
        volumeOn.classList.add('active');
    }
})

volumeOn.addEventListener('click', () => {
    videoVolume(0);
    volumeOn.classList.remove('active');
    volumeOff.classList.add('active');
})

volumeOff.addEventListener('click', () => {
    videoVolume(volumeLevel.value);
    volumeOff.classList.remove('active');
    volumeOn.classList.add('active');
})

progress.addEventListener('click', (e) => {
    if (clickDisplay == 0) {
        videoPause();
        playL(e);
        videoPlay();
    } else {
        playL(e);
    }

})

progress.addEventListener('mousemove', (e) => {
    progressHover.style.width = `${(e.offsetX * 100) / progress.offsetWidth}%`;
})
progress.addEventListener('mouseleave', (e) => {
    progressHover.style.width = `0%`;
})

zoomIn.addEventListener('click', function () {
    toggleScreen(); 
})
zoomOut.addEventListener('click', function () {
    toggleScreen(); 
})
document.addEventListener('fullscreenchange', ()=> {
    if (document.fullscreenEnabled) {
        zoomIn.classList.toggle('active');
        zoomOut.classList.toggle('active');
    }
    console.log(document.fullscreenEnabled  );
})

function toggleScreen() {
     
    if (!document.fullscreenElement) {
        videoBox.requestFullscreen(); 
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen(); 
        }
    }
}