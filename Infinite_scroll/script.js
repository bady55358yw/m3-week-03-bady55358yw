const title = [
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    'qui est esse',
    'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    'eum et est occaecati',
    'nesciunt quas odio'
];

const content = [
    'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla',
    'et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut',
    'ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit',
    'repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque'
];

const postContainer = document.querySelector('.postContainer');
const loader = document.querySelector('.loader');


// 第一步：將上面 post 的標題和內容隨機的加入至 postContainer 

// numPost不可以放在函式內，否則每次執行函式都會從 1 開始
let numPost = 1;
let postTitles = []; // 為了給第四步做判斷

function loadPosts() {
    let limitPost = 0;

    while (limitPost < 5) {
        const randomIndex = getRandNum();
        const postTitle = title[randomIndex];
        const postContent = content[randomIndex];

        // 要記得 postContainer = postContainer + 內容，否則只會有一個內容
        postContainer.innerHTML = postContainer.innerHTML + `
            <div class="post">
                <div class="number">${numPost}</div>
                <div class="postInfo">
                    <h2 class="postTitle">${postTitle}</h2>
                    <p class="postContent">${postContent}</p>
                </div>
            </div>
        `;

        postTitles.push(postTitle); // 為了給第四步做判斷

        numPost++;
        limitPost++;
    }
}

loadPosts(); // 初始的 5 個 posts

function getRandNum() {
    // 隨機取出 0~4 的數字
    return Math.floor(Math.random() * 5);
}


// 第二步：當滾輪滑到最底部會載入更多的 post

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        loader.classList.add("show");
        setTimeout(() => {
            loader.classList.remove("show");
        }, 500);
        setTimeout(() => {
            loadPosts();
        }, 1000);
    }
});


// 第三步：把每個 post 放入 posts 的陣列裡，這樣才能將把 filter 後的 post 做顯示/不顯示

const searchInput = document.querySelector('.searchInput');
const post = document.querySelectorAll('.post');
const posts = [];

post.forEach(function (currentValue) {
    posts.push(currentValue);
});


// 第四步：當每次輸入框做只要有輸入，就會重複執行 filterPosts()
searchInput.addEventListener('input', function (event) {
    let valueInput = event.target.value.trim(); // trim()是去除首尾空格;
    filterPosts(valueInput);
});


function filterPosts(valueInput) {
    // valueInput 如果是空值，則所有 post 都顯示；如果不是空值就跑到 else 做判斷
    if (valueInput === '') {
        posts.forEach(function(currentPost){
            currentPost.classList.add('visible');
            currentPost.classList.remove('hidden');
        });
    }
    // valueInput 不是空值，則會判斷 valueInput 是否與標題同，相同則該 post 會顯示；不同，則反之
    else {
        for (i = 0; i < posts.length; i++) {
            if (postTitles[i].includes(valueInput)) {
                posts[i].classList.add('visible');
                posts[i].classList.remove('hidden');
            }
            else {
                posts[i].classList.add('hidden');
                posts[i].classList.remove('visible');
            }
        }
    }
}

