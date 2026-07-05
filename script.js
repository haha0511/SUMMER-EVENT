import { db } from "./firebase.js";

import {

    doc,
    getDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const bgm = new Audio("sound/bgm.mp3");

bgm.loop = true;

bgm.volume = 0.3;

// -----------------------
// 로그인 확인
// -----------------------

const loginUser = localStorage.getItem("loginUser");

if(!loginUser){

    location.href="login.html";

}

// -----------------------
// Firestore
// -----------------------

const userRef = doc(db,"users",loginUser);

// -----------------------
// 유저 정보 불러오기
// -----------------------

async function loadUser(){

    const snap = await getDoc(userRef);

    if(!snap.exists()){

        alert("계정을 찾을 수 없습니다.");

        location.href="login.html";

        return;

    }

    const data = snap.data();

    document.getElementById("shellPoint").textContent = data.shell;

}

loadUser();

// -----------------------
// 게임
// -----------------------

document.getElementById("gameObject").onclick = ()=>{

    location.href="game/game.html";

};

// -----------------------
// 상점
// -----------------------

document.getElementById("shopObject").onclick = ()=>{

    location.href="shop/shop.html";

};

// -----------------------
// 공지
// -----------------------

document.getElementById("noticeObject").onclick = ()=>{

    location.href="notice/notice.html";

};

// -----------------------
// 랭킹
// -----------------------

document.getElementById("rankObject").onclick = ()=>{

    location.href="rank/rank.html";

};
window.addEventListener("click", () => {

    bgm.play();

}, { once: true });
