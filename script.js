const maxUpgrade1Level = 1000;    // niveau max pour l'amélioration 1²
const maxUpgrade2Level = 1000;   // Niveau max pour l'amélioration 2
const maxAutoclickers = 1000;   // Nombre max d'autoclickers
const supermarcheCost = 1000000; // Coût du supermarché
const marchandisesCost = 500000; // Coût des marchandises
const superviseurCost = 700000; // Coût du superviseur
const agrandissementCost = 800000; // Coût de l'agrandissement


// Variables du jeu
let points = 0;
let pointsPerClick = 0;
let upgrade1Cost = 100;
let upgrade2Cost = 500;
let autoclickerCost = 1000;
let autoclickers = 0;
let autoclickerPower = 250; // Chaque autoclicker rapporte 100 points par secondes
let upgrade1Level = 0;
let upgrade2Level = 0;
let unlockedTrophies = []; // Liste des trophées débloqués
let playerName = "Nom du joueur"; // Nom par défaut
let avatarSrc = "Images/choose_avatar.jpg"; // Avatar par défaut
let supermarcheAchete = false;
let marchandisesAchete = false;
let superviseurAchete = false;
let agrandissementAchete = false;

// Liste des trophées et leurs conditions
const trophies = [
    { name: "Débutant", condition: 100 },
    { name: "Apprenti Clicker", condition: 100000 },
    { name: "Clicker Amateur", condition: 500000 },
    { name: "Clicker Confirmé", condition: 1000000 },
    { name: "Clicker Pro", condition: 5000000 },
    { name: "Maître du Click", condition: 10000000 },
    { name: "Incredible clicker master", condition: 1000000000000 }
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
        avatarSrc, // Sauvegarder l'avatar
        supermarcheAchete,
        marchandisesAchete,
        superviseurAchete,
        agrandissementAchete,
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
        avatarSrc = gameData.avatarSrc || "Images/choose_avatar.jpg"; // Charger l'avatar sauvegardé
        supermarcheAchete = gameData.supermarcheAchete || false;
        marchandisesAchete = gameData.marchandisesAchete || false;
        superviseurAchete = gameData.superviseurAchete || false;
        agrandissementAchete = gameData.agrandissementAchete || false;
    }

    // Charger l'avatar depuis localStorage (au cas où il n'est pas dans gameData)
    const savedAvatar = localStorage.getItem("selectedAvatar");
    if (savedAvatar) {
        avatarSrc = savedAvatar;
        document.getElementById("avatar").src = savedAvatar;
    }
    // Désactiver les boutons déjà achetés
    if (supermarcheAchete) disableButton('boutonSupermarche');
    if (marchandisesAchete) disableButton('boutonMarchandises');
    if (superviseurAchete) disableButton('boutonSuperviseur');
    if (agrandissementAchete) disableButton('boutonAgrandissement');

    updateDisplay();
    updateTrophies();
}

// Mettre à jour l'affichage
function updateDisplay() {
    pointsDisplay.textContent = `Points: ${points}`;
    document.getElementById("pps-display").textContent = `Points par seconde: ${autoclickers * autoclickerPower}`;
    document.getElementById("upgrade1-count").textContent = `Améliorations 1 : ${upgrade1Level}`;
    document.getElementById("upgrade2-count").textContent = `Améliorations 2 : ${upgrade2Level}`;
    autoclickerCountDisplay.textContent = `Autoclickers: ${autoclickers}`;
    upgrade1Button.textContent = `Amélioration 1 + 20p/click (Coût: ${upgrade1Cost} points)`;
    upgrade2Button.textContent = `Amélioration 2 + 50p/click (Coût: ${upgrade2Cost} points)`;
    autoclickerButton.textContent = `Acheter un Autoclicker + 250p/sec (Coût: ${autoclickerCost} points)`;
    document.getElementById("player-name").textContent = playerName;
    document.getElementById("avatar").src = avatarSrc; // Utiliser la valeur de avatarSrc
        // Mettre à jour les boutons d'achat
        document.getElementById('boutonSupermarche').textContent = `Acheter Supermarché (Coût: ${supermarcheCost} points)`;
        document.getElementById('boutonMarchandises').textContent = `Acheter Marchandises (Coût: ${marchandisesCost} points)`;
        document.getElementById('boutonSuperviseur').textContent = `Acheter Superviseur (Coût: ${superviseurCost} points)`;
        document.getElementById('boutonAgrandissement').textContent = `Acheter Agrandissement (Coût: ${agrandissementCost} points)`;

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
    points += 0;
    updateDisplay();
});
//Amélioration1 
upgrade1Button.addEventListener('click', () => {
    if (upgrade1Level >= maxUpgrade1Level) {
        // Afficher un message d'erreur stylisé avec SweetAlert2
        Swal.fire({
            title: 'Niveau maximum atteint !',
            text: 'Vous ne pouvez pas améliorer davantage cette compétence.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            didOpen: () => {
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
        return;
    }
    if (points >= upgrade1Cost) {
        points -= upgrade1Cost;
        pointsPerClick +=20;
        upgrade1Cost = Math.floor(upgrade1Cost + 500);
        upgrade1Level++;
        updateDisplay();
    }
});



// Amélioration 2
upgrade2Button.addEventListener('click', () => {
    if (upgrade2Level >= maxUpgrade2Level) {
        // Jouer un son d'erreur
        const errorSound = new Audio('error-sound.mp3');
        errorSound.play();

        // Afficher un message d'erreur stylisé avec SweetAlert2
        Swal.fire({
            title: 'Niveau maximum atteint !',
            text: 'Vous ne pouvez pas améliorer davantage cette compétence.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            didOpen: () => {
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
        return;
    }
    if (points >= upgrade2Cost) {
        points -= upgrade2Cost;
        pointsPerClick +=50;
        upgrade2Cost = Math.floor(upgrade2Cost + 800);
        upgrade2Level++;
        updateDisplay();
    }
});

setInterval(() => {
    if (autoclickers > 0) {
        points += autoclickers * autoclickerPower; // Chaque autoclicker rapporte 250 points par seconde

        // Créer un effet d'autoclicker
        const autoclickerEffect = document.createElement('div');
        autoclickerEffect.classList.add('autoclicker-effect');
        autoclickerEffect.textContent = `+${autoclickers * autoclickerPower} points`;
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

// Achat d'un autoclicker
autoclickerButton.addEventListener('click', () => {
    if (autoclickers >= maxAutoclickers) {
        // Afficher un message d'erreur stylisé avec SweetAlert2
        Swal.fire({
            title: 'Nombre maximum atteint !',
            text: 'Vous ne pouvez pas acheter plus d\'autoclickers.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            didOpen: () => {
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
        return;
    }
    if (points >= autoclickerCost) {
        points -= autoclickerCost;
        autoclickers ++;
        autoclickerCost = Math.floor(autoclickerCost + 1000);
        updateDisplay();
    }
});

function changeAvatar(avatarFileName) {
    const avatarImg = document.getElementById("avatar");

    // Mettre à jour l'image
    const newAvatarPath = `Images/${avatarFileName}`;
    console.log("Nouvel avatar :", newAvatarPath); // ✅ Debug

    avatarImg.src = newAvatarPath;
    avatarSrc = newAvatarPath; // Mettre à jour la variable avatarSrc
    localStorage.setItem("selectedAvatar", newAvatarPath); // Sauvegarder dans localStorage
    saveGame(); // Sauvegarder le jeu après le changement d'avatar
}

// Charger l'avatar sauvegardé au démarrage
window.addEventListener("load", () => {
    const savedAvatar = localStorage.getItem("selectedAvatar");

    if (savedAvatar) {
        console.log("Avatar chargé depuis localStorage :", savedAvatar); // ✅ Debug
        document.getElementById("avatar").src = savedAvatar;
    }
});

// Écouteur pour le changement d'avatar
document.getElementById("avatar-select").addEventListener("change", function() {
    console.log("Avatar sélectionné :", this.value); // ✅ Debug
    changeAvatar(this.value);
});
// Fonction pour changer le nom
function changeName(newName) {
    playerName = newName;
    updateDisplay();
}




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


// Fonction pour réinitialiser le jeu //
function resetGame() {
    points = 0;
    pointsPerClick = 1;
    autoclickers = 0;
    autoclickerCost = 1000;
    upgrade1Cost = 100;
    upgrade2Cost = 500;
    upgrade1Level = 0;
    upgrade2Level = 0;
    playerName = "Nom du joueur";
    avatarSrc = "Images/choose_avatar.jpg"; // Réinitialiser l'avatar
    unlockedTrophies = [];  // Réinitialise les trophées
    supermarcheAchete = false;
    marchandisesAchete = false;
    superviseurAchete = false;
    agrandissementAchete = false;

    // Réactiver les boutons
    document.getElementById('boutonSupermarche').disabled = false;
    document.getElementById('boutonMarchandises').disabled = false;
    document.getElementById('boutonSuperviseur').disabled = false;
    document.getElementById('boutonAgrandissement').disabled = false;


    // Supprimer l'avatar sauvegardé
    localStorage.removeItem("selectedAvatar");

    // Sauvegarder et mettre à jour l'affichage
    saveGame();
    updateDisplay();
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


function updateTrophies() {
    trophyList.innerHTML = ""; // Vide la liste actuelle

    // Vérifier et débloquer les trophées si les conditions sont remplies
    trophies.forEach(trophy => {
        if (points >= trophy.condition && !unlockedTrophies.includes(trophy.name)) {
            unlockedTrophies.push(trophy.name);

            // Effet de confettis
            confetti({
                particleCount: 2000, // Nombre de confettis
                spread: 500, // Étendue des confettis
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
            }, 6000);
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

function disableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = true;
        button.textContent += " (Acheté)";
    }
}

// Écouteur d'événement pour le bouton Supermarché
document.getElementById('boutonSupermarche').addEventListener('click', function() {
    if (!supermarcheAchete && points >= supermarcheCost) {
        points -= supermarcheCost; // Dépense les points
        autoclickerPower += 5000; // Augmente les points par seconde de 5000
        supermarcheAchete = true;
        disableButton('boutonSupermarche');
        updateDisplay();
    }
});

// Écouteur d'événement pour le bouton Marchandises
document.getElementById('boutonMarchandises').addEventListener('click', function() {
    if (!marchandisesAchete && points >= marchandisesCost) {
        points -= marchandisesCost; // Dépense les points
        autoclickerPower += 500; // Augmente les points par seconde de 500
        marchandisesAchete = true;
        disableButton('boutonMarchandises');
        updateDisplay();
    }
});

// Écouteur d'événement pour le bouton Superviseur
document.getElementById('boutonSuperviseur').addEventListener('click', function() {
    if (!superviseurAchete && points >= superviseurCost) {
        points -= superviseurCost; // Dépense les points
        autoclickerPower += 1000; // Augmente les points par seconde de 1000
        superviseurAchete = true;
        disableButton('boutonSuperviseur');
        updateDisplay();
    }
});

// Écouteur d'événement pour le bouton Agrandissement
document.getElementById('boutonAgrandissement').addEventListener('click', function() {
    if (!agrandissementAchete && points >= agrandissementCost) {
        points -= agrandissementCost; // Dépense les points
        autoclickerPower += 2000; // Augmente les points par seconde de 2000
        agrandissementAchete = true;
        disableButton('boutonAgrandissement');
        updateDisplay();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////partie de alexis /////////////////////////////////////////////////////////////////////////////////////////
// Anti auto-clicker + debugger bloquer //
(function() {
    let clickTimes = [];
    let autoClickDetected = false;
    let isConsoleOpen = false;

    function detectAutoClick() {
        const now = performance.now();
        clickTimes.push(now);

        if (clickTimes.length > 10) {
            clickTimes.shift();
        }

        if (clickTimes.length >= 5) { 
            let intervalSum = 0;
            for (let i = 1; i < clickTimes.length; i++) {
                intervalSum += (clickTimes[i] - clickTimes[i - 1]);
            }

            const avgInterval = intervalSum / (clickTimes.length - 1);

            if (avgInterval < 50 && !autoClickDetected) {
                autoClickDetected = true;
                bloquerJeu("Auto-click détecté !", "Vous utilisez un auto-clicker. Ceci est interdit.");
            }
        }
    }

    function detectConsole() {
        console.log('%c ', new Image());
        console.clear();

        setTimeout(() => {
            if (window.outerHeight - window.innerHeight > 100 || window.outerWidth - window.innerWidth > 100) {
                isConsoleOpen = true;
                bloquerJeu("Triche détectée !", "La console est ouverte. Fermez-la immédiatement.");
            }
        }, 100);
    }

    function detectDebugger() {
        setInterval(() => {
            const start = performance.now();
            debugger;
            const duration = performance.now() - start;

            if (duration > 100) {
                bloquerJeu( "Oups !", "Une action interdite a été détectée.");
            }
        }, 1000);
    }

    function bloquerJeu(titre, message) {
        document.body.innerHTML = "";
        Swal.fire({
            title: titre,
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
            allowOutsideClick: false, 
            allowEscapeKey: false, 
            allowEnterKey: false,
        }).then(() => location.reload());
    }

    document.addEventListener("click", detectAutoClick);
    document.addEventListener("touchstart", detectAutoClick);

    setInterval(detectConsole, 1000);
    detectDebugger();

    document.addEventListener("keydown", function(event) {
        if (["F12", "U"].includes(event.key) || (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(event.key)) || (event.metaKey && event.altKey && event.key === "I")) {
            event.preventDefault();
            console.clear();
            bloquerJeu("Triche détectée !", "Raccourci interdit.");
        }
    });

    document.addEventListener("contextmenu", event => event.preventDefault());
})();

// Utilisation d'un outil externe pour modifier le jeu //

setInterval(() => {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        bloquerJeu("Environnement suspect détecté !", "Veuillez jouer normalement.");
    }
}, 1000);

// Ralentissement de la vitesse d'exécution du jeu //

setInterval(() => {
    const start = performance.now();
    for (let i = 0; i < 1000000; i++) {} 
    const duration = performance.now() - start;
    
    if (duration > 500) { 
        bloquerJeu("Interférence détectée !", "Veuillez jouer normalement.");
    }
}, 2000);

// Utilisation script auto-click //

let lastKeyPress = Date.now();

document.addEventListener("keydown", (event) => {
    let now = Date.now();
    if (now - lastKeyPress < 50) {
        bloquerJeu("Appuis trop rapides détectés !", "Veuillez jouer normalement.");
    }
    lastKeyPress = now;
});

// Désactivation mode développeur sur Chrome/Firefox //

setInterval(() => {
    let before = new Date().getTime();
    debugger; // Pause forcée si les outils développeurs sont ouverts
    let after = new Date().getTime();
    
    if (after - before > 100) { // Si un décalage est détecté, ça veut dire que le mode dev est activé
        bloquerJeu("Mode développeur détecté !", "Veuillez désactiver vos outils.");
    }
}, 3000);