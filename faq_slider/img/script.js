const arrow = document.querySelectorAll('.arrowPic');
const answer = document.querySelectorAll('.answer');
const content = document.querySelectorAll('ul div');

// 把answer和content變成陣列，才能抓出目前點擊的是哪一個區塊
// 需筆記
const answerArray = Array.from(answer);
const arrowArray = Array.from(arrow);

// 用雙重迴圈來把目前點擊的 index 加入 active，並把不是當前的 index 移除 active
// 需筆記
for (let i = 0; i < content.length; i++) {
    content[i].addEventListener('click', function () {
        for (let j = 0; j < content.length; j++) {
            if (i == j) {
                answerArray[j].classList.toggle('active');
                arrowArray[j].classList.toggle('active');
            }
            else {
                answerArray[j].classList.remove('active');
                arrowArray[j].classList.remove('active');
            }
        }
    });
}








