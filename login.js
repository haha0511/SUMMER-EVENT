import { db } from "./firebase.js";

import {

    doc,
    getDoc,
    setDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const idInput = document.getElementById("id");

const pwInput = document.getElementById("pw");

const loginButton = document.getElementById("loginButton");

const registerButton = document.getElementById("registerButton");

const message = document.getElementById("message");

// ----------------------
// 회원가입
// ----------------------

registerButton.onclick = async () => {

    const id = idInput.value.trim();

    const pw = pwInput.value.trim();

    if(id === "" || pw === ""){

        message.textContent = "아이디와 비밀번호를 입력하세요.";

        return;

    }

    const userRef = doc(db,"users",id);

    const snap = await getDoc(userRef);

    if(snap.exists()){

        message.textContent = "이미 존재하는 아이디입니다.";

        return;

    }

    await setDoc(userRef,{

        password:pw,

        shell:0,

        dig:10,

        totalDig:0,

        lastLogin:new Date().toISOString().slice(0,10)

    });

    message.style.color="green";

    message.textContent="회원가입 완료! 로그인해주세요.";

};

// ----------------------
// 로그인
// ----------------------

loginButton.onclick = async () => {

    const id = idInput.value.trim();

    const pw = pwInput.value.trim();

    const userRef = doc(db,"users",id);

    const snap = await getDoc(userRef);

    if(!snap.exists()){

        message.textContent="존재하지 않는 계정입니다.";

        return;

    }

    const data = snap.data();

    if(data.password !== pw){

        message.textContent="비밀번호가 틀렸습니다.";

        return;

    }

    localStorage.setItem("loginUser",id);

    location.href="index.html";

};
