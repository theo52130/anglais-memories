console.log(`%cMemories English Test - Copyright (C) 2024 SALVADORI Theo`, 'color: red; font-weight: bold; text-shadow: 0 0 5px black; font-size: 20px;');

let InGameInfinity = false;
let InGame = false;
let mots = [
    { "francais": "Logiciel", "anglais": "Software" },
    { "francais": "Cahier des charges", "anglais": "Specifications" },
    { "francais": "Navigateur", "anglais": "Browser" },
    { "francais": "Moteur de recherche", "anglais": "Search engine" },
    { "francais": "Programmation", "anglais": "Programming" },
    { "francais": "Nom de domaine", "anglais": "Domain name" },
    { "francais": "Compte", "anglais": "Account" },
    { "francais": "Créer un compte", "anglais": "To sign up" },
    { "francais": "Définir un mot de passe", "anglais": "To set a password" },
    { "francais": "Utilisateur", "anglais": "User" },
    { "francais": "Identifiant", "anglais": "Username" },
    { "francais": "Bibliothèque", "anglais": "Library" },
    { "francais": "Cadre de travail", "anglais": "Framework" },
    { "francais": "Environnement de développement", "anglais": "Integrated development environment" },
    { "francais": "Maintenance", "anglais": "Maintenance" },
    { "francais": "Sauvegarde", "anglais": "Backup" },
    { "francais": "Base de données", "anglais": "Database" },
    { "francais": "Flux de données", "anglais": "Data flow" },
    { "francais": "Stockage de données", "anglais": "Data storage" },
    { "francais": "Pare-feu", "anglais": "Firewall" },
    { "francais": "Logiciel espion", "anglais": "Spyware" },
    { "francais": "Bande passante", "anglais": "Bandwidth" },
    { "francais": "Interface de programmation (api)", "anglais": "Application Programming Interface" },
    { "francais": "Balise", "anglais": "Markup" },
    { "francais": "Langage binaire", "anglais": "Binary language" }
];

let motsPasser = [];
let motActuel = '';
let score = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateScore() {

    if (InGameInfinity) {
        document.getElementById("ScorePoints").innerHTML = score;
        document.getElementById("ScoreMax").innerHTML = "∞";
        document.getElementById("motsRestant").innerHTML = "∞";
    } else 
    {
        document.getElementById("ScorePoints").innerHTML = score;
    document.getElementById("ScoreMax").innerHTML = mots.length;
    document.getElementById("motsRestant").innerHTML = mots.length - motsPasser.length;
    }

    if (InGameInfinity) {
        motActuel = mots[getRandomInt(mots.length)];
    } else {
        do {
            motActuel = mots[getRandomInt(mots.length)];
        } while (motsPasser.includes(motActuel));
        motsPasser.push(motActuel);
    }

    document.getElementById("titre-mot").innerHTML = motActuel.francais; // Changer le titre avec le mot actuel
}

document.getElementById("start").addEventListener("click", function() {
    InGameInfinity = true;
    this.style.display = "none";
    document.getElementById("explication").style.display = "none";
    document.getElementById("disclamer").style.display = "none";
    document.getElementById("champSaisi").style.display = "block";
    document.getElementById("valider").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("motRestant").style.display = "block";

    motsPasser = [];
    score = 0;
    updateScore();
});

document.getElementById("valider").addEventListener("click", function() {
    validateInput();
});

document.getElementById("champSaisi").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        validateInput();
    }
});

function validateInput() {
    let userInput = document.getElementById("champSaisi").value.toLowerCase();
    let correctAnswer = motActuel.anglais.toLowerCase();

    if (userInput === correctAnswer) {
        score++;
        document.getElementById("champSaisi").style.backgroundColor = "green";
    } else {
        document.getElementById("champSaisi").style.backgroundColor = "red";
    }

    document.getElementById("champSaisi").value = '';
    updateScore();

    if (!InGameInfinity && motsPasser.length >= mots.length) {
        endGame();
    }
}

function endGame() {
    InGame = false;
    document.getElementById("valider").disabled = true;
    alert(`Fin du jeu ! Votre score final est : ${score}`);
}

document.getElementById('switchTheme').onclick = function() {
    let themeStylesheet = document.getElementById('themeStylesheet');
    if (themeStylesheet.getAttribute('href') === 'style-white.css') {
        themeStylesheet.setAttribute('href', 'style-dark.css');
    } else {
        themeStylesheet.setAttribute('href', 'style-white.css');
    }
};
