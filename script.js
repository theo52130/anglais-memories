console.log(`%cMemories English Test - Copyright (C) 2024 SALVADORI Theo`, 'color: red; font-weight: bold; text-shadow: 0 0 5px black; font-size: 20px;');

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
    { "francais": "Environnement de développement", "anglais": "Integrated development environment - IDE" },
    { "francais": "Maintenance", "anglais": "Maintenance" },
    { "francais": "Sauvegarde", "anglais": "Backup" },
    { "francais": "Base de données", "anglais": "Database" },
    { "francais": "Flux de données", "anglais": "Data flow" },
    { "francais": "Stockage de données", "anglais": "Data storage" },
    { "francais": "Pare-feu", "anglais": "Firewall" },
    { "francais": "Logiciel espion", "anglais": "Spyware" },
    { "francais": "Bande passante", "anglais": "Bandwidth" },
    { "francais": "Interface de programmation", "anglais": "Application Programming Interface" },
    { "francais": "Balise", "anglais": "Markup" },
    { "francais": "Langage binaire", "anglais": "Binary language" }
];

let max = mots.length;
let motActuel = '';
let score = 0;
let manches = 0;
let manchesMax = mots.length;
let dernierMot = '';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function updateScore() {
    document.getElementById("ScorePoints").innerHTML = score;
    document.getElementById("ScoreMax").innerHTML = manches;

    do {
        motActuel = mots[getRandomInt(max)];
    } while (motActuel.francais === dernierMot);

    dernierMot = motActuel.francais;
    document.getElementById("titre-mot").innerHTML = motActuel.francais;
}

document.getElementById("start").addEventListener("click", function() {
    InGame = true;
    this.style.display = "none";
    document.getElementById("explication").style.display = "none";
    document.getElementById("disclamer").style.display = "none";
    document.getElementById("champSaisi").style.display = "block";
    document.getElementById("valider").style.display = "block";
    document.getElementById("score").style.display = "block";
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
    if (InGame) {
        let userInput = document.getElementById("champSaisi").value.toLowerCase();
        let correctAnswer = motActuel.anglais.toLowerCase();
        
        if (userInput === correctAnswer) {
            score++;
            console.log("Correct! Score: " + score);
        } else {
            console.log("Incorrect. The correct answer was: " + correctAnswer);
        }
        
        manches++;
        updateScore();
        document.getElementById("champSaisi").value = '';
    }
}

document.getElementById('switchTheme').onclick = function() {
    let themeStylesheet = document.getElementById('themeStylesheet');
    if (themeStylesheet.getAttribute('href') === 'style-white.css') {
        themeStylesheet.setAttribute('href', 'style-dark.css');
    } else {
        themeStylesheet.setAttribute('href', 'style-white.css');
    }
};