import { db } from "../firebase.js";

import {

    collection,
    getDocs,
    query,
    orderBy

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// -----------------------

document.getElementById("homeButton").onclick = ()=>{

    location.href="../index.html";

};

// -----------------------

const rankList = document.getElementById("rankList");

// -----------------------

async function loadRank(){

    rankList.innerHTML = "";

    const q = query(

        collection(db,"users"),

        orderBy("shell","desc")

    );

    const snap = await getDocs(q);

    let rank = 1;

    snap.forEach((docSnap)=>{

        const data = docSnap.data();

        const div = document.createElement("div");

        div.className = "rankItem";

        div.innerHTML = `

            <div>

                🏅 ${rank}위

            </div>

            <div>

                ${docSnap.id}

            </div>

            <div>

                🐚 ${data.shell}

            </div>

        `;

        rankList.appendChild(div);

        rank++;

    });

}

loadRank();
