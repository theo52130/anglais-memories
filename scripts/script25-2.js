console.log("%cMemories English Test - Copyright (C) 2024 SALVADORI Theo", 'color: red; font-weight: bold; text-shadow: 0 0 5px black; font-size: 20px;');
var InGameInfinity = false;
var InGame = false;
var mots = [];
fetch('data25-2.json')
    .then(function (response) { return response.json(); })
    .then(function (data) {
    mots = data;
    console.log("Liste de mots chargée avec succès :", mots);
    // Note: Ne mettez pas à jour le score ici
})
    .catch(function (error) { return console.error("Erreur lors du chargement du fichier JSON :", error); });
var motsPasser = [];
var motActuel = null;
var score = 0;
var manches = 0;
var normal = true;
var infini = false;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function updateScore() {
    var scorePointsElement = document.getElementById("ScorePoints");
    var scoreMaxElement = document.getElementById("ScoreMax");
    var motsRestantElement = document.getElementById("motsRestant");
    scorePointsElement.innerHTML = score.toString();
    scoreMaxElement.innerHTML = InGameInfinity ? manches.toString() : mots.length.toString();
    motsRestantElement.innerHTML = InGameInfinity ? "∞" : (mots.length - motsPasser.length).toString();
    // Ne mettez à jour motActuel que si le jeu a commencé
    if (InGame || InGameInfinity) {
        if (InGameInfinity) {
            motActuel = mots[getRandomInt(mots.length)];
        }
        else {
            do {
                motActuel = mots[getRandomInt(mots.length)];
            } while (motsPasser.some(function (mot) { return mot.francais === motActuel.francais; }));
            motsPasser.push(motActuel);
        }
        // Mettre à jour l'affichage du mot actuel
        document.getElementById("titre-mot").innerHTML = motActuel.francais;
    }
}
function initializeMotActuel() {
    // Vérifiez si le jeu a commencé avant d'initialiser motActuel
    if (InGame || InGameInfinity) {
        if (mots.length > 0) {
            motActuel = mots[getRandomInt(mots.length)];
            document.getElementById("titre-mot").innerHTML = motActuel.francais;
        }
    }
}
document.getElementById("start").addEventListener("click", function () {
    if (normal) {
        InGame = true;
    }
    else {
        InGameInfinity = true;
    }
    this.style.display = "none";
    document.getElementById("explication").style.display = "none";
    document.getElementById("disclamer").style.display = "none";
    document.getElementById("mode-div").style.display = "none";
    document.getElementById("switchMode").style.display = "none";
    document.getElementById("champSaisi").style.display = "block";
    document.getElementById("valider").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("motRestant").style.display = "block";
    initializeMotActuel();
    motsPasser = [];
    score = 0;
    updateScore(); // Appelez ici pour initialiser le score après le démarrage du jeu
});
document.getElementById("valider").addEventListener("click", function () {
    validateInput();
});
document.getElementById("champSaisi").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        validateInput();
    }
});
function validateInput() {
    var userInput = document.getElementById("champSaisi").value.toLowerCase();
    var correctAnswer = motActuel === null || motActuel === void 0 ? void 0 : motActuel.anglais.toLowerCase();
    if (userInput === correctAnswer) {
        score++;
        document.getElementById("champSaisi").style.backgroundColor = "green";
        if (InGameInfinity) {
            manches++;
        }
    }
    else {
        document.getElementById("champSaisi").style.backgroundColor = "red";
        if (InGameInfinity) {
            manches++;
        }
    }
    document.getElementById("champSaisi").value = '';
    updateScore();
    if (!InGameInfinity && motsPasser.length >= mots.length) {
        endGame();
    }
}
function endGame() {
    InGame = false;
    InGameInfinity = false; // Réinitialiser le mode infini si le jeu se termine
    document.getElementById("valider").disabled = true;
    alert("Fin du jeu ! Votre score final est : ".concat(score));
}
document.getElementById('switchTheme').onclick = function () {
    var themeStylesheet = document.getElementById('themeStylesheet');
    themeStylesheet.href = themeStylesheet.getAttribute('href') === 'style-white.css' ? 'style-dark.css' : 'style-white.css';
};
document.getElementById('switchMode').onclick = function () {
    normal = !normal;
    infini = !infini;
    document.getElementById('modeText').innerHTML = infini ? "Infini" : "Normal";
};
