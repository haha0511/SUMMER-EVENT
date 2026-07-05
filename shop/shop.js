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

if(!loginUser){

    location.href="../login.html";

}

// -----------------------

const userRef = doc(db,"users",loginUser);

let shellPoint = 0;

let remainDig = 0;

// -----------------------
// 유저 불러오기
// -----------------------

async function loadUser(){

    const snap = await getDoc(userRef);

    if(!snap.exists()){

        alert("계정을 찾을 수 없습니다.");

        location.href="../login.html";

        return;

    }

    const data = snap.data();

    shellPoint = data.shell;

    remainDig = data.dig;

    refreshUI();

}

loadUser();

// -----------------------

function refreshUI(){

    document.getElementById("shellPoint").textContent = shellPoint;

    document.getElementById("digCount").textContent = remainDig;

}

// -----------------------
// 홈 버튼
// -----------------------

document.getElementById("homeButton").onclick=()=>{

    location.href="../index.html";

};

// -----------------------
// 삽 구매
// -----------------------

const buyButton=document.getElementById("buyButton");

buyButton.onclick=async()=>{

    if(shellPoint<100){

        alert("🐚 조개가 부족합니다.");

        return;

    }

    shellPoint-=100;

    remainDig++;

    refreshUI();

    await updateDoc(userRef,{

        shell:shellPoint,

        dig:remainDig

    });

    alert("⛏️ 삽을 구매했습니다!");

};

// -----------------------
// 화면 다시 열렸을 때
// -----------------------

window.addEventListener("focus",()=>{

    loadUser();

});

document.addEventListener("visibilitychange",()=>{

    if(!document.hidden){

        loadUser();

    }

});
