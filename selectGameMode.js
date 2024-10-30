function loadGameMode(mode) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        
        switch (mode) {
            case 'premier':
                script.src = 'script25-1.js';
                break;
            case 'deuxieme':
                script.src = 'script25-2.js';
                break;
            case 'troisieme':
                script.src = 'script50.js';
                break;
            default:
                console.error('Mode de jeu non reconnu.');
                reject('Mode de jeu non reconnu.');
                return;
        }

        script.defer = true;
        script.onload = () => {
            console.log(`Script ${script.src} chargé avec succès.`);
            resolve();
        };
        script.onerror = () => {
            console.error(`Erreur lors du chargement du script ${script.src}.`);
            reject('Erreur lors du chargement du script.');
        };
        document.body.appendChild(script);
    });
}

document.getElementById('start').addEventListener('click', function () {
    const selectedMode = document.querySelector('input[name="gameMode"]:checked');
    if (selectedMode) {
        loadGameMode(selectedMode.value)
            .then(() => {
                console.log('Script chargé avec succès.');
                initializeGame();
            })
            .catch(error => {
                console.error(error);
                alert('Erreur lors du chargement du mode de jeu.');
            });
    } else {
        alert('Veuillez sélectionner un mode de jeu.');
    }
});

function initializeGame() {
    console.log('Initialisation du jeu...');
    // Placez ici le code d'initialisation du jeu
    if (normal) {
        InGame = true;
    } else {
        InGameInfinity = true;
    }
    document.getElementById("start").style.display = "none";
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
}
