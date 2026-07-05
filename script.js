import { db, doc, getDoc } from "./firebase.js";

// =============================
// 로그인 확인
// =============================

const loginUser = localStorage.getItem("loginUser");

if (!loginUser) {

    location.href = "login.html";

}

// =============================
// 조개 불러오기
// =============================

const shellText = document.getElementById("shellPoint");

async function loadUser() {

    const userRef = doc(db, "users", loginUser);

    const snap = await getDoc(userRef);

    if (!snap.exists()) {

        alert("계정을 찾을 수 없습니다.");

        localStorage.removeItem("loginUser");

        location.href = "login.html";

        return;

    }

    const data = snap.data();

    shellText.textContent = data.shell;

}

loadUser();

// =============================
// 게임
// =============================

document.getElementById("gameObject").onclick = () => {

    location.href = "game/game.html";

};

// =============================
// 상점
// =============================

document.getElementById("shopObject").onclick = () => {

    location.href = "shop/shop.html";

};

// =============================
// 공지
// =============================

document.getElementById("noticeObject").onclick = () => {

    location.href = "notice/notice.html";

};

// =============================
// 랭킹
// =============================

document.getElementById("rankObject").onclick = () => {

    location.href = "rank/rank.html";

};
