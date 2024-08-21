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


// 이벤트 리스너 등록 처리
function addEventListener() {
    checkIdBtn.addEventListener("click", checkDuplicatedId);
}

// 이벤트 리스너 함수 실행(호출)
addEventListener();
