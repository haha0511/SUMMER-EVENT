// ===============================
// Summer Event Shop
// shop.js
// ===============================

// 조개 포인트 불러오기
let shellPoint = Number(localStorage.getItem("shellPoint"));

if (isNaN(shellPoint)) {
    shellPoint = 0;
    localStorage.setItem("shellPoint", shellPoint);
}

// 삽 개수 불러오기
let remainDig = Number(localStorage.getItem("remainDig"));

if (isNaN(remainDig)) {
    remainDig = 10;
    localStorage.setItem("remainDig", remainDig);
}

// 화면 표시
const shellText = document.getElementById("shellPoint");
shellText.textContent = shellPoint;

// 홈 버튼
document.getElementById("homeButton").onclick = () => {

    location.href = "../index.html";

};

// 구매 버튼
const buyButtons = document.querySelectorAll(".buyButton");

// 구매 이벤트
buyButtons.forEach(button => {

    button.addEventListener("click", () => {

        const item = button.dataset.item;
        const price = Number(button.dataset.price);

        // 돈 부족
        if (shellPoint < price) {

            alert("🐚 조개 포인트가 부족합니다.");

            return;

        }

        // 삽 구매
        if (item === "shovel") {

            const check = confirm(
                "⛏️ 삽 묶음\n\n" +
                "가격 : 🐚 500\n" +
                "획득 : 삽 +4개\n\n" +
                "구매하시겠습니까?"
            );

            if (!check) return;

            shellPoint -= price;
            remainDig += 4;

            localStorage.setItem("shellPoint", shellPoint);
            localStorage.setItem("remainDig", remainDig);

            shellText.textContent = shellPoint;

            alert(
                "🎉 구매 완료!\n\n" +
                "삽 +4개 지급!\n\n" +
                "현재 삽 : " + remainDig + "개"
            );

        }

    });

});