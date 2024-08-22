// 1. 변수의 선언과 초기화
const inputs = document.querySelectorAll(".inputs");
const checkIdBtn = document.getElementById("checkIdBtn");
const signUpBtn = document.getElementById("signUpBtn");
const today = new Date(); // 현재 날짜와 시간을 가져오는 데이터 타입(객체)

// 로컬 스토리지에 접근해서 사용자 정보를 가져오는 함수를 만들어 보자.
// localStorage <-- 변수를 통해 접근 가능
function getUserInfo() {
    let userListString = localStorage.getItem("userList");
    if (userListString === null) {
        return [];
    } else {
        // 문자열을(JSON 형식) JS의 데이터 타입인 객체로 변환 처리
        return JSON.parse(userListString);
    }
}

const userInfo = getUserInfo();

// 아이디 중복 확인 기능 만들어 보기
function checkDuplicatedId() {
    const inputUsername = inputs[0].value.trim();
    
    if(inputUsername === "") {
        alert("아이디를 입력하세요");
        inputs[0].focus();
        return;
    }

    // 로컬 스토리지에서 가져온 사용자 리스트에서 반복문을 돌면서 inputUsername에 담기
    // 같은 값이 있는지 확인
    let isDuplicatedId = false;
    for(let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].username === inputUsername) {
            isDuplicatedId == true;
            break;
        }
    }

    if(isDuplicatedId == true) {
        alert("이미 존재하는 아이디 입니다.");
        inputs[0].focus();
    } else {
        alert("사용 가능한 아이디 입니다.");
        inputs[0].readOnly = true;
        inputs[0].style.backgroundColor = "lightgray";
    }

}

// 회원 가입 처리 함수
function registerUser() {
    const username = inputs[0];
    const nickname = inputs[1];
    const password = inputs[2];
    const confirmPassword = inputs[3];
   
    // 유효성 검사
    if (username.readOnly == false) {
        alert("아이디 중복 확인을 해주세요.");
        username.focus();
        return;
    }

    if (nickname.value.trim() == "") {
        alert("닉네임을 입력하세요.");
        nickname.focus();
        return;
    }

    if (password.value.trim() == "") {
        alert("비밀번호를 입력하세요.");
        password.focus();
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("비밀번호가 일치하지 않습니다.");
        password.focus();
        return;
    }

    // 새로운 사용자 정보를 객체 리터럴로 생성
    const newUser = {
        username : username.value,
        nickname : nickname.value,
        password : password.value,
        createdAt : today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate()
    };
// console.log("newUser", newUser);

// json으로 파싱
// console.log("newUser", JSON.stringify(newUser));

    // [{...}, {}, {}, ....] : 자료구조
    userInfo.push(newUser);

    // 로컬 스토리지에 자료구조 통으로 덮어쓰기 저장
    localStorage.setItem("userList", JSON.stringify(userInfo));

    window.location.href = "sign-in.html";

}

// 이벤트 리스너 등록 처리
function addEventListener() {
    checkIdBtn.addEventListener("click", checkDuplicatedId);
    signUpBtn.addEventListener("click", registerUser);
}

// 이벤트 리스너 함수 실행(호출)
addEventListener();
