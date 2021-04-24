var kérdések;
var k = 1;
var kérdés
var jóVálasz
var képVanE

window.onload = () => {
    letöltés();
}
function letöltés() {
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kérdésMegjelenítés(data)
        );
}

function kérdésMegjelenítés(kérdés) {
    katt();
    document.getElementById("kép1").src = "";
    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");
    document.getElementById("válasz2").classList.remove("rossz");
    document.getElementById("válasz3").classList.remove("rossz");
    console.log(kérdés);
    document.getElementById("kérdés_szövege").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3

    képVanE = kérdés.image;
    if (képVanE!="") document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + képVanE;

    jóVálasz = kérdés.correctAnswer;
    console.log(jóVálasz)
}
function kérdésBetöltés(k) {
    fetch(`/questions/${k}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}    

function vissza() {
    if (k == 0) {
        k = 859
    }
    else {
        k--
    }
    kérdésBetöltés(k)
}
function előre() {
    if (k == 859) {
        k = 1
    }
    else {
        k++
    }
    kérdésBetöltés(k)
}

//kérdések: hogyan lehetne a válaszSzinezést egy függvénybe? jó és rossz osztályokat egyszerre eltávolítani?

function katt() {
    document.getElementById("válasz1").classList.add("kattintható");
    document.getElementById("válasz2").classList.add("kattintható");
    document.getElementById("válasz3").classList.add("kattintható");
}

function nemKatt() {
    document.getElementById("válasz1").classList.remove("kattintható")
    document.getElementById("válasz2").classList.remove("kattintható")
    document.getElementById("válasz3").classList.remove("kattintható")
}

function válaszSzínezés1() {
    nemKatt();
    if (jóVálasz == 1) {
        document.getElementById("válasz1").classList.add("jó")
        document.getElementById("válasz2").classList.add("rossz")
        document.getElementById("válasz3").classList.add("rossz")
    }
    else document.getElementById("válasz1").classList.add("rossz")
}

function válaszSzínezés2() {
    nemKatt();
    if (jóVálasz == 2) {
        document.getElementById("válasz2").classList.add("jó")
        document.getElementById("válasz1").classList.add("rossz")
        document.getElementById("válasz3").classList.add("rossz")
    }
    else document.getElementById("válasz2").classList.add("rossz")
}

function válaszSzínezés3() {
    nemKatt();
    if (jóVálasz == 3) {
        document.getElementById("válasz3").classList.add("jó")
        document.getElementById("válasz2").classList.add("rossz")
        document.getElementById("válasz1").classList.add("rossz")
    }
    else document.getElementById("válasz3").classList.add("rossz")
}