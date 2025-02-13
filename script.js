const maxUpgrade1Level = 500;    // niveau max pour l'amélioration 1²
const maxUpgrade2Level = 200;   // Niveau max pour l'amélioration 2
const maxAutoclickers = 200;   // Nombre max d'autoclickers
const supermarcheCost = 1200000; // Coût du supermarché
const marchandisesCost = 1500000; // Coût des marchandises
const superviseurCost = 2000000; // Coût du superviseur
const agrandissementCost = 3000000; // Coût de l'agrandissement
const MagasinCost = 100000000; // Coût du supermarché
const MarchandisesdeluxeCost = 150000000; // Coût des marchandises
const NouvellecollectionCost = 200000000; // Coût du superviseur
const DevellopementdanslemondeCost = 300000000; // Coût de l'agrandissement


// Variables du jeu
let points = 0;
let pointsPerClick = 1;
let upgrade1Cost = 100;
let upgrade2Cost = 500;
let autoclickerCost = 1000;
let autoclickers = 0;
let autoclickerPower = 250; // Chaque autoclicker rapporte 250 points par secondes
let upgrade1Level = 0;
let upgrade2Level = 0;
let unlockedTrophies = []; // Liste des trophées débloqués
let playerName = "Nom du joueur"; // Nom par défaut
let avatarSrc = "Images/choose_avatar.jpg"; // Avatar par défaut
let supermarcheAchete = false;
let marchandisesAchete = false;
let superviseurAchete = false;
let agrandissementAchete = false;
let MagasinAchete = false;
let MarchandisesdeluxeAchete = false;
let NouvellecollectionAchete = false;
let DevellopementdanslemondeAchete = false;
let totalClicks = 0;
let totalPointsEarned = 0;
let totalPointsSpent = 0;
let gameStartTime = Date.now(); // Moment où le jeu commence
let elapsedTime = 0; // Temps écoulé en secondes
let gameTime = 0; // en secondes
let boughtItems = [];


// Mise à jour du temps de jeu chaque seconde
setInterval(() => {
    gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
    updateTrophies();
}, 1000);
// Liste des trophées et leurs conditions
const trophies = [
    { name: "Débutant Clikers", condition: 10 },
    { name: "Apprenti Clicker", condition: 100 },
    { name: "Clicker Confirmé", condition: 5000 },
    { name: "Clicker Pro", condition: 10000 },
    { name: "Joue 1h", condition: 3600 }, // 1 heure en secondes
    { name: "Joue 5h", condition: 18000 },   // 5 heures en secondes
    { name: "Amélioration 1 au niveau 50", condition: "upgrade1Level >= 50" },
    { name: "Amélioration 2 au niveau 50", condition: "upgrade2Level >= 50" },
    { name: "Autoclicker au niveau 50", condition: "autoclickers >= 50" },
    { name: "Amélioration 1 au niveau 100", condition: "upgrade1Level >= 100" },
    { name: "Amélioration 2 au niveau 100", condition: "upgrade2Level >= 100" },
    { name: "Autoclicker au niveau 100", condition: "autoclickers >= 100" },
    { name: "Amélioration 1 au niveau 150", condition: "upgrade1Level >= 150" },
    { name: "Amélioration 2 au niveau 150", condition: "upgrade2Level >= 150" },
    { name: "Autoclicker au niveau 150", condition: "autoclickers >= 150" },
    { name: "Amélioration 1 au niveau 200", condition: "upgrade1Level >= 200" },
    { name: "Amélioration 2 au niveau 200", condition: "upgrade2Level >= 200" },
    { name: "Autoclicker au niveau 200", condition: "autoclickers >= 200" },
    { name: "Amélioration 1 au niveau 250", condition: "upgrade1Level >= 250" },
    { name: "Amélioration 2 au niveau 250", condition: "upgrade2Level >= 250" },
    { name: "Autoclicker au niveau 250", condition: "autoclickers >= 250" },
    { name: "Amélioration 1 au niveau 300", condition: "upgrade1Level >= 300" },
    { name: "Amélioration 2 au niveau 300", condition: "upgrade2Level >= 300" },
    { name: "Autoclicker au niveau 300", condition: "autoclickers >= 300" },
    { name: "Amélioration 1 au niveau 350", condition: "upgrade1Level >= 350" },
    { name: "Amélioration 2 au niveau 350", condition: "upgrade2Level >= 350" },
    { name: "Autoclicker au niveau 350", condition: "autoclickers >= 350" },
    { name: "Amélioration 1 au niveau 400", condition: "upgrade1Level >= 400" },
    { name: "Amélioration 2 au niveau 400", condition: "upgrade2Level >= 400" },
    { name: "Autoclicker au niveau 400", condition: "autoclickers >= 400" },
    { name: "Amélioration 1 au niveau 450", condition: "upgrade1Level >= 450" },
    { name: "Amélioration 2 au niveau 450", condition: "upgrade2Level >= 450" },
    { name: "Autoclicker au niveau 450", condition: "autoclickers >= 450" },
    { name: "Amélioration 1 au niveau 500", condition: "upgrade1Level >= 500" },
    { name: "Amélioration 2 au niveau 500", condition: "upgrade2Level >= 500" },
    { name: "Autoclicker au niveau 500", condition: "autoclickers >= 500" },
    { name: "1 000 Points", condition: "points >= 1000" }, // Nouveau trophée
    { name: "5 000 Points", condition: "points >= 5000" }, // Nouveau trophée
    { name: "10 000 Points", condition: "points >= 10000" }, // Nouveau trophée
    { name: "50 000 Points", condition: "points >= 50000" }, // Nouveau trophée
    { name: "100 000 Points", condition: "points >= 100000" }, // Nouveau trophée
    { name: "500 000 Points", condition: "points >= 500000" }, // Nouveau trophée
    { name: "1 000 000 Points", condition: "points >= 1000000" }, // Nouveau trophée
    { name: "100 000 000 Points", condition: "points >= 100000000" }, // Nouveau trophée
    { name: "Maître Ultime", condition: "unlockedTrophies.length >= trophies.length - 1" }, // Nouveau trophée
    { name: "Supermarket Acheté", condition: "supermarcheAchete === true" },
    { name: "Marchandises Achetées", condition: "marchandisesAchete === true" },
    { name: "Superviseur Acheté", condition: "superviseurAchete === true" },
    { name: "Agrandissement Acheté", condition: "agrandissementAchete === true" },
    { name: "Magasin de luxe Acheté", condition: "MagasinAchete === true" },
    { name: "Marchandises de luxe Achetées", condition: "MarchandisesdeluxeAchete === true" },
    { name: "Nouvelles collections Acheté", condition: "NouvellecollectionAchete === true" },
    { name: "Dévellopement dans le monde Acheté", condition: "DevellopementdanslemondeAchete === true" },
];

// Liste des objets disponibles à l'achat
const items = [
    { name: "Karaba", cost: 100 },
    { name: "Un bon BK", cost: 1000 },
    { name: "Miltipla", cost: 132000 },
    { name: "Paye ta race", cost: 300000 },
    { name: "Give me money", cost: 1000000 },
    { name: "Maison", cost: 300000000 },
    { name: "Une Audi", cost: 1000000000 },
    { name: "TP de Tondeurrrrrr", cost: 40000000000 }
];


// Éléments du DOM
const pointsDisplay = document.getElementById('points');
const clickButton = document.getElementById('click-button');
const upgrade1Button = document.getElementById('upgrade1');
const upgrade2Button = document.getElementById('upgrade2');
const autoclickerButton = document.getElementById('autoclicker-button');
const autoclickerCountDisplay = document.getElementById('autoclicker-count');
const trophyList = document.getElementById("trophy-list");
// Éléments du DOM
const itemsToBuyContainer = document.getElementById('items-to-buy');
const itemsBoughtContainer = document.getElementById('items-bought');

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
        totalClicks,
        totalPointsEarned,
        totalPointsSpent,
        gameStartTime, // Sauvegarder l'heure de début du jeu
        elapsedTime, // Sauvegarder le temps écoulé
        MagasinAchete,
        MarchandisesdeluxeAchete,
        NouvellecollectionAchete,
        DevellopementdanslemondeAchete,
        boughtItems,
    


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
        MagasinAchete = gameData.MagasinAchete || false;
        MarchandisesdeluxeAchete = gameData.MarchandisesdeluxeAchete || false;
        NouvellecollectionAchete = gameData.NouvellecollectionAchete || false;
        DevellopementdanslemondeAchete = gameData.DevellopementdanslemondeAchete || false;
        totalClicks = gameData.totalClicks || 0;
        totalPointsEarned = gameData.totalPointsEarned || 0;
        totalPointsSpent = gameData.totalPointsSpent || 0;
        gameStartTime = gameData.gameStartTime || Date.now(); // Charger l'heure de début du jeu
        elapsedTime = gameData.elapsedTime || 0; // Charger le temps écoulé
        boughtItems = gameData.boughtItems ||[];
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
    if (MagasinAchete) disableButton('boutonMagasin');
    if (MarchandisesdeluxeAchete) disableButton('boutonMarchandisesdeluxe');
    if (NouvellecollectionAchete) disableButton('boutonNouvellecollection');
    if (DevellopementdanslemondeAchete) disableButton('boutonDevellopementdanslemonde');


    updateDisplay();
    updateTrophies();
    displayItems();
}

// Mettre à jour l'affichage
function updateDisplay() {
    pointsDisplay.textContent = `Points: ${formatNumber(points)}`;
      // Mettre à jour les points par clic
      document.getElementById('points-per-click').textContent = `Points par clic: ${formatNumber(pointsPerClick)}`;
    document.getElementById("pps-display").textContent = `Points par seconde: ${formatNumber(autoclickers * autoclickerPower)}`;
    document.getElementById("upgrade1-count").textContent = `Améliorations 1 : ${upgrade1Level}`;
    document.getElementById("upgrade2-count").textContent = `Améliorations 2 : ${upgrade2Level}`;
    autoclickerCountDisplay.textContent = `Autoclickers: ${autoclickers}`;
    upgrade1Button.textContent = `Amélioration 1 + 20p/click (Coût: ${formatNumber(upgrade1Cost)} points)`;
    upgrade2Button.textContent = `Amélioration 2 + 50p/click (Coût: ${formatNumber(upgrade2Cost)} points)`;
    autoclickerButton.textContent = `Acheter un Autoclicker + 250p/sec (Coût: ${formatNumber(autoclickerCost)} points)`;
    document.getElementById("player-name").textContent = playerName;
    document.getElementById("avatar").src = avatarSrc; // Utiliser la valeur de avatarSrc
        // Mettre à jour les boutons d'achat
        document.getElementById('boutonSupermarche').textContent = `Acheter Supermarché (Coût: ${formatNumber(supermarcheCost)} points)`;
        document.getElementById('boutonMarchandises').textContent = `Acheter Marchandises (Coût: ${formatNumber(marchandisesCost)} points)`;
        document.getElementById('boutonSuperviseur').textContent = `Embaucher un Superviseur (Coût: ${formatNumber(superviseurCost)} points)`;
        document.getElementById('boutonAgrandissement').textContent = `Agrandissement du magasin (Coût: ${formatNumber(agrandissementCost)} points)`;
        document.getElementById('boutonMagasin').textContent = `Magasin de luxe  (Coût: ${formatNumber(MagasinCost)} points)`;
        document.getElementById('boutonMarchandisesdeluxe').textContent = `Marchandises de luxe (Coût: ${formatNumber(MarchandisesdeluxeCost)} points)`;
        document.getElementById('boutonNouvellecollection').textContent = `Nouvelles collections (Coût: ${formatNumber(NouvellecollectionCost)} points)`;
        document.getElementById('boutonDevellopementdanslemonde').textContent = `Dévelloper dans le monde (Coût: ${formatNumber(DevellopementdanslemondeCost)} points)`;
        document.getElementById('total-clicks').textContent = `Nombre total de clics : ${formatNumber(totalClicks)}`;
document.getElementById('total-points-earned').textContent = `Points gagnés au total : ${formatNumber(totalPointsEarned)}`;
document.getElementById("total-points-spent").textContent = `Points dépensés au total : ${formatNumber(totalPointsSpent)}`;

// Calcul des heures, minutes et secondes
let hours = Math.floor(elapsedTime / 3600); // Diviser par 3600 pour obtenir les heures
let minutes = Math.floor((elapsedTime % 3600) / 60); // Diviser le reste des secondes par 60 pour obtenir les minutes
let seconds = elapsedTime % 60; // Le reste est le nombre de secondes

// Ajouter un 0 devant les heures, minutes et secondes si nécessaire
hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;
seconds = seconds < 10 ? '0' + seconds : seconds;

// Afficher l'heure au format hh:mm:ss
document.getElementById('elapsed-time').textContent = `Temps écoulé : ${hours}:${minutes}:${seconds}`;


    updateTrophies();
    displayItems();
    saveGame(); // Sauvegarde après chaque mise à jour
}


function formatNumber(number) {

    // Si le nombre est supérieur ou égal à 1 milliards 
    if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'Mds';
    }

    // Si le nombre est supérieur ou égal à 1 million  
    else if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    // Si le nombre est supérieur ou égal à 1 000
    else if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    // Sinon, juste ajouter les séparateurs de milliers
    return number.toLocaleString();
}

function updateTrophies() {
    const trophyList = document.getElementById('trophy-list');
    const trophyCountElement = document.getElementById('trophy-count');

    // Vider la liste actuelle
    trophyList.innerHTML = "";

    // Vérifier et débloquer les trophées
    trophies.forEach(trophy => {
        let conditionMet = false;

        // Vérifier si la condition est une chaîne de caractères (pour les trophées dynamiques)
        if (typeof trophy.condition === 'string') {
            // Évaluer la condition dynamiquement
            conditionMet = eval(trophy.condition);
        } else if (trophy.name.includes("Joue")) {
            // Pour les trophées basés sur le temps de jeu
            conditionMet = (gameTime >= trophy.condition);
        } else {
            // Pour les trophées basés sur les clics
            conditionMet = (totalClicks >= trophy.condition);
        }

        // Si la condition est remplie et que le trophée n'est pas déjà débloqué
        if (conditionMet && !unlockedTrophies.includes(trophy.name)) {
            unlockedTrophies.push(trophy.name);

            // 🎉 Effet de confettis
            confetti({
                particleCount: 2000, 
                spread: 500, 
                origin: { y: 0.6 } 
            });

            // Afficher "Bravo !"
            const bravoMessage = document.createElement('div');
            bravoMessage.classList.add('bravo-message');
            bravoMessage.textContent = "Bravo !";
            document.body.appendChild(bravoMessage);

            // Supprimer le message après 3 secondes
            setTimeout(() => {
                bravoMessage.remove();
            }, 3000);

            if (trophy.name === "Maître Ultime") {
                console.log("Condition pour 'Maître Ultime' remplie !"); // Ajoutez ce log pour vérifier
                const ultimateMessage = document.createElement('div');
                ultimateMessage.classList.add('ultimate-message');
                ultimateMessage.textContent = "Félicitations, vous avez fini le jeu !";
                document.body.appendChild(ultimateMessage);
            
                setTimeout(() => {
                    ultimateMessage.remove();
                }, 5000);
            }
        }
    });

    // Mettre à jour le compteur de trophées dans le <h2>
    trophyCountElement.textContent = `${unlockedTrophies.length}/${trophies.length}`;

    // Afficher uniquement les trophées débloqués
    if (unlockedTrophies.length === 0) {
        // Afficher un message si aucun trophée n'est débloqué
        const li = document.createElement('li');
        li.textContent = "Aucun trophée débloqué pour l’instant.";
        trophyList.appendChild(li);
    } else {
        unlockedTrophies.forEach(trophyName => {
            // Trouver le trophée correspondant dans la liste `trophies`
            const trophy = trophies.find(t => t.name === trophyName);
            if (trophy) {
                const li = document.createElement('li');

                // Texte du trophée
                const trophyText = `✅ ${trophy.name}`;

                // Progression (toujours 100% car le trophée est débloqué)
                const progress = 100;

                // Ajouter l'élément à la liste
                li.innerHTML = `${trophyText} - ${progress}%`;
                trophyList.appendChild(li);
            }
        });
    }

    saveGame(); // Sauvegarde des trophées
}
// Fonction pour exporter la sauvegarde dans un fichier
function exportSave() {
    const gameData = localStorage.getItem('incrementalGameSave');
    if (!gameData) {
        Swal.fire("Erreur", "Aucune sauvegarde trouvée !", "error");
        return;
    }

    const blob = new Blob([gameData], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'incrementalGameSave.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function loadSave(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const gameData = JSON.parse(e.target.result);

            // Vérification de la structure des données avant de les appliquer
            if (gameData) {
                // Assurez-vous que toutes les variables sont bien mises à jour
                points = gameData.points || points;
                pointsPerClick = gameData.pointsPerClick || pointsPerClick;
                upgrade1Cost = gameData.upgrade1Cost || upgrade1Cost;
                upgrade2Cost = gameData.upgrade2Cost || upgrade2Cost;
                autoclickerCost = gameData.autoclickerCost || autoclickerCost;
                autoclickers = gameData.autoclickers || autoclickers;
                upgrade1Level = gameData.upgrade1Level || upgrade1Level;
                upgrade2Level = gameData.upgrade2Level || upgrade2Level;
                unlockedTrophies = gameData.unlockedTrophies || unlockedTrophies;
                playerName = gameData.playerName || playerName;
                avatarSrc = gameData.avatarSrc || avatarSrc;
                supermarcheAchete = gameData.supermarcheAchete || supermarcheAchete;
                marchandisesAchete = gameData.marchandisesAchete || marchandisesAchete;
                superviseurAchete = gameData.superviseurAchete || superviseurAchete;
                agrandissementAchete = gameData.agrandissementAchete || agrandissementAchete;
                MagasinAchete = gameData.MagasinAchete || MagasinAchete;
                MarchandisesdeluxeAchete = gameData.MarchandisesdeluxeAchete || MarchandisesdeluxeAchete;
                NouvellecollectionAchete = gameData.NouvellecollectionAchete || NouvellecollectionAchete;
                DevellopementdanslemondeAchete = gameData.DevellopementdanslemondeAchete || DevellopementdanslemondeAchete;
                totalClicks = gameData.totalClicks || totalClicks;
                totalPointsEarned = gameData.totalPointsEarned || totalPointsEarned;
                totalPointsSpent = gameData.totalPointsSpent || totalPointsSpent;
                gameStartTime = gameData.gameStartTime || gameStartTime;
                elapsedTime = gameData.elapsedTime || elapsedTime;
                boughtItems = gameData.boughtItems || []; // Charger la liste des objets achetés

                // Recharge l'avatar si nécessaire
                if (gameData.avatarSrc) {
                    document.getElementById("avatar").src = gameData.avatarSrc;
                }

                // Désactivation des boutons si nécessaire
                if (gameData.supermarcheAchete) disableButton('boutonSupermarche');
                if (gameData.marchandisesAchete) disableButton('boutonMarchandises');
                if (gameData.superviseurAchete) disableButton('boutonSuperviseur');
                if (gameData.agrandissementAchete) disableButton('boutonAgrandissement');
                if (gameData.MagasinAchete) disableButton('boutonMagasin');
                if (gameData.MarchandisesdeluxeAchete) disableButton('boutonMarchandisesdeluxe');
                if (gameData.NouvellecollectionAchete) disableButton('boutonNouvellecollection');
                if (gameData.DevellopementdanslemondeAchete) disableButton('boutonDevellopementdanslemonde');

                // Vider l'inventaire des objets achetés
                itemsBoughtContainer.innerHTML = '';

                // Réafficher les objets achetés dans l'inventaire
                boughtItems.forEach(itemName => {
                    const item = items.find(i => i.name === itemName); // Trouver l'objet dans la liste des items
                    if (item) {
                        addToBoughtItems(item); // Réafficher l'objet dans l'inventaire
                    }
                });

                // Met à jour l'affichage du jeu
                updateDisplay();
                updateTrophies();
                displayItems(); // Réafficher les objets disponibles dans la boutique

                Swal.fire("Succès", "Sauvegarde chargée avec succès !", "success");
            } else {
                throw new Error("Données de sauvegarde invalides.");
            }
        } catch (error) {
            Swal.fire("Erreur", "Erreur lors du chargement de la sauvegarde !", "error");
        }
    };
    reader.readAsText(file);
}

// Fonction pour afficher le popup avec les options de sauvegarde
function showSavePopup() {
    Swal.fire({
        title: 'Gestion de la sauvegarde',
        html: `
            <button onclick="exportSave()" class="swal2-confirm swal2-styled">Télécharger la sauvegarde</button>
            <button onclick="document.getElementById('uploadSave').click()" class="swal2-cancel swal2-styled">Charger une sauvegarde</button>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false
    });
}


clickButton.replaceWith(clickButton.cloneNode(true)); // Évite les doublons d'écouteurs d'événements
const newClickButton = document.getElementById('click-button');

newClickButton.addEventListener('click', () => {
    totalClicks++;  // Seuls les clics manuels augmentent cette variable !
    let pointsGagnes = pointsPerClick > 0 ? pointsPerClick : 1; // Toujours au moins 1 point
    points += pointsGagnes;  
    totalPointsEarned += pointsGagnes;

    // Mise à jour de l'affichage et des trophées
    updateDisplay();
    displayItems();
    updateTrophies(); // Vérifie si un trophée doit être débloqué
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
        totalPointsSpent += upgrade1Cost;
        pointsPerClick +=20;
        upgrade1Cost = Math.floor(upgrade1Cost + 500);
        upgrade1Level++;
        updateDisplay();
        displayItems();
        updateTrophies();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(upgrade1Cost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
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
        totalPointsSpent += upgrade2Cost;
        pointsPerClick +=50;
        upgrade2Cost = Math.floor(upgrade2Cost + 800);
        upgrade2Level++;
        updateDisplay();
        updateTrophies();
        displayItems();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(upgrade2Cost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});

setInterval(() => {
    if (autoclickers > 0) {
        let gainedPoints = autoclickers * autoclickerPower;
        points += gainedPoints;
        totalPointsEarned += gainedPoints;

        // Vérifier si le bouton de clic existe
        const clickButton = document.getElementById('click-button');
        if (clickButton) {
            // Créer un effet d'autoclicker
            const autoclickerEffect = document.createElement('div');
            autoclickerEffect.classList.add('autoclicker-effect');
            autoclickerEffect.textContent = `+${formatNumber(gainedPoints)} points`;

            // Placer l'effet près du bouton
            const rect = clickButton.getBoundingClientRect();
            autoclickerEffect.style.left = `${rect.left + window.scrollX + 50}px`;
            autoclickerEffect.style.top = `${rect.top + window.scrollY}px`;

            document.body.appendChild(autoclickerEffect);

            // Supprimer l'effet après l'animation
            setTimeout(() => {
                autoclickerEffect.remove();
            }, 1000);
        }

        updateDisplay();
    }
    // Mettre à jour le temps écoulé
    elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000); // Temps écoulé en secondes
    updateDisplay(); // Appeler pour mettre à jour l'affichage du temps
}, 1000);


// Achat d'un autoclicker
autoclickerButton.addEventListener('click', () => {
    if (autoclickers >= maxAutoclickers) {
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
        totalPointsSpent += autoclickerCost;
        autoclickers++;
        autoclickerCost = Math.floor(autoclickerCost + 10000);
        updateDisplay();
        displayItems();
        updateTrophies();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(autoclickerCost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
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
    MagasinAchete = false;
    MarchandisesdeluxeAchete = false;
    NouvellecollectionAchete = false;
    DevellopementdanslemondeAchete = false;
    totalClicks = 0;
    totalPointsEarned = 0;
    totalPointsSpent = 0;
    gameStartTime = Date.now(); // Moment où le jeu commence
    elapsedTime = 0; // Temps écoulé en secondes
    gameTime = 0; // en secondes
    boughtItems = [];
    


    // Réactiver les boutons
    document.getElementById('boutonSupermarche').disabled = false;
    document.getElementById('boutonMarchandises').disabled = false;
    document.getElementById('boutonSuperviseur').disabled = false;
    document.getElementById('boutonAgrandissement').disabled = false;
    document.getElementById('boutonMagasin').disabled = false;
    document.getElementById('boutonMarchandisesdeluxe').disabled = false;
    document.getElementById('boutonNouvellecollection').disabled = false;
    document.getElementById('boutonDevellopementdanslemonde').disabled = false;


    // Supprimer l'avatar sauvegardé
    localStorage.removeItem("selectedAvatar");

     // Vider l'inventaire des objets achetés
     itemsBoughtContainer.innerHTML = '';

    // Sauvegarder et mettre à jour l'affichage
    saveGame();
    updateDisplay();
    displayItems();
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
        totalPointsSpent += supermarcheCost;
        autoclickerPower += 5000; // Augmente les points par seconde de 5000
        pointsPerClick +=5000;
        supermarcheAchete = true;
        disableButton('boutonSupermarche');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(supermarcheCost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});

// Écouteur d'événement pour le bouton Marchandises
document.getElementById('boutonMarchandises').addEventListener('click', function() {
    if (!marchandisesAchete && points >= marchandisesCost) {
        points -= marchandisesCost; // Dépense les points
        totalPointsSpent += marchandisesCost;
        autoclickerPower += 500; // Augmente les points par seconde de 500
        pointsPerClick +=500;
        marchandisesAchete = true;
        disableButton('boutonMarchandises');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(marchandisesCost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});

// Écouteur d'événement pour le bouton Superviseur
document.getElementById('boutonSuperviseur').addEventListener('click', function() {
    if (!superviseurAchete && points >= superviseurCost) {
        points -= superviseurCost; // Dépense les points
        totalPointsSpent += superviseurCost;
        autoclickerPower += 1000; // Augmente les points par seconde de 1000
        pointsPerClick +=1000;
        superviseurAchete = true;
        disableButton('boutonSuperviseur');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(superviseurAchete - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});

// Écouteur d'événement pour le bouton Agrandissement
document.getElementById('boutonAgrandissement').addEventListener('click', function() {
    if (!agrandissementAchete && points >= agrandissementCost) {
        points -= agrandissementCost; // Dépense les points
        totalPointsSpent += marchandisesCost;
        autoclickerPower += 2000; // Augmente les points par seconde de 2000
        pointsPerClick +=2000;
        agrandissementAchete = true;
        disableButton('boutonAgrandissement');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(agrandissementCost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});

document.getElementById('toggle-arrow').addEventListener('click', function() {
    const trophyList = document.getElementById('trophy-list');
    const arrow = document.getElementById('toggle-arrow');

    // Basculer la visibilité de la liste
    trophyList.classList.toggle('visible');

    // Basculer la rotation de la flèche
    arrow.classList.toggle('rotated');
});


// Écouteur d'événement pour le bouton Magasin
document.getElementById('boutonMagasin').addEventListener('click', function() {
    if (!MagasinAchete && points >= MagasinCost) {
        points -= MagasinCost; // Dépense les points
        totalPointsSpent += MagasinCost;
        autoclickerPower += 20000; // Augmente les points par seconde de 5000
        pointsPerClick +=20000;
        MagasinAchete = true;
        disableButton('boutonMagasin');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(MagasinCost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});

// Écouteur d'événement pour le bouton Marchandises de luxe
document.getElementById('boutonMarchandisesdeluxe').addEventListener('click', function() {
    if (!MarchandisesdeluxeAchete && points >= MarchandisesdeluxeCost) {
        points -= MarchandisesdeluxeCost; // Dépense les points
        totalPointsSpent += MarchandisesdeluxeCost;
        autoclickerPower += 50000; // Augmente les points par seconde de 500
        pointsPerClick +=50000;
        MarchandisesdeluxeAchete = true;
        disableButton('boutonMarchandisesdeluxe');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(MarchandisesdeluxeCost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});

// Écouteur d'événement pour le bouton Nouvelles collections
document.getElementById('boutonNouvellecollection').addEventListener('click', function() {
    if (!NouvellecollectionAchete && points >= NouvellecollectionCost) {
        points -= NouvellecollectionCost; // Dépense les points
        totalPointsSpent += NouvellecollectionCost;
        autoclickerPower += 100000; // Augmente les points par seconde de 1000
        pointsPerClick +=100000;
        NouvellecollectionAchete = true;
        disableButton('boutonNouvellecollection');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(NouvellecollectionCost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});

// Écouteur d'événement pour le bouton devellopement dans le monde 
document.getElementById('boutonDevellopementdanslemonde').addEventListener('click', function() {
    if (!DevellopementdanslemondeAchete && points >= DevellopementdanslemondeCost) {
        points -= DevellopementdanslemondeCost; // Dépense les points
        totalPointsSpent += DevellopementdanslemondeCost;
        autoclickerPower += 200000; // Augmente les points par seconde de 2000
        pointsPerClick +=200000;
        DevellopementdanslemondeAchete = true;
        disableButton('boutonDevellopementdanslemonde');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(DevellopementdanslemondeCost - points)} points pour acheter.`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
});



function displayItems() {
    itemsToBuyContainer.innerHTML = ''; // Vider le conteneur

    items.forEach(item => {
        // Vérifier si l'objet a déjà été acheté
        if (boughtItems.includes(item.name)) {
            return; // Ne pas afficher l'objet s'il a déjà été acheté
        }

        // Créer un bouton pour chaque objet
        const itemButton = document.createElement('button');
        itemButton.className = 'item-button';
        itemButton.textContent = `${item.name} - ${formatNumber(item.cost)} points`;
        itemButton.addEventListener('click', () => buyItem(item)); // Ajouter l'événement click
        itemsToBuyContainer.appendChild(itemButton); // Ajouter le bouton au conteneur
    });
}

function buyItem(item) {
    if (boughtItems.includes(item.name)) {
        alert("Vous avez déjà acheté cet objet !");
        return; // Arrêter la fonction si l'objet a déjà été acheté
    }

    if (points >= item.cost) {
        points -= item.cost; // Retirer les points
        totalPointsSpent += item.cost;
        boughtItems.push(item.name); // Ajouter l'objet à la liste des objets achetés
        addToBoughtItems(item); // Ajouter l'objet à l'inventaire
        saveGame(); // Sauvegarder le jeu
        displayItems(); // Mettre à jour l'affichage des objets disponibles
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Points insuffisants',
            text: `Il vous manque ${formatNumber(item.cost - points)} points pour acheter "${item.name}".`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
}

function addToBoughtItems(item) {
    const boughtItemElement = document.createElement('div');
    boughtItemElement.className = 'item bought';
    boughtItemElement.textContent = item.name;
    itemsBoughtContainer.appendChild(boughtItemElement);
}

// Réafficher les objets achetés dans l'inventaire
itemsBoughtContainer.innerHTML = ''; // Vider l'inventaire avant de réafficher
boughtItems.forEach(itemName => {
    const item = items.find(i => i.name === itemName); // Trouver l'objet dans la liste des items
    if (item) {
        addToBoughtItems(item); // Réafficher l'objet dans l'inventaire
    }
});

// Initialisation
displayItems();
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
            didOpen: () => {
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
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