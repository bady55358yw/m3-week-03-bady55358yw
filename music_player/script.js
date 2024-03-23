const musicInfo = document.querySelector('.musicInfo');
const musicName = document.querySelector('.musicName');
const progressContainer = document.querySelector('.progressContainer');
const progress = document.querySelector('.progress');
const audio = document.querySelector('audio');
const cdPicContianer = document.querySelector('.cdPicContianer');
const cdPic = document.querySelector('.cdPic');
const previousBtn = document.querySelector('.previousBtn');
const playPauseBtn = document.querySelector('.playPauseBtn');
const nextBtn = document.querySelector('.nextBtn');

// 音樂名稱
const musics = ['energy', 'inspire', 'smallguitar'];
// 從音樂索引數 2 開始播放
let musicIndex = 2;

// 載入音樂
loadMusics(musics[musicIndex]);

function loadMusics(music){
    musicName.textContent = music;
    cdPic.setAttribute('src', `./images/${music}.jpg`);
    audio.setAttribute('src', `./music/${music}.mp3`);
}

// 事件監聽－判斷是否播放音樂
playPauseBtn.addEventListener('click', ()=>{
    const isPlaying = cdPicContianer.classList.contains('play'); /* 需筆記 */

    // 判斷目前的音樂是播放中還是暫停中
    if (isPlaying) {
        // 目前 cdPicContianer 的 class 有 play，代表目前播放中，按下按鈕就會暫停音樂
        pauseMusic();
    }
    else {
        // 目前 cdPicContianer 的 class 沒有 play，代表目前暫停中，按下按鈕就會播放音樂
        playMusic();
    }
})

// 播放音樂
function playMusic() {
    cdPicContianer.classList.add('play');
    musicInfo.classList.add('show');
    audio.play();
    musicName.textContent = musics[musicIndex];
    
    playPauseBtn.querySelector('i').classList.add('fa-pause');
    playPauseBtn.querySelector('i').classList.remove('fa-play');
}

// 暫停音樂
function pauseMusic() {
    cdPicContianer.classList.remove('play');
    musicInfo.classList.remove('show');
    audio.pause();

    playPauseBtn.querySelector('i').classList.remove('fa-pause');
    playPauseBtn.querySelector('i').classList.add('fa-play');
}

// 事件監聽－觸發播放前一首
previousBtn.addEventListener('click', ()=>{
    previousMusic();
})

// 播放前一首
function previousMusic() {
    if (musicIndex == 0){
        musicIndex = musics.length - 1;
        loadMusics(musics[musicIndex]);
        playMusic()
    }
    else {
        musicIndex--;
        loadMusics(musics[musicIndex]);
        playMusic()
    }
}

// 事件監聽－觸發播放下一首
nextBtn.addEventListener('click', ()=>{
    nextMusic();
})

// 播放下一首
function nextMusic() {
    if (musicIndex == musics.length - 1){
        musicIndex = 0;
        loadMusics(musics[musicIndex]);
        playMusic()
    }
    else {
        musicIndex++;
        loadMusics(musics[musicIndex]);
        playMusic()
    }
}

// 事件監聽－音頻被播放時來更新計時條 /* 需筆記 */
audio.addEventListener('timeupdate', function(e){
    // 當前播放時間
    let currentTime = e.target.currentTime;
    // 當前音樂的總時間
    let totalTime = e.target.duration;
    // 計算當前播放時間在音樂的總時間的佔比
    let percentage = (currentTime / totalTime)*100;

    //在CSS中，進度條的寬度通常以百分比表，所以需要將寬度計算出的百分比值轉換為百分比字串，以正確地顯示進度
    progress.style.width = `${percentage}%`;
})

// 事件監聽－觸發計時條來播放(算出)目前的音樂播放時間 /* 需筆記 */
progressContainer.addEventListener('click', function(e){
    // 取得 progressContainer 的 css 寬度
    const progressContainerWidth = this.clientWidth;
    // 取得目前鼠標點擊的 X 座標
    const clickX = e.offsetX;
    // 取得音頻的總時間
    const totalTime = audio.duration;
    audio.currentTime = (clickX / progressContainerWidth)*totalTime;
})

// 事件監聽－當音樂播放到最後會自動接續下一首 /* 需筆記 */
audio.addEventListener('ended', nextMusic)





