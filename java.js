const passwordInput = document.querySelector('.password-group input');
const toggleIcon = document.querySelector('.pwd-icon');
const inputs = document.querySelectorAll('input');
const loginButton = document.querySelector('.submit-btn');
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    location.reload();
});

toggleIcon.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    toggleIcon.textContent = type === 'password' ? '⌨️' : '🙈';
});

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const allFilled = [...inputs]
            .filter(i => i.type !== 'checkbox')
            .every(i => i.value.trim() !== '');

        if (allFilled) {
            loginButton.disabled = false;
            loginButton.style.backgroundColor = '#00B900';
            loginButton.style.cursor = 'pointer';
        } else {
            loginButton.disabled = true;
            loginButton.style.backgroundColor = '#ccc';
            loginButton.style.cursor = 'not-allowed';
        }
    });
});

loginButton.addEventListener('click', e => {
    e.preventDefault();
    loginButton.textContent = '登入中...';
    loginButton.disabled = true;
    loginButton.style.backgroundColor = '#999';

    setTimeout(() => {
        alert("（模擬）登入失敗，請檢查帳號密碼。\n本頁面為模擬練習用。");
        loginButton.textContent = '登入';
        loginButton.disabled = false;
        loginButton.style.backgroundColor = '#00B900';
    }, 2000);
});