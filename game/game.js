// ==========================================
// Summer Event Game
// game.js
// Part 1
// ==========================================

import { db } from "../firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// --------------------
// 로그인 확인
// --------------------

const loginUser = localStorage.getItem("loginUser");

if (!loginUser) {

    location.href = "../login.html";

}

// --------------------
// Firestore
// --------------------

const userRef = doc(db, "users", loginUser);

// --------------------
// 변수
// --------------------

let shellPoint = 0;

let remainDig = 10;

let totalDig = 0;

let lastLogin = "";

let isDigging = false;

// --------------------
// 날짜
// --------------------

const today = new Date().toISOString().slice(0,10);

// --------------------
// HTML
// --------------------

const shellText = document.getElementById("shellPoint");

const remainText = document.getElementById("remainDig");

const sandArea = document.getElementById("sandArea");

const loadingScreen = document.getElementById("loadingScreen");

const rewardScreen = document.getElementById("rewardScreen");

const rewardEmoji = document.getElementById("rewardEmoji");

const rewardTitle = document.getElementById("rewardTitle");

const rewardPoint = document.getElementById("rewardPoint");

const rewardButton = document.getElementById("rewardButton");

const countDown = document.getElementById("countDown");

// --------------------
// 홈 버튼
// --------------------

document.getElementById("homeButton").onclick = () => {

    location.href = "../index.html";

};

// --------------------
// UI
// --------------------

function refreshUI(){

    shellText.textContent = shellPoint;

    remainText.textContent = remainDig;

}

// --------------------
// 유저 불러오기
// --------------------

async function loadUser(){

    const snap = await getDoc(userRef);

    if(!snap.exists()){

        alert("계정을 찾을 수 없습니다.");

        location.href="../login.html";

        return;

    }

    const data = snap.data();

    shellPoint = data.shell ?? 0;

    remainDig = data.dig ?? 10;
    
    totalDig = data.totalDig ?? 0;

    lastLogin = data.lastLogin ?? "";

    if(lastLogin !== today){

        remainDig += 10;

        lastLogin = today;

        await updateDoc(userRef,{

            dig:remainDig,

            lastLogin:today

        });

        alert("🎁 새로운 하루!\n\n⛏️ 삽 10개 지급!");

    }

    refreshUI();

}

// --------------------
// 보상 목록
// --------------------

const rewards = [

    {

        emoji:"🥚",

        title:"이스터에그가 등장했습니다!",

        chance:0.5,

        shell:10000

    },

    {

        emoji:"📦",

        title:"보물상자가 등장했습니다!",

        chance:0.6,

        shell:5000

    },

    {

        emoji:"👑",

        title:"고래 왕관이 등장했습니다!",

        chance:2,

        shell:2000

    },

    {

        emoji:"🦪",

        title:"진주가 등장했습니다!",

        chance:8,

        shell:500

    },

    {

        emoji:"🍉",

        title:"수박이 등장했습니다!",

        chance:20,

        shell:100

    },

    {

        emoji:"🌿",

        title:"미역이 등장했습니다!",

        chance:49,

        shell:20

    },

    {

        emoji:"🪨",

        title:"아무것도 발견하지 못했습니다.",

        chance:19.9,

        shell:0

    }

];

// --------------------
// 보상 뽑기
// --------------------

function getReward(){

    let random = Math.random() * 100;

    let total = 0;

    for(const item of rewards){

        total += item.chance;

        if(random <= total){

            return item;

        }

    }

    return rewards[rewards.length - 1];

}

// --------------------
// 게임 시작
// --------------------

loadUser();

// --------------------
// 모래 클릭
// --------------------

sandArea.onclick = async () => {

    if(isDigging) return;

    if(remainDig <= 0){

        alert("⛏️ 삽이 없습니다!\n상점에서 구매해주세요.");

        return;

    }

    isDigging = true;

    remainDig--;

    refreshUI();

    await updateDoc(userRef,{

        dig:remainDig

    });

    loadingScreen.classList.remove("hidden");

    let time = 3;

    countDown.textContent = time;

    const timer = setInterval(()=>{

        time--;

        countDown.textContent = time;

        if(time <= 0){

            clearInterval(timer);

            loadingScreen.classList.add("hidden");

            showReward();

        }

    },1000);

};

// --------------------
// 보상 지급
// --------------------

async function showReward(){

    const result = getReward();

    rewardEmoji.textContent = result.emoji;

    rewardTitle.textContent = result.title;

    rewardPoint.textContent = "+" + result.shell + " 🐚";

    shellPoint += result.shell;

    totalDig++;

    refreshUI();

    await updateDoc(userRef,{
        shell: shellPoint,
        dig: remainDig,
        totalDig: totalDig
    });

    rewardScreen.classList.remove("hidden");

}


// --------------------
// 확인 버튼
// --------------------

rewardButton.onclick = () => {

    rewardScreen.classList.add("hidden");

    isDigging = false;

};

// --------------------
// 모바일 터치 지원
// --------------------

sandArea.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    if(!isDigging){

        sandArea.click();

    }

},{passive:false});

// --------------------
// ESC로 보상창 닫기
// --------------------

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        rewardScreen.classList.add("hidden");

        isDigging=false;

    }

});

// --------------------
// 창 다시 활성화 시
// 최신 데이터 불러오기
// --------------------

window.addEventListener("focus",()=>{

    loadUser();

});

// --------------------
// 탭 전환 후 복귀
// --------------------

document.addEventListener("visibilitychange",()=>{

    if(!document.hidden){

        loadUser();

    }

});
