const signInApp = {
    // 로컬 스토리지에서 저장된 사용자 목록을 가져옴
    userList: JSON.parse(localStorage.getItem('userList')),

    // DOM 요소를 저장하는 객체
    elements: {
        inputs: document.querySelectorAll('.inputs'), // 입력 필드 배열 (아이디, 비밀번호 입력 필드)
        button: document.querySelector('button') // 로그인 버튼
    },

    // 애플리케이션 초기화 메서드
    init: function() {
        this.bindEvents(); // 이벤트 리스너를 바인딩
    },

    // 이벤트 리스너를 등록하는 메서드
    bindEvents: function() {
        // 로그인 버튼 클릭 시 login 메서드를 호출
        this.elements.button.addEventListener('click', this.login.bind(this));
    },

    // 로그인 처리 메서드
    login: function() {
        const username = this.elements.inputs[0].value.trim(); // 입력된 아이디 값 가져오기
        const password = this.elements.inputs[1].value.trim(); // 입력된 비밀번호 값 가져오기

        // 유효성 검사: 아이디 입력 여부 확인
        if (username === "") {
            alert('아이디를 입력하세요'); // 아이디 미입력 시 경고창 띄우기
            this.elements.inputs[0].focus(); // 아이디 입력 필드에 포커스
            return;
        }

        // 유효성 검사: 비밀번호 입력 여부 확인
        if (password === "") {
            alert('비밀번호를 입력하세요'); // 비밀번호 미입력 시 경고창 띄우기
            this.elements.inputs[1].focus(); // 비밀번호 입력 필드에 포커스
            return;
        }

        // 회원가입된 사용자가 없을 경우 처리
        if (!this.userList || this.userList.length === 0) {
            alert('등록된 사용자가 없습니다'); // 사용자 목록이 없으면 경고창 띄우기
            location.href = "sign-up.html"; // 회원가입 페이지로 이동
            return;
        }

        let userFound = false; // 사용자가 존재하는지 여부를 나타내는 변수

        // 사용자 목록에서 입력된 아이디와 일치하는 사용자를 찾음
        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].username === username) {
                userFound = true; // 사용자가 존재함

                // 비밀번호 확인
                if (this.userList[i].password !== password) {
                    alert('잘못된 비밀번호 입니다'); // 비밀번호가 틀리면 경고창 띄우기
                    this.elements.inputs[1].focus(); // 비밀번호 입력 필드에 포커스
                    return;
                } else {
                    // 로그인 성공 시 현재 사용자 정보를 로컬 스토리지에 저장
                    localStorage.setItem('user', JSON.stringify(this.userList[i]));
                    alert('로그인 완료'); // 로그인 성공 알림
                    location.href = "board-list.html"; // 게시판 목록 페이지로 이동
                    return;
                }
            }
        }

        // 입력된 아이디가 사용자 목록에 없을 경우 처리
        if (!userFound) {
            alert('해당 아이디가 존재하지 않습니다'); // 아이디가 없으면 경고창 띄우기
            this.elements.inputs[0].focus(); // 아이디 입력 필드에 포커스
        }
    }
};

// 애플리케이션 초기화
signInApp.init();
