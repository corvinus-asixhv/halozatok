var kérdések;
var k = 0;
var kérdés
var jóVálasz

window.onload = () => {
    letöltés();

}
function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(k);
}

function kérdésMegjelenítés(kérdés) {
    katt();
    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");
    document.getElementById("válasz2").classList.remove("rossz");
    document.getElementById("válasz3").classList.remove("rossz");
    document.getElementById("kérdés_szövege").innerHTML = kérdések[kérdés].questionText;
    document.getElementById("válasz1").innerHTML = kérdések[kérdés].answer1;
    document.getElementById("válasz2").innerHTML = kérdések[kérdés].answer2;
    document.getElementById("válasz3").innerHTML = kérdések[kérdés].answer3;
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
    jóVálasz = kérdések[kérdés].correctAnswer;
}
function vissza() {
    if (k == 0) {
        k = kérdések.length - 1
    }
    else {
        k--
    }
    kérdésMegjelenítés(k)
}
function előre() {
    if (k == kérdések.length - 1) {
        k = 0
    }
    else {
        k++
    }
    kérdésMegjelenítés(k)
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
    }
    else document.getElementById("válasz1").classList.add("rossz")
}

function válaszSzínezés2() {
    nemKatt();
    if (jóVálasz == 2) {
        document.getElementById("válasz2").classList.add("jó")
    }
    else document.getElementById("válasz2").classList.add("rossz")
}

function válaszSzínezés3() {
    nemKatt();
    if (jóVálasz == 3) {
        document.getElementById("válasz3").classList.add("jó")
    }
    else document.getElementById("válasz3").classList.add("rossz")
}