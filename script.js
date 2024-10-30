// console.log(`%cMemories English Test - Copyright (C) 2024 SALVADORI Theo`, 'color: red; font-weight: bold; text-shadow: 0 0 5px black; font-size: 20px;');

// let InGameInfinity = false;
// let InGame = false;
// let mots = [];

// fetch('data50.json')
//     .then(response => response.json())
//     .then(data => {
//         mots = data;
//         console.log("Liste de mots chargée avec succès :", mots);
//         updateScore();
//     })
//     .catch(error => console.error("Erreur lors du chargement du fichier JSON :", error));

// let motsPasser = [];
// let motActuel = '';
// let score = 0;
// let manches = 0;
// let normal = true;
// let infini = false;

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

// function updateScore() {

//     if (InGameInfinity) {
//         document.getElementById("ScorePoints").innerHTML = score;
//         document.getElementById("ScoreMax").innerHTML = manches;
//         document.getElementById("motsRestant").innerHTML = "∞";
//     } else {
//         document.getElementById("ScorePoints").innerHTML = score;
//         document.getElementById("ScoreMax").innerHTML = mots.length;
//         document.getElementById("motsRestant").innerHTML = mots.length - motsPasser.length;
//     }

//     if (InGameInfinity) {
//         motActuel = mots[getRandomInt(mots.length)];
//     } else {
//         do {
//             motActuel = mots[getRandomInt(mots.length)];
//         } while (motsPasser.includes(motActuel));
//         motsPasser.push(motActuel);
//     }
// }

// function initializeMotActuel() {
//     if (mots.length > 0) {
//         motActuel = mots[getRandomInt(mots.length)];
//         document.getElementById("titre-mot").innerHTML = motActuel.francais;
//     }
// }

// document.getElementById("start").addEventListener("click", function () {
//     if (normal) {
//         InGame = true;
//     } else {
//         InGameInfinity = true;
//     }
//     this.style.display = "none";
//     document.getElementById("explication").style.display = "none";
//     document.getElementById("disclamer").style.display = "none";
//     document.getElementById("mode-div").style.display = "none";
//     document.getElementById("switchMode").style.display = "none";
//     document.getElementById("champSaisi").style.display = "block";
//     document.getElementById("valider").style.display = "block";
//     document.getElementById("score").style.display = "block";
//     document.getElementById("motRestant").style.display = "block";

//     initializeMotActuel();

//     motsPasser = [];
//     score = 0;
//     updateScore();
// });

// document.getElementById("valider").addEventListener("click", function () {
//     validateInput();
// });

// document.getElementById("champSaisi").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         validateInput();
//     }
// });

// function validateInput() {
//     let userInput = document.getElementById("champSaisi").value.toLowerCase();
//     let correctAnswer = motActuel.anglais.toLowerCase();

//     if (userInput === correctAnswer) {
//         score++;
//         document.getElementById("champSaisi").style.backgroundColor = "green";
//         if (InGameInfinity) {
//             manches++;
//         }
//     } else {
//         document.getElementById("champSaisi").style.backgroundColor = "red";
//         if (InGameInfinity) {
//             manches++;
//         }
//     }

//     document.getElementById("champSaisi").value = '';
//     updateScore();

//     if (!InGameInfinity && motsPasser.length >= mots.length) {
//         endGame();
//     }
// }

// function endGame() {
//     InGame = false;
//     document.getElementById("valider").disabled = true;
//     alert(`Fin du jeu ! Votre score final est : ${score}`);
// }

// document.getElementById('switchTheme').onclick = function () {
//     let themeStylesheet = document.getElementById('themeStylesheet');
//     if (themeStylesheet.getAttribute('href') === 'style-white.css') {
//         themeStylesheet.setAttribute('href', 'style-dark.css');
//     } else {
//         themeStylesheet.setAttribute('href', 'style-white.css');
//     }
// };

// document.getElementById('switchMode').onclick = function () {
//     if (normal) {
//         normal = false;
//         infini = true;
//         document.getElementById('modeText').innerHTML = "Infini";
//     } else if (infini) {
//         normal = true;
//         infini = false;
//         document.getElementById('modeText').innerHTML = "Normal";
//     }
// };