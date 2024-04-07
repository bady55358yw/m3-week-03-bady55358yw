const usernameInput = document.querySelector('.username input');
const usernameText = document.querySelector('.username span');
const emailInput = document.querySelector('.email input');
const emailText = document.querySelector('.email span');
const passwordInput = document.querySelector('.password input');
const passwordText = document.querySelector('.password span');
const passwordConInput = document.querySelector('.passwordCon input');
const passwordConText = document.querySelector('.passwordCon span');
const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    checkUsername();
    checkEmail();
    checkPassword();
    checkPasswordAgain();
});

function checkUsername() {
    if (usernameInput.value.length < 3 || !usernameInput.value) {
        usernameText.textContent = "Username must be at least 3 characters";
        usernameText.style.visibility = "visible";
        usernameInput.setAttribute('class', 'error');
    }
    else if (usernameInput.value.length > 15) {
        usernameText.textContent = "Username must be at less than 15 characters";
        usernameText.style.visibility = "visible";
        usernameInput.setAttribute('class', 'error');
    }
    else {
        usernameText.textContent = "&nbsp";
        usernameText.style.visibility = "hidden";
        usernameInput.setAttribute('class', 'success');
    }
}

function checkEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    // 正規模式，用來驗證電子郵件格式
    if (!emailInput.value || !emailPattern.test(emailInput.value)) {// 要記得選到 emailInput 裡面的value
        emailText.textContent = "Email is not valid";
        emailText.style.visibility = "visible";
        emailInput.setAttribute('class', 'error');
    }
    else{
        emailText.textContent = "&nbsp";
        emailText.style.visibility = "hidden";
        emailInput.setAttribute('class', 'success');
    }
}

function checkPassword() {
    if (passwordInput.value.length < 6 || !passwordInput.value) {
        passwordText.textContent = "Password must be at least 6 characters";
        passwordText.style.visibility = "visible";
        passwordInput.setAttribute('class', 'error');
    }
    else if (passwordInput.value.length > 25) {
        passwordText.textContent = "Password must be less than 25 characters";
        passwordText.style.visibility = "visible";
        passwordInput.setAttribute('class', 'error');
    }
    else {
        passwordText.textContent = "nbsp";
        passwordText.style.visibility = "hidden";
        passwordInput.setAttribute('class', 'success');
    }
}

function checkPasswordAgain() {
    if (!passwordConInput.value) {
        passwordConText.textContent = "Password2 is required";
        passwordConText.style.visibility = "visible";
        passwordConInput.setAttribute('class', 'error');
       
    }
    else if (passwordConInput.value != passwordInput.value) {
        passwordConText.textContent = "Passwords do not match";
        passwordConText.style.visibility = "visible";
        passwordConInput.setAttribute('class', 'error');
    }
    else {
        passwordConText.textContent = "nbsp";
        passwordConText.style.visibility = "hidden";
        passwordConInput.setAttribute('class', 'success');
    }
}