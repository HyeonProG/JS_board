const signUpApp = {
    // DOM 요소를 저장하는 객체
    elements: {
        inputs: document.querySelectorAll(".inputs"), // 입력 필드 배열
        checkIdBtn: document.getElementById("checkIdBtn"), // 아이디 중복 확인 버튼
        signUpBtn: document.getElementById("signUpBtn") // 회원가입 버튼
    },

    // 현재 날짜를 저장하는 변수
    today: new Date(),

    // 애플리케이션 초기화 메서드
    init: function() {
        this.bindEvents(); // 이벤트 리스너 바인딩
    },

    // 이벤트 리스너를 등록하는 메서드
    bindEvents: function() {
        // 아이디 중복 확인 버튼 클릭 시 checkDuplicatedId 메서드 호출
        this.elements.checkIdBtn.addEventListener("click", this.checkDuplicatedId.bind(this));
        // 회원가입 버튼 클릭 시 registerUser 메서드 호출
        this.elements.signUpBtn.addEventListener("click", this.registerUser.bind(this));
    },

    // 로컬 스토리지에서 사용자 정보를 가져오는 메서드
    getUserInfo: function() {
        let userListString = localStorage.getItem("userList"); // 로컬 스토리지에서 'userList' 데이터 가져오기
        if (userListString === null) {
            return []; // 데이터가 없으면 빈 배열 반환
        } else {
            return JSON.parse(userListString); // JSON 문자열을 객체로 변환하여 반환
        }
    },

    // 사용자 정보를 반환하는 메서드 (getUserInfo 메서드를 호출)
    userInfo: function() {
        return this.getUserInfo();
    },

    // 아이디 중복 확인 메서드
    checkDuplicatedId: function() {
        const inputUsername = this.elements.inputs[0].value.trim(); // 입력된 아이디 값 가져오기

        if (inputUsername === "") {
            alert("아이디를 입력하세요"); // 입력값이 비어있을 경우 경고창 띄우기
            this.elements.inputs[0].focus(); // 아이디 입력 필드에 포커스
            return;
        }

        const userInfo = this.getUserInfo(); // 기존 사용자 목록 가져오기
        // 입력된 아이디가 이미 존재하는지 확인
        let isDuplicatedId = userInfo.some(user => user.username === inputUsername);

        if (isDuplicatedId) {
            alert("이미 존재하는 아이디 입니다."); // 아이디가 중복될 경우 경고창 띄우기
            this.elements.inputs[0].focus(); // 아이디 입력 필드에 포커스
        } else {
            alert("사용 가능한 아이디 입니다."); // 아이디 사용 가능
            this.elements.inputs[0].readOnly = true; // 아이디 입력 필드 수정 불가 처리
            this.elements.inputs[0].style.backgroundColor = "lightgray"; // 입력 필드 배경색 변경
        }
    },

    // 회원가입 처리 메서드
    registerUser: function() {
        const username = this.elements.inputs[0];
        const nickname = this.elements.inputs[1];
        const password = this.elements.inputs[2];
        const confirmPassword = this.elements.inputs[3];

        // 아이디 중복 확인이 안 된 경우 처리
        if (!username.readOnly) {
            alert("아이디 중복 확인을 해주세요.");
            username.focus();
            return;
        }

        // 닉네임 입력 여부 확인
        if (nickname.value.trim() === "") {
            alert("닉네임을 입력하세요.");
            nickname.focus();
            return;
        }

        // 비밀번호 입력 여부 확인
        if (password.value.trim() === "") {
            alert("비밀번호를 입력하세요.");
            password.focus();
            return;
        }

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (password.value !== confirmPassword.value) {
            alert("비밀번호가 일치하지 않습니다.");
            password.focus();
            return;
        }

        // 새로운 사용자 객체 생성
        const newUser = {
            username: username.value, // 사용자 아이디
            nickname: nickname.value, // 사용자 닉네임
            password: password.value, // 사용자 비밀번호
            // 생성일자: 현재 날짜
            createdAt: `${this.today.getFullYear()}.${this.today.getMonth() + 1}.${this.today.getDate()}`
        };

        const userInfo = this.getUserInfo(); // 기존 사용자 목록 가져오기
        userInfo.push(newUser); // 새로운 사용자 추가

        // 로컬 스토리지에 사용자 목록 저장
        localStorage.setItem("userList", JSON.stringify(userInfo));
        // 로그인 페이지로 이동
        window.location.href = "sign-in.html";
    }
};

// 애플리케이션 초기화
signUpApp.init();
