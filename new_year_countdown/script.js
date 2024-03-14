const days = document.querySelector('.days > h2');
const hours = document.querySelector('.hours > h2');
const minutes = document.querySelector('.minutes > h2');
const seconds = document.querySelector('.seconds > h2');
const years = document.querySelector('.years');
const loading = document.querySelector('.loading');
const countDown = document.querySelector('.countDown');

loading.style.display = "none"
document.addEventListener('DOMContentLoaded', function(){
    loading.style.display = "flex";
    countDown.style.display = "none";
    years.textContent = newYear;
    setTimeout(()=>{
        loading.style.display = "none";
    }, 700);
    setTimeout(()=>{
        countDown.style.display = "flex";
    }, 700);
})


// 需筆記
const currentYear = new Date().getFullYear(); 
const newYear = currentYear + 1;

function updateCountdown() {
    const currentTime = new Date();
    //參數分別代表年、月、日、時、分、秒。請注意，月份是從 0 開始的，所以 0 代表一月
    const newYearTime = new Date(newYear, 0, 1, 0, 0, 0); 
    const differ = newYearTime - currentTime;

    const d = Math.floor(differ / 1000 / 60 / 60 / 24);
    const h = Math.floor(differ / 1000 / 60 / 60 % 24);
    const m = Math.floor(differ / 1000 / 60 % 60);
    const s = Math.floor(differ / 1000 % 60);

    days.textContent = d;
    hours.textContent = h < 10 ? "0" + h : h;
    minutes.textContent = m < 10 ? "0" + m : m;
    seconds.textContent = s < 10 ? "0" + s : s;
    
}

setInterval(updateCountdown, 700);




