const maxUpgrade1Level = 100;  // Niveau max pour l'amélioration 1
const maxUpgrade2Level = 100;   // Niveau max pour l'amélioration 2
const maxAutoclickers = 100;   // Nombre max d'autoclickers

// Variables du jeu
let points = 0;
let pointsPerClick = 1;
let upgrade1Cost = 10;
let upgrade2Cost = 50;
let autoclickerCost = 100;
let autoclickers = 0;
let upgrade1Level = 0;
let upgrade2Level = 0;
let unlockedTrophies = []; // Liste des trophées débloqués
let playerName = "Nom du joueur"; // Nom par défaut
let avatarSrc = "Images/choose_avatar.jpg"; // Avatar par défaut
let farmCost = 200000000; // Coût d'une ferme
let farms = 0;

// Liste des trophées et leurs conditions
const trophies = [
    { name: "Débutant", condition: 100 },
    { name: "Apprenti Clicker", condition: 500000 },
    { name: "Clicker Amateur", condition: 10000000 },
    { name: "Clicker Confirmé", condition: 250000000 },
    { name: "Clicker Pro", condition: 500000000000 },
    { name: "Maître du Click", condition: 100000000000000000 }
];

// Éléments du DOM
const pointsDisplay = document.getElementById('points');
const clickButton = document.getElementById('click-button');
const upgrade1Button = document.getElementById('upgrade1');
const upgrade2Button = document.getElementById('upgrade2');
const autoclickerButton = document.getElementById('autoclicker-button');
const autoclickerCountDisplay = document.getElementById('autoclicker-count');
const trophyList = document.getElementById("trophy-list");
const farmButton = document.getElementById('buy-farm');
const farmsCountDisplay = document.getElementById('farms-count');

// Charger la sauvegarde
loadGame();

// Sauvegarder la progression dans localStorage
function saveGame() {
    const gameData = {
        points,
        pointsPerClick,
        upgrade1Cost,
        upgrade2Cost,
        autoclickerCost,
        autoclickers,
        upgrade1Level,
        upgrade2Level,
        unlockedTrophies,
        playerName,
        avatarSrc
    };
    localStorage.setItem('incrementalGameSave', JSON.stringify(gameData));
}

// Charger la progression depuis localStorage
function loadGame() {
    const savedData = localStorage.getItem('incrementalGameSave');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        points = gameData.points;
        pointsPerClick = gameData.pointsPerClick;
        upgrade1Cost = gameData.upgrade1Cost;
        upgrade2Cost = gameData.upgrade2Cost;
        autoclickerCost = gameData.autoclickerCost;
        autoclickers = gameData.autoclickers;
        upgrade1Level = gameData.upgrade1Level || 0;
        upgrade2Level = gameData.upgrade2Level || 0;
        unlockedTrophies = gameData.unlockedTrophies || [];
        playerName = gameData.playerName;
        avatarSrc = gameData.avatarSrc;
        updateDisplay();
        updateTrophies();
    }
}

// Mettre à jour l'affichage
function updateDisplay() {
    pointsDisplay.textContent = `Points: ${points}`;
    document.getElementById("pps-display").textContent = `Points par seconde: ${autoclickers * pointsPerClick}`;
    document.getElementById("upgrade1-count").textContent = `Améliorations 1 : ${upgrade1Level}`;
    document.getElementById("upgrade2-count").textContent = `Améliorations 2 : ${upgrade2Level}`;
    autoclickerCountDisplay.textContent = `Autoclickers: ${autoclickers}`;
    upgrade1Button.textContent = `Amélioration 1 (Coût: ${upgrade1Cost} points)`;
    upgrade2Button.textContent = `Amélioration 2 (Coût: ${upgrade2Cost} points)`;
    autoclickerButton.textContent = `Acheter un Autoclicker (Coût: ${autoclickerCost} points)`;
    document.getElementById("player-name").textContent = playerName;
    document.getElementById("avatar").src = avatarSrc;
    updateTrophies();
    saveGame(); // Sauvegarde après chaque mise à jour
}
// 🎖 Fonction pour gérer les trophées sans images
function updateTrophies() {
    trophyList.innerHTML = ""; // Vide la liste actuelle

    trophies.forEach(trophy => {
        // Vérifier si le trophée est déjà débloqué ou si les points permettent de le débloquer
        if (points >= trophy.condition && !unlockedTrophies.includes(trophy.name)) {
            unlockedTrophies.push(trophy.name); // Ajoute le trophée débloqué
        }
    });

    // Toujours afficher tous les trophées
    trophies.forEach(trophy => {
        let li = document.createElement("li");

        // Vérifier si le trophée est débloqué
        let isUnlocked = unlockedTrophies.includes(trophy.name);
        let trophyText = isUnlocked ? `✅ ${trophy.name}` : `❌ ${trophy.name}`;

        // Calcul du pourcentage de progression
        let progress = Math.min((points / trophy.condition) * 100, 100).toFixed(1);

        // Ajouter l'élément dans la liste
        li.innerHTML = `${trophyText} - ${progress}%`;
        trophyList.appendChild(li);
    });

    saveGame(); // Sauvegarde les trophées
}


// Gestion des clics
clickButton.addEventListener('click', () => {
    points += pointsPerClick;
    updateDisplay();
});

// Amélioration 1
upgrade1Button.addEventListener('click', () => {
    if (upgrade1Level >= maxUpgrade1Level) {
        alert("Amélioration 1 au niveau maximum !");
        return;
    }
    if (points >= upgrade1Cost) {
        points -= upgrade1Cost;
        pointsPerClick += 2;
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
        upgrade1Level++;
        updateDisplay();
    }
});

// Amélioration 2
upgrade2Button.addEventListener('click', () => {
    if (upgrade2Level >= maxUpgrade2Level) {
        alert("Amélioration 2 au niveau maximum !");
        return;
    }
    if (points >= upgrade2Cost) {
        points -= upgrade2Cost;
        pointsPerClick += 6;
        upgrade2Cost = Math.floor(upgrade2Cost * 2);
        upgrade2Level++;
        updateDisplay();
    }
});

// Achat d'un autoclicker
autoclickerButton.addEventListener('click', () => {
    if (autoclickers >= maxAutoclickers) {
        alert("Nombre maximum d'autoclickers atteint !");
        return;
    }
    if (points >= autoclickerCost) {
        points -= autoclickerCost;
        autoclickers++;
        autoclickerCost = Math.floor(autoclickerCost * 9);
        updateDisplay();
    }
});

// Mise en place de l'autoclicker (ajoute des points automatiquement)
setInterval(() => {
    points += autoclickers * pointsPerClick;
    updateDisplay();
}, 1000);

function changeAvatar(avatarFileName) {
    const avatarImg = document.getElementById("avatar");

    // Vérifie si l'image existe avant de l'afficher
    const newAvatarPath = `Images/${avatarFileName}`;
    fetch(newAvatarPath)
        .then(response => {
            if (response.ok) {
                avatarSrc = newAvatarPath; // Met à jour la variable globale
                avatarImg.src = avatarSrc; // Met à jour l'affichage
                saveGame(); // Sauvegarde les changements
            } else {
                console.error("Image introuvable :", newAvatarPath);
            }
        })
        .catch(error => console.error("Erreur lors du chargement de l'image :", error));
}


// Fonction pour changer le nom
function changeName(newName) {
    playerName = newName;
    updateDisplay();
}

// Exemple pour changer d'avatar
document.getElementById("avatar-select").addEventListener("change", function() {
    changeAvatar(this.value);
});


// Permettre de changer le nom via l'input
document.getElementById("name-input").addEventListener("input", function() {
    changeName(this.value);
});


// 🚫 Réinitialiser le jeu
document.getElementById('reset-game').addEventListener('click', () => {
    console.log('Réinitialisation en cours...');  // Vérification de l'événement
    if (confirm('Voulez-vous vraiment réinitialiser le jeu ?')) {
        localStorage.removeItem('incrementalGameSave');  // Supprimer uniquement les données du jeu dans localStorage
        resetGame();  // Appeler une fonction de réinitialisation du jeu
        updateDisplay();  // Mettre à jour l'affichage
    }
});

// Fonction pour réinitialiser le jeu
function resetGame() {
    points = 0;
    pointsPerClick = 1;
    autoclickers = 0;
    autoclickerCost = 100;
    upgrade1Cost = 10;
    upgrade2Cost = 50;
    upgrade1Level = 0;
    upgrade2Level = 0;
    playerName = "Nom du joueur";
    avatarSrc = "Images/choose_avatar.jpg";
    unlockedTrophies = [];  // Réinitialise les trophées

    // Supprime la sauvegarde complète et recharge le jeu
    saveGame();  // Enregistrer la nouvelle progression après réinitialisation
    updateDisplay();  // Mettre à jour l'affichage du jeu
}

