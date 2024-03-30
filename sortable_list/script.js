// 新增陣列，並依序放入正確的公司排名
const topCorps = [
    "Google",
    "Amazon.com Inc.",
    "Coca-Cola",
    "Mercedes-Benz",
    "Toyoto",
    "Apple Inc.",
    "Disney",
    "Samsung",
    "Microsoft",
    "McDonald's"
]

// ----

const listContainer = document.querySelector('.listContainer');

// 隨機載入各公司
function loadCorps() {
    /* 需筆記 */ 
    // 隨機產生各公司排序
    // sort()是一種可以排序元素的方法，返回的值為負值則會排前面；0則位置不變；正值則會排在後面
    // [...topCorps]為淺拷貝創建新的陣列，不可以直接寫 topCorps，因為 topCorps 會被變動到
    let corpsArray = [...topCorps];
    corpsArray.sort(getRandomSort);

    for(let i = 0; i < 10; i++){
        listContainer.innerHTML = listContainer.innerHTML + `
            <li class="corpContainer" data-index = "${i}">
                <span class="num">${i+1}</span>
                <div class="dragItem" draggable="true">
                    <p class="corpName">${corpsArray[i]}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            </li>
        `
        // data-index = "${i}" 是給拖曳前的 li 和拖曳後的 li 互換位置
    }
}

loadCorps();

/* 需筆記 */ 
// 取得正值、負值、0 的隨機碼
function getRandomSort() {
    return Math.random() - 0.5;
}

// ----

const corpContainer = document.querySelectorAll('.corpContainer');
const dragItem = document.querySelectorAll('.dragItem');

corpContainer.forEach(item=>{
    // 為了抓出 data-index，所以事件監聽要綁在有 data-index 的 li(即 corpContainer)
    item.addEventListener('dragstart', dragstart);
})

dragItem.forEach(item => {
    item.addEventListener('dragover', dragover);
    item.addEventListener('drop', dragdrop);
    item.addEventListener('dragenter', dragenter);
    item.addEventListener('dragleave', dragleave);
})

// dragStartIndex 要放在外面，這樣才可以同時給dragstart()和 dragdrop()使用
let dragStartIndex = 0;

// 取得目前拖曳前 li 的 index
function dragstart(){
    // +是為了將字串轉為數字
    dragStartIndex = +this.getAttribute('data-index');
}

/* 需筆記 */
// dragover 僅用於預防原先拖曳的行為，不加入這行，則 drop 會沒效果
function dragover(e){
    e.preventDefault();
}

// 拖曳至其他 dragItem 時，該 dragItem 的底色會變成灰色
function dragenter(){
    this.classList.add('over');
}

// 離開原先拖曳 dragItem 時，該 dragItem 的底色的灰色要拿掉
function dragleave(){
    this.classList.remove('over');
}

/* 需筆記 */
// 將 drop 下的 dragItem 和原先被拖曳的 dragItem 互換位置
function dragdrop(){
    this.classList.remove('over');
    let dragEndtIndex = +this.closest('li').getAttribute('data-index');

    // dragStartIndex 已在上面的 dragstart() 定義完成
    let itemOne = corpContainer[dragStartIndex].querySelector('.dragItem');
    let itemTwo = corpContainer[dragEndtIndex].querySelector('.dragItem');

    corpContainer[dragStartIndex].appendChild(itemTwo);
    corpContainer[dragEndtIndex].appendChild(itemOne);
}

// ----

const corpName = document.querySelectorAll('.corpName');
const checkOrderBtn = document.querySelector('.checkOrder');

checkOrderBtn.addEventListener('click', checkOder);

// 檢查新的 corpNameArray 和 原先正確的 topCorps 排名是否一樣
function checkOder() {
    let corpNameArray = [];

    for (i=0; i < 10; i++){
        corpNameArray.push(corpContainer[i].querySelector('p').textContent);
    }
    corpNameArray.forEach(function(item, index){
        if (item == topCorps[index]){
            corpContainer[index].querySelector('p').classList.add('correct');
        }
        else {
            corpContainer[index].querySelector('p').classList.add('wrong');
        }
    })
}

