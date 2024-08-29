// 1. 해당 게시글에 대한 정보 가져오기
// 2. DOM API
// 3. 삭제, 수정 버튼 활성화 여부(권한 확인)
// 4. 삭제 기능 만들기, 수정 기능 만들기(권한 확인)

document.addEventListener("DOMContentLoaded", function() {
    // 1. 쿼리스트링 경로 추출 방법
    const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams.get("id"));
    // 2. path 경로 추출 방법 / https://www.naver.com/path/to/page
    // window.location.pathname; // 경로 추출 가능 --> /path/to/page
    const postId = urlParams.get("id");
    const storedBoardList = JSON.parse(localStorage.getItem("boardList"));
    const user = JSON.parse(localStorage.getItem("user")); // 현재 사용자 정보 가져오기
    let currentPost;

    if (storedBoardList && postId) {
        currentPost = null;

        for (let i = 0; i < storedBoardList.length; i++) {
            let post = storedBoardList[i];
            if (post.id === parseInt(postId)) {
                currentPost = post;
                break;
            }
        }

        if (!currentPost) {
            alert("해당 게시글을 찾을 수 없습니다.");
            location.href = "board-list.html";
        }
    } // end of if

    // 2. DOM API 사용
    const titleElement = document.querySelector("#title");
    const usernameElement = document.querySelector("#username");
    const imgBoxElement = document.querySelector("#imgBox");
    const contentElement = document.querySelector("#content");

    if (currentPost != null) {
        titleElement.value = currentPost.title;
        usernameElement.value = currentPost.username;
        // 사용자가 등록한 이미지 뿌려주기
        if (currentPost.imgData != null) {
            const imgElement = document.createElement("img"); // JS 코드로 이미지 태그 생성
            imgElement.src = currentPost.imgData;
            // 스타일도 설정하고자 한다면
            imgElement.style.width = "100%";
            imgElement.style.height = "auto";

            // 부모태그로 사용
            imgBoxElement.appendChild(imgElement    );
        }
    }

    // 3. 사용자 권한 확인
    const deleteButton = document.querySelector(".delete-button");
    const updateButton = document.querySelector(".update-button");

    if (user && currentPost.username === user.username) {
        deleteButton.style.display = "block";
        updateButton.style.display = "block";
    } else {
        deleteButton.style.display = "none";
        updateButton.style.display = "none";
    }

    // 삭제 기능 구현(권한 확인)
    deleteButton.addEventListener("click", function() {
        if (confirm("게시글을 삭제 하시겠습니까?")) {
            const updateBoardList = [];
            for (let i = 0; i < storedBoardList.length; i++) {
                if (storedBoardList[i].id !== parseInt(postId)) {
                    updateBoardList.push(storedBoardList[i]);
                }
            }
            localStorage.setItem("boardList", JSON.stringify(updateBoardList));
            alert("게시글이 삭제되었습니다.");
            location.href = "board-list.html";
        }
    });

    // 수정 화면 이동 처리(권한 확인)
});