var kérdések;
var questionNumber = 1;

var jóVálasz
var képVanE

var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;   //A következő kérdés száma a teljes listában
var timeoutHandler;
myStorage = window.localStorage;

window.onload = () => {
    init();
}
function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}  
function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésMegjelenítés() {
    katt();
    document.getElementById("kép1").src = "";
    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");
    document.getElementById("válasz2").classList.remove("rossz");
    document.getElementById("válasz3").classList.remove("rossz");
    kérdés = hotList[displayedQuestion].question;
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


function vissza() {
    if (displayedQuestion!=0) {
        displayedQuestion--;
        kérdésMegjelenítés();
    }
    
}
function előre() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()

    if (hotList[displayedQuestion].goodAnswers == 3) {
        hotList[displayedQuestion].goodAnswers = 0;
        kérdésBetöltés(nextQuestion, displayedQuestion)
        nextQuestion++;
        
    }
}

//kérdések: hogyan lehetne a válaszSzinezést egy függvénybe? jó és rossz osztályokat egyszerre eltávolítani?

function katt() {
    document.getElementById("válasz1").classList.add("kattintható");
    document.getElementById("válasz2").classList.add("kattintható");
    document.getElementById("válasz3").classList.add("kattintható");
    document.getElementById("válasz1").style.pointerEvents = "auto";
    document.getElementById("válasz2").style.pointerEvents = "auto";
    document.getElementById("válasz3").style.pointerEvents = "auto";

}

function nemKatt() {
    timeoutHandler = setTimeout(előre, 3000);
    document.getElementById("válasz1").classList.remove("kattintható")
    document.getElementById("válasz2").classList.remove("kattintható")
    document.getElementById("válasz3").classList.remove("kattintható")
    document.getElementById("válasz1").style.pointerEvents = "none";
    document.getElementById("válasz2").style.pointerEvents = "none";
    document.getElementById("válasz3").style.pointerEvents = "none";
}

function válaszSzínezés1() {
    nemKatt();
    if (jóVálasz == 1) {
        hotList[displayedQuestion].goodAnswers++;
        document.getElementById("válasz1").classList.add("jó")
        document.getElementById("válasz2").classList.add("rossz")
        document.getElementById("válasz3").classList.add("rossz")
    }
    else document.getElementById("válasz1").classList.add("rossz")
}

function válaszSzínezés2() {
    nemKatt();
    if (jóVálasz == 2) {
        hotList[displayedQuestion].goodAnswers++;
        document.getElementById("válasz2").classList.add("jó")
        document.getElementById("válasz1").classList.add("rossz")
        document.getElementById("válasz3").classList.add("rossz")
    }
    else document.getElementById("válasz2").classList.add("rossz")
}

function válaszSzínezés3() {
    nemKatt();
    if (jóVálasz == 3) {
        hotList[displayedQuestion].goodAnswers++;
        document.getElementById("válasz3").classList.add("jó")
        document.getElementById("válasz2").classList.add("rossz")
        document.getElementById("válasz1").classList.add("rossz")
    }
    else document.getElementById("válasz3").classList.add("rossz")
}