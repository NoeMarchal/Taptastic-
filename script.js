const maxUpgrade1Level = 100;  // Niveau max pour l'amélioration 1
const maxUpgrade2Level = 100;   // Niveau max pour l'amélioration 2
const maxAutoclickers = 100;   // Nombre max d'autoclickers

// Variables du jeu
let points = 0;
let pointsPerClick = 0;
let upgrade1Cost = 10;
let upgrade2Cost = 50;
let autoclickerCost = 100;
let autoclickers = 0;
let upgrade1Level = 0;
let upgrade2Level = 0;
let unlockedTrophies = []; // Liste des trophées débloqués
let playerName = "Nom du joueur"; // Nom par défaut
let avatarSrc = "./Images/choose_avatar.jpg"; // Avatar par défaut

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
        avatarSrc,
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
    document.getElementById("pps-display").textContent = `Points par seconde: ${autoclickers + pointsPerClick}`;
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

    // Vérifier et débloquer les trophées si les conditions sont remplies
    trophies.forEach(trophy => {
        if (points >= trophy.condition && !unlockedTrophies.includes(trophy.name)) {
            unlockedTrophies.push(trophy.name); // Ajoute le trophée débloqué
        }
    });

    // Afficher tous les trophées
    trophies.forEach(trophy => {
        let li = document.createElement("li");

        // Vérifier si le trophée est débloqué
        let isUnlocked = unlockedTrophies.includes(trophy.name);
        let trophyText = isUnlocked ? `✅ ${trophy.name}` : `❌ ${trophy.name}`;

        // Calcul du pourcentage de progression
        let progress;
        if (isUnlocked) {
            progress = 100; // Fixer à 100% si le trophée est débloqué
        } else {
            progress = Math.min((points / trophy.condition) * 100, 100).toFixed(1); // Calculer le pourcentage
        }

        // Ajouter l'élément dans la liste
        li.innerHTML = `${trophyText} - ${progress}%`;
        trophyList.appendChild(li);
    });

    saveGame(); // Sauvegarde les trophées
}


// Gestion des clics
clickButton.addEventListener('click', () => {
    points += 1;
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
        upgrade1Cost = Math.floor(upgrade1Cost * 1.2);
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
        autoclickerCost = Math.floor(autoclickerCost * 4);
        updateDisplay();
    }
});


function changeAvatar(avatarFileName) {
    const avatarImg = document.getElementById("avatar");

    // Vérifie si l'image existe avant de l'afficher
    const newAvatarPath = `./Images/${avatarFileName}`;
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


document.getElementById('reset-game').addEventListener('click', () => {
    Swal.fire({
        title: 'Réinitialiser le jeu ?',
        text: 'Toutes vos données seront perdues.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, réinitialiser',
        cancelButtonText: 'Annuler',
        didOpen: () => {
            document.querySelector('.swal2-popup').style.borderRadius = '20px';
        }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('incrementalGameSave');  
            resetGame();  
            updateDisplay();  

            Swal.fire(
                'Réinitialisé !',
                'Votre progression a été supprimée.',
                'success'
            );
        }
    });
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
    avatarSrc = "./Images/choose_avatar.jpg";
    unlockedTrophies = [];  // Réinitialise les trophées

    // Supprime la sauvegarde complète et recharge le jeu
    saveGame();  // Enregistrer la nouvelle progression après réinitialisation
    updateDisplay();  // Mettre à jour l'affichage du jeu
}

const clicksButton = document.getElementById('button'); // Récupère le bouton par son ID

clickButton.addEventListener('click', (event) => {
    points += pointsPerClick;

    // Créer un effet de clic
    const clickEffect = document.createElement('div');
    clickEffect.classList.add('click-effect');
    clickEffect.style.left = `${event.clientX - 10}px`; // Position X de la souris
    clickEffect.style.top = `${event.clientY - 10}px`; // Position Y de la souris
    document.body.appendChild(clickEffect);

    // Supprimer l'effet après l'animation
    setTimeout(() => {
        clickEffect.remove();
    }, 500);

    updateDisplay();
});

setInterval(() => {
    if (autoclickers > 0) {
        points += autoclickers * pointsPerClick;

        // Créer un effet d'autoclicker
        const autoclickerEffect = document.createElement('div');
        autoclickerEffect.classList.add('autoclicker-effect');
        autoclickerEffect.textContent = `+${autoclickers * pointsPerClick} points`;
        autoclickerEffect.style.left = `${clickButton.offsetLeft + 50}px`;
        autoclickerEffect.style.top = `${clickButton.offsetTop}px`;
        document.body.appendChild(autoclickerEffect);

        // Supprimer l'effet après l'animation
        setTimeout(() => {
            autoclickerEffect.remove();
        }, 1000);

        updateDisplay();
    }
}, 1000);

function updateTrophies() {
    trophyList.innerHTML = ""; // Vide la liste actuelle

    // Vérifier et débloquer les trophées si les conditions sont remplies
    trophies.forEach(trophy => {
        if (points >= trophy.condition && !unlockedTrophies.includes(trophy.name)) {
            unlockedTrophies.push(trophy.name);

            // Effet de confettis
            confetti({
                particleCount: 100, // Nombre de confettis
                spread: 70, // Étendue des confettis
                origin: { y: 0.6 } // Point d'origine des confettis (en bas de l'écran)
            });

            // Afficher le message "Bravo"
            const bravoMessage = document.createElement('div');
            bravoMessage.classList.add('bravo-message');
            bravoMessage.textContent = "Bravo !";
            document.body.appendChild(bravoMessage);

            // Supprimer le message après 3 secondes
            setTimeout(() => {
                bravoMessage.remove();
            }, 3000);
        }
    });

    // Afficher tous les trophées
    trophies.forEach(trophy => {
        let li = document.createElement("li");

        // Vérifier si le trophée est débloqué
        let isUnlocked = unlockedTrophies.includes(trophy.name);
        let trophyText = isUnlocked ? `✅ ${trophy.name}` : `❌ ${trophy.name}`;

        // Calcul du pourcentage de progression
        let progress;
        if (isUnlocked) {
            progress = 100; // Fixer à 100% si le trophée est débloqué
        } else {
            progress = Math.min((points / trophy.condition) * 100, 100).toFixed(1); // Calculer le pourcentage
        }

        // Ajouter l'élément dans la liste
        li.innerHTML = `${trophyText} - ${progress}%`;
        trophyList.appendChild(li);
    });

    saveGame(); // Sauvegarde les trophées
}
