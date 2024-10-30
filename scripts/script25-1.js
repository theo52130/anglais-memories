console.log("%cMemories English Test - Copyright (C) 2024 SALVADORI Theo", 'color: red; font-weight: bold; text-shadow: 0 0 5px black; font-size: 20px;');

let InGameInfinity = false;
let InGame = false;
let mots = [];
let motsPasser = [];
let motActuel = null;
let score = 0;
let manches = 0;
let normal = true;
let infini = false;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateScore() {
    let scorePointsElement = document.getElementById("ScorePoints");
    let scoreMaxElement = document.getElementById("ScoreMax");
    let motsRestantElement = document.getElementById("motsRestant");
    let languageSelect = document.getElementById("languageSelect").value;

    scorePointsElement.innerHTML = score.toString();
    scoreMaxElement.innerHTML = InGameInfinity ? manches.toString() : mots.length.toString();
    motsRestantElement.innerHTML = InGameInfinity ? "∞" : (mots.length - motsPasser.length).toString();

    if (InGame || InGameInfinity) {
        do {
            motActuel = mots[getRandomInt(mots.length)];
        } while (motsPasser.some(mot => mot.francais === motActuel.francais));

        if (motActuel) {
            motsPasser.push(motActuel);
            document.getElementById("titre-mot").innerHTML = languageSelect === "francais" ? motActuel.francais : motActuel.anglais;
        }
    }
}

function initializeMotActuel() {
    if ((InGame || InGameInfinity) && mots.length > 0) {
        do {
            motActuel = mots[getRandomInt(mots.length)];
        } while (motsPasser.some(mot => mot.francais === motActuel.francais));

        if (motActuel) {
            let languageSelect = document.getElementById("languageSelect").value;
            document.getElementById("titre-mot").innerHTML = languageSelect === "francais" ? motActuel.francais : motActuel.anglais;
        }
    }
    return motActuel;
}

document.getElementById("start").addEventListener("click", function () {
    let dataFile = document.getElementById("radio1").checked ? './data/data25-1.json' :
                   document.getElementById("radio2").checked ? './data/data25-2.json' : './data/data50.json';

    fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            mots = data;
            console.log("Liste de mots chargée avec succès :", mots);
            initializeMotActuel();
            updateScore();
        })
        .catch(error => console.error("Erreur lors du chargement du fichier JSON :", error));

    InGame = normal;
    InGameInfinity = infini;

    this.style.display = "none";
    document.getElementById("explication").style.display = "none";
    document.getElementById("mode-div").style.display = "none";
    document.getElementById("switchMode").style.display = "none";
    document.getElementById("radio-mode").style.display = "none";
    document.getElementById("language-div").style.display = "none";
    document.getElementById("champSaisi").style.display = "block";
    document.getElementById("valider").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("motRestant").style.display = "block";
    motsPasser = [];
    score = 0;
});

document.getElementById("valider").addEventListener("click", validateInput);
document.getElementById("champSaisi").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        validateInput();
    }
});

function validateInput() {
    let languageSelect = document.getElementById("languageSelect").value;
    let userInput = document.getElementById("champSaisi").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let correctAnswer = motActuel ? (languageSelect === "francais" ? motActuel.anglais : motActuel.francais).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

    console.log("User Input:", userInput);
    console.log("Expected Answer:", correctAnswer);

    if (userInput === correctAnswer) {
        score++;
        document.getElementById("score").style.color = "green";
    } else {
        document.getElementById("score").style.color = "red";
    }

    document.getElementById("champSaisi").value = '';

    if (!InGameInfinity && motsPasser.length < mots.length) {
        updateScore();
    } else if (!InGameInfinity && motsPasser.length >= mots.length) {
        endGame();
    } else if (InGameInfinity) {
        manches++;
        updateScore();
    }
}


function endGame() {
    InGame = false;
    InGameInfinity = false;
    document.getElementById("valider").disabled = true;
    alert(`Fin du jeu ! Votre score final est : ${score}`);
}

document.getElementById('switchTheme').onclick = function () {
    let themeStylesheet = document.getElementById('themeStylesheet');
    themeStylesheet.href = themeStylesheet.getAttribute('href').includes('style-white.css') ? './styles/style-dark.css' : './styles/style-white.css';
};
document.getElementById('switchMode').onclick = function () {
    normal = !normal;
    infini = !infini;
    document.getElementById('modeText').innerHTML = infini ? "Infini" : "Normal";
};

document.getElementById("languageSelect").addEventListener("change", function () {
    if (motActuel) {
        document.getElementById("titre-mot").innerHTML = this.value === "francais" ? motActuel.francais : motActuel.anglais;
    }
});
