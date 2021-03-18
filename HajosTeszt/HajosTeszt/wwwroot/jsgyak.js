window.onload = function () {
    let hova = document.getElementById("ide")
    hova.innerHTML = ""

    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        hova.appendChild(sor)
        sor.classList.add("egymás_mellé")

        for (var o = 0; o < 10; o++) {

            let szám = document.createElement("div")
            sor.appendChild(szám)
            szám.innerText = (s + 1) * (o + 1)
            szám.classList.add("doboz");
            szám.style.color = `rgb(${255 - (25 * s)},0,${255 - (25 * o)})`
        }
    }

    //pascal háromszög scriptek innentől

    let pascal = document.getElementById("pascal")
    pascal.innerHTML = ""
    for (var sor = 0; sor < 10; sor++) {

        let s = document.createElement("div")
        pascal.appendChild(s)
        s.classList.add("sor")

        for (var oszlop = 0; oszlop <= sor; oszlop++) {

            let szám = document.createElement("div")
            szám.classList.add("elem")
            s.appendChild(szám)
            let p = faktoriálisR(sor) / (faktoriálisR(oszlop) * (faktoriálisR(sor - oszlop)))
            szám.innerText = p
        }
    }
}

var faktoriálisR = function (n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * faktoriálisR(n - 1)
    }
}