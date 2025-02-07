const maxUpgrade1Level = 1000;    // niveau max pour l'amélioration 1
const maxUpgrade2Level = 1000;   // Niveau max pour l'amélioration 2
const maxAutoclickers = 1000;   // Nombre max d'autoclickers

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
    }

    // Charger l'avatar depuis localStorage (au cas où il n'est pas dans gameData)
    const savedAvatar = localStorage.getItem("selectedAvatar");
    if (savedAvatar) {
        avatarSrc = savedAvatar;
        document.getElementById("avatar").src = savedAvatar;
    }

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
    upgrade1Button.textContent = `Amélioration 1 + 10p/click (Coût: ${upgrade1Cost} points)`;
    upgrade2Button.textContent = `Amélioration 2 + 20p/click (Coût: ${upgrade2Cost} points)`;
    autoclickerButton.textContent = `Acheter un Autoclicker + 250p/sec (Coût: ${autoclickerCost} points)`;
    document.getElementById("player-name").textContent = playerName;
    document.getElementById("avatar").src = avatarSrc; // Utiliser la valeur de avatarSrc

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
                particleCount: 1000, // Nombre de confettis
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////partie de alexis /////////////////////////////////////////////////////////////////////////////////////////
//V1 empeche le clic droit et reset 
(function() {
    let isOpen = false;

    function detectConsole() {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                isOpen = true;
                throw new Error("Console détectée !");
            }
        });

        console.log('%c', element);

        if (isOpen) {
            fermerConsoleEtAlerte();
        }
    }

    function fermerConsoleEtAlerte() {
        // Recharge immédiatement la page pour fermer la console
        location.reload();

        // Afficher un pop-up après la fermeture de la console
        setTimeout(() => {
            Swal.fire({
                title: 'Triche détectée !',
                text: 'Vous avez ouvert la console. Le jeu va être réinitialisé.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK',
                didOpen: () => {
                    document.querySelector('.swal2-popup').style.borderRadius = '20px';
                }
            }).then(() => {
                if (typeof resetGame === "function") {
                    resetGame(); // Réinitialise le jeu
                }
            });
        }, 500);
    }

    function detectDebugger() {
        setInterval(() => {
            const start = performance.now();
            debugger;
            const duration = performance.now() - start;

            if (duration > 100) {
                fermerConsoleEtAlerte();
            }
        }, 1000);
    }

    // Vérification continue de la console ouverte
    setInterval(detectConsole, 1000);
    detectDebugger();

    // Bloque les raccourcis clavier pour ouvrir la console
    document.addEventListener("keydown", function(event) {
        if (
            event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) ||
            (event.ctrlKey && event.key === "U") ||
            (event.metaKey && event.altKey && event.key === "I") // Cmd+Opt+I sur Mac
        ) {
            event.preventDefault();
            console.clear();
            fermerConsoleEtAlerte();
        }
    });

    // Bloque l'ouverture de la console par clic droit + "Inspecter"
    document.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });
})();