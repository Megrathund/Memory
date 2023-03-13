var pair_names = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var open_cards = 0;
var oldCardId = 0;
var pair = 0;
var pair_number = 0;

var objClass = "";
var pairs = 0;
var moves = 0;

var running = true;


for (var id = 0; id < pair_names.length; id++) { // Ein Algorithmus der die Karten mischt.
    for (var j = 0; j < 2; j++) {
        running = true;
        var min = 1;
        var max = 36;
        var random_number = Math.floor(Math.random() * (max - min + 1)) + min;

        if (document.getElementById(random_number).className == "") {
            document.getElementById(random_number).classList.add("pair_" + pair_names[id]);
        }
        else {
            while (running) {
                if (document.getElementById(random_number).className == "") {
                    document.getElementById(random_number).classList.add("pair_" + pair_names[id]);
                    running = false;
                }
                else {
                    random_number = Math.floor(Math.random() * (max - min + 1)) + min;
                    running = true;
                }
            }
        }
    }
}

document.getElementById("game").onclick = async function(objEvt) { // Deckt eine Karte auf sobald auf diese geklickt wird und verschließt die Karten sobald zwei offen sind nach kurzer Zeit wieder.
    if (open_cards != 2) {
        var objEvt = (window.event)? window.event: objEvt;
        var objSrc = (objEvt.target)? objEvt.target : objEvt.srcElement;
        var cardId = objSrc.id;
        var cardClass = objSrc.className;

        if (cardId > 0 && cardId < 37 && !document.getElementById(cardId).classList.contains("clicked") && !document.getElementById(cardId).classList.contains("located")) {
            open_cards++;
            if (open_cards == 1) {
                oldCardId = cardId;
                oldCardClass = cardClass;
            }
            
            document.getElementById(cardId).classList.add("clicked");

            if (open_cards == 2) {

                moves++;

                await Sleep(1000);
                document.getElementById(oldCardId).classList.remove("clicked");
                document.getElementById(cardId).classList.remove("clicked");

                document.getElementById("moves").innerHTML = "Züge: " + moves;
                if (oldCardClass == cardClass) {

                    document.getElementById(oldCardId).classList.add("located");
                    document.getElementById(cardId).classList.add("located");

                    pairs++;

                    document.getElementById("located_pairs").innerHTML = "Gefundene Pärchen: " + pairs;

                    if (pairs == 18) {
                        document.getElementById("win").style.display = "block";
                    }
                }

                open_cards = 0;
            }
        }
    }
}

function Sleep(milliseconds) { // Diese Funktion lässt das Programm pausieren.
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
