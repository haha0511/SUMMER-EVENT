const bgm = new Audio("../sound/bgm.mp3");

bgm.loop = true;

bgm.volume = 0.3;

window.addEventListener("click", () => {

    bgm.play();

}, { once: true });

import { db } from "../firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// -----------------------
// 로그인 확인
// -----------------------

const loginUser = localStorage.getItem("loginUser");

if (!loginUser) {
    location.href = "../login.html";
}

const userRef = doc(db, "users", loginUser);

let shellPoint = 0;
let remainDig = 0;

// -----------------------
// 홈 버튼
// -----------------------

document.getElementById("homeButton").onclick = () => {
    location.href = "../index.html";
};

// -----------------------
// UI
// -----------------------

function refreshUI() {
    document.getElementById("shellPoint").textContent = shellPoint;
}

// -----------------------
// 유저 불러오기
// -----------------------

async function loadUser() {

    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        alert("계정을 찾을 수 없습니다.");
        location.href = "../login.html";
        return;
    }

    const data = snap.data();

    shellPoint = data.shell ?? 0;
    remainDig = data.dig ?? 0;

    refreshUI();
}

loadUser();

// -----------------------
// 삽 구매
// -----------------------

const buyButton = document.getElementById("buyShovel");

buyButton.onclick = async () => {

    // 항상 최신 데이터 읽기
    const snap = await getDoc(userRef);
    const data = snap.data();

    shellPoint = data.shell ?? 0;
    remainDig = data.dig ?? 0;

    if (shellPoint < 100) {
        alert("🐚 조개가 부족합니다.");
        return;
    }

    shellPoint -= 100;
    remainDig += 4;

    await updateDoc(userRef, {
        shell: shellPoint,
        dig: remainDig
    });

    refreshUI();

    alert("⛏️ 삽 4개를 구매했습니다!");
};

// -----------------------
// 다시 돌아왔을 때
// -----------------------

window.addEventListener("focus", loadUser);

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        loadUser();
    }
});
