const form = document.getElementById('login-form');
const passwordInput = document.querySelector('.password-group input');
const toggleIcon = document.querySelector('.pwd-icon');
const inputs = document.querySelectorAll('input');
const loginButton = document.querySelector('.submit-btn');
const logo = document.querySelector('.logo');
const loginBox = document.querySelector('.login-box');
let otpAttempts = 0;

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

function validateInputs() {
    let isValid = true;
    const [idInput, userInput, pwdInput] = form.querySelectorAll('input[type="text"], input[type="password"]');

    [idInput, userInput, pwdInput].forEach(el => el.classList.remove('invalid'));

    if (!/^\w{8,10}$/.test(idInput.value)) {
        idInput.classList.add('invalid');
        isValid = false;
    }
    if (!/^\w{4,}$/.test(userInput.value)) {
        userInput.classList.add('invalid');
        isValid = false;
    }
    if (pwdInput.value.length < 4) {
        pwdInput.classList.add('invalid');
        isValid = false;
    }
    return isValid;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    if (!validateInputs()) {
        loginBox.classList.add('shake');
        setTimeout(() => loginBox.classList.remove('shake'), 500);
        return;
    }

    loginButton.textContent = '登入中...';
    loginButton.disabled = true;
    loginButton.style.backgroundColor = '#999';

    setTimeout(() => {
        alert("登入成功，請輸入 OTP 驗證碼。");
        showOtpBox();
    }, 1500);
});

function showOtpBox() {
    const otpBox = document.createElement('div');
    otpBox.id = 'otp-box';
    otpBox.innerHTML = `
        <h2>輸入驗證碼</h2>
        <input type="text" id="otp-input" maxlength="6" placeholder="請輸入 6 位數碼">
        <button id="otp-submit">送出</button>
        <p id="otp-error" style="color:red; display:none;">請輸入 6 位數字</p>
    `;
    document.querySelector('.login-container').appendChild(otpBox);
    otpBox.style.display = 'block';

    document.getElementById('otp-submit').addEventListener('click', () => {
        const otpValue = document.getElementById('otp-input').value;
        const error = document.getElementById('otp-error');

        if (!/^\d{6}$/.test(otpValue)) {
            error.style.display = 'block';
            otpAttempts++;
            if (otpAttempts >= 3) {
                alert('您已輸入錯誤 3 次，請重新登入。');
                location.reload();
            }
        } else {
            error.style.display = 'none';
            alert('驗證成功！\n即將跳轉帳戶總覽頁面...');
            setTimeout(() => showDashboard(), 1000);
        }
    });
}

function showDashboard() {
    document.body.innerHTML = `
        <div style="text-align:center;padding:50px;font-size:22px">
            <h2>📋 模擬帳戶總覽</h2>
            <p>💰 帳戶餘額：NT$ 100,000</p>
            <p>🧾 最近交易：</p>
            <ul style="list-style:none;line-height:2em">
                <li>5/31 全聯超市 - NT$450</li>
                <li>5/30 ATM 提款 - NT$1,000</li>
                <li>5/29 薪資入帳 +NT$50,000</li>
                <li>5/28 網路購物 - NT$1,200</li>
                <li>5/27 水電費扣款 - NT$800</li>
            </ul>
            <button onclick="showDetail()" style="margin-top:20px;font-size:16px;padding:10px 20px">查看交易明細</button>
        </div>
    `;
}

function showDetail() {
    document.body.innerHTML = `
        <div style="text-align:center;padding:50px;font-size:22px">
            <h2>🧾 交易明細</h2>
            <table border="1" style="margin: 0 auto; border-collapse: collapse;">
                <tr><th>日期</th><th>項目</th><th>金額</th></tr>
                <tr><td>2025/05/31</td><td>全聯超市</td><td>-450</td></tr>
                <tr><td>2025/05/30</td><td>ATM 提款</td><td>-1000</td></tr>
                <tr><td>2025/05/29</td><td>薪資入帳</td><td>+50000</td></tr>
                <tr><td>2025/05/28</td><td>網路購物</td><td>-1200</td></tr>
                <tr><td>2025/05/27</td><td>水電費扣款</td><td>-800</td></tr>
            </table>
            <br>
            <button onclick="location.reload()" style="margin-top:20px;font-size:16px;padding:10px 20px">登出並返回登入</button>
        </div>
    `;
}