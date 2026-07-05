// =============================
// Summer Event Home
// script.js
// =============================

// -----------------------
// 로그인 확인
// -----------------------

import { db, doc, getDoc } from "./firebase.js";

const loginUser = localStorage.getItem("loginUser");

if(loginUser === null){

    location.href = "login.html";

}

const shellText = document.getElementById("shellPoint");

async function loadUser(){

    const userRef = doc(db,"users",loginUser);

    const snap = await getDoc(userRef);

    if(!snap.exists()){

        alert("계정을 찾을 수 없습니다.");

        location.href="login.html";

        return;

    }

    const data = snap.data();

    shellText.textContent = data.shell;

}

loadUser();

// 게임
document.getElementById("gameObject").addEventListener("click", () => {
    location.href = "game/game.html";
});

// 상점
document.getElementById("shopObject").addEventListener("click", () => {
    location.href = "shop/shop.html";
});

// 공지
document.getElementById("noticeObject").addEventListener("click", () => {
    location.href = "notice/notice.html";
});

// 랭킹
document.getElementById("rankObject").addEventListener("click", () => {
    location.href = "rank/rank.html";
});
