// =============================
// Summer Event Shop
// shop.js
// =============================

// -----------------------------
// 조개 포인트
// -----------------------------

let shellPoint = Number(localStorage.getItem("shellPoint"));

if (isNaN(shellPoint)) {

    shellPoint = 0;

    localStorage.setItem("shellPoint", shellPoint);

}

// -----------------------------
// 삽 개수
// -----------------------------

let remainDig = Number(localStorage.getItem("remainDig"));

if (isNaN(remainDig)) {

    remainDig = 10;

    localStorage.setItem("remainDig", remainDig);

}

// -----------------------------
// 화면 표시
// -----------------------------

document.getElementById("shellPoint").textContent = shellPoint;

// -----------------------------
// 홈 버튼
// -----------------------------

document.getElementById("homeButton").onclick = () => {

    location.href = "../index.html";

};

// -----------------------------
// 삽 구매
// -----------------------------

document.getElementById("buyShovel").onclick = () => {

    const price = 100;

    if (shellPoint < price) {

        alert("🐚 조개 포인트가 부족합니다.");

        return;

    }

    if (!confirm("⛏️ 삽 4개를 구매하시겠습니까?\n\n가격 : 🐚100")) {

        return;

    }

    shellPoint -= price;

    remainDig += 4;

    localStorage.setItem("shellPoint", shellPoint);

    localStorage.setItem("remainDig", remainDig);

    document.getElementById("shellPoint").textContent = shellPoint;

    alert("🎉 삽 4개를 구매했습니다!");

};

// -----------------------------
// 모바일 터치 지원
// -----------------------------

document.getElementById("buyShovel").addEventListener("touchstart", function (e) {

    e.preventDefault();

    this.click();

}, { passive: false });
