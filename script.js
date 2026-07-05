// =============================
// Summer Event Home
// script.js
// =============================

// 조개 포인트 불러오기
let shellPoint = localStorage.getItem("shellPoint");

if (shellPoint === null) {
    shellPoint = 0;
    localStorage.setItem("shellPoint", shellPoint);
}

// 화면 표시
document.getElementById("shellPoint").textContent = shellPoint;

// =============================
// 게임
// =============================

document.getElementById("gameObject").addEventListener("click", () => {

    location.href = "game/game.html";

});

// =============================
// 상점
// =============================

document.getElementById("shopObject").addEventListener("click", () => {

    location.href = "shop/shop.html";

});

// =============================
// 공지
// =============================

document.getElementById("noticeObject").addEventListener("click", () => {

    location.href = "notice/notice.html";

});

// =============================
// 랭킹
// =============================

document.getElementById("rankObject").addEventListener("click", () => {

    location.href = "rank/rank.html";

});
