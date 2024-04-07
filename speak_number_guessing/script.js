const container = document.querySelector('.container');
const numContainer = document.querySelector('.numContainer');
const message = document.querySelector('.message h2');

let correctNum = getRandomNum();
console.log(correctNum);

function getRandomNum() {
    return Math.floor(Math.random() * 100) + 1;
}

// 檢查瀏覽器是否支援 SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// 創建一個新的語音辨識 SpeechRecognition 物件
const recognition = new window.SpeechRecognition();
// 設成 true 表示在講話的當下會即時辨識，不需要等待
recognition.interimResults = true;
recognition.lang = "zh-TW";

recognition.addEventListener('result', function (e) {
    const transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('')
    numContainer.innerHTML = `
    <h2>You said:</h2>
    <p class="speakNum">${transcript}</p>
    `;

    let guessNum = parseInt(transcript);

    if (guessNum < 1 || guessNum >100){
        message.textContent = 'Number must be between 1 and 100';
    }
    else if (guessNum > correctNum) {
        message.textContent = 'Go lower';
    }
    else if (guessNum < correctNum) {
        message.textContent = 'Go higher';
    }
    else if (guessNum === correctNum) {
        container.innerHTML = `
        <p class="bingoText">Congrats! You have guessed the number!</p>
        <p class="bingoText">It was ${correctNum}</p>
        <button class="againBtn">Play Again</button>
        `
        const againBtn = document.querySelector('.againBtn');
        againBtn.addEventListener('click', (e) => {
            location.reload();
        })
    }
    else {
        message.textContent = 'That is not a valid number';
    }
})

// end 表示結束語音辨識時觸發
recognition.addEventListener('end', recognition.start);

// start() 表示開啟語音辨識的功能 ( 沒有寫這語法就無法用 )
recognition.start();




