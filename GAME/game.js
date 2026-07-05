// =======================
// Summer Event Game
// =======================

// -----------------------
// 조개 포인트
// -----------------------

let shellPoint = Number(localStorage.getItem("shellPoint"));

if (isNaN(shellPoint)) {

    shellPoint = 0;

    localStorage.setItem("shellPoint", shellPoint);

}

// -----------------------
// 삽 개수
// -----------------------

let remainDig = Number(localStorage.getItem("remainDig"));

if (isNaN(remainDig)) {

    remainDig = 10;

}

// -----------------------
// 하루마다 삽 지급
// -----------------------

const today = new Date().toLocaleDateString();

const lastLogin = localStorage.getItem("lastLogin");

if (lastLogin === null) {

    localStorage.setItem("lastLogin", today);

    localStorage.setItem("remainDig", remainDig);

}

else if (lastLogin !== today) {

    remainDig += 10;

    localStorage.setItem("remainDig", remainDig);

    localStorage.setItem("lastLogin", today);

    alert("🎁 새로운 하루!\n\n⛏️ 삽 10개를 지급했습니다!");

}

// -----------------------

let isDigging = false;

// -----------------------

const shellText = document.getElementById("shellPoint");

const remainText = document.getElementById("remainDig");

const sandArea = document.getElementById("sandArea");

const loadingScreen = document.getElementById("loadingScreen");

const rewardScreen = document.getElementById("rewardScreen");

const countDown = document.getElementById("countDown");

const rewardEmoji = document.getElementById("rewardEmoji");

const rewardTitle = document.getElementById("rewardTitle");

const rewardPoint = document.getElementById("rewardPoint");

const rewardButton = document.getElementById("rewardButton");

// -----------------------

shellText.textContent = shellPoint;

remainText.textContent = remainDig;

// -----------------------

document.getElementById("homeButton").onclick = () => {

    location.href = "../index.html";

};

// -----------------------

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

// -----------------------

function getReward(){

    let random=Math.random()*100;

    let total=0;

    for(const item of rewards){

        total+=item.chance;

        if(random<=total){

            return item;

        }

    }

    return rewards[rewards.length-1];

}

// -----------------------

sandArea.onclick=()=>{

    if(isDigging) return;

    if(remainDig<=0){

        alert("⛏️ 삽이 부족합니다!\n\n상점에서 삽을 구매해주세요.");

        return;

    }

    isDigging=true;

    remainDig--;

    remainText.textContent=remainDig;

    localStorage.setItem("remainDig",remainDig);

    loadingScreen.classList.remove("hidden");

    let time=3;

    countDown.textContent=time;

    const timer=setInterval(()=>{

        time--;

        countDown.textContent=time;

        if(time<=0){

            clearInterval(timer);

            loadingScreen.classList.add("hidden");

            showReward();

        }

    },1000);

};

// -----------------------

function showReward(){

    const result=getReward();

    rewardEmoji.textContent=result.emoji;

    rewardTitle.textContent=result.title;

    rewardPoint.textContent="+"+result.shell+" 🐚";

    shellPoint+=result.shell;

    shellText.textContent=shellPoint;

    localStorage.setItem("shellPoint",shellPoint);

    rewardScreen.classList.remove("hidden");

}

// -----------------------

rewardButton.onclick=()=>{

    rewardScreen.classList.add("hidden");

    isDigging=false;

};

// -----------------------

sandArea.addEventListener("touchstart",function(e){

    e.preventDefault();

    sandArea.click();

},{passive:false});

// -----------------------

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        rewardScreen.classList.add("hidden");

        isDigging=false;

    }

});