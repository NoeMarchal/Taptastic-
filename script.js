const maxUpgrade1Level = 300;    // niveau max pour l'amélioration 1²
const maxUpgrade2Level = 300;   // Niveau max pour l'amélioration 2
const maxAutoclickers = 300;   // Nombre max d'autoclickers
const supermarcheCost = 1400000; // Coût du supermarché
const marchandisesCost = 2500000; // Coût des marchandises
const superviseurCost = 3000000; // Coût du superviseur
const agrandissementCost = 5000000; // Coût de l'agrandissement
const MagasinCost = 200000000; // Coût du supermarché
const MarchandisesdeluxeCost = 250000000; // Coût des marchandises
const NouvellecollectionCost = 300000000; // Coût du superviseur
const DevellopementdanslemondeCost = 500000000; // Coût de l'agrandissement



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
let historique = [];
let tickets = 0;





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
    { name: "5 000 €", condition: "points >= 5000" }, // Nouveau trophée
    { name: "10 000 €", condition: "points >= 10000" }, // Nouveau trophée
    { name: "50 000 €", condition: "points >= 50000" }, // Nouveau trophée
    { name: "100 000 €", condition: "points >= 100000" }, // Nouveau trophée
    { name: "500 000 €", condition: "points >= 500000" }, // Nouveau trophée
    { name: "1 000 000 €", condition: "points >= 1000000" }, // Nouveau trophée
    { name: "100 000 000 €", condition: "points >= 100000000" }, // Nouveau trophée
    { name: "100 000 000 000 €", condition: "points >= 100000000000" }, // Nouveau trophée
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
    { name: "TP de Tondeurrrrrr", cost: 40000000000 },
    { name: "Anti Matiere", cost:  1000000000000 }
];

// Propriétés des tickets (coût, multiplicateur)
const ticketProperties = {
    100: { multiplicateur: 0.1 }, // Ticket Basique
    1000: { multiplicateur: 0.2 }, // Ticket Intermédiaire
    10000: { multiplicateur: 0.5 }, // Ticket Avancé
    1000000: { multiplicateur: 1.0 }, // Ticket Expert
    100000000: { multiplicateur: 2.0 } // Ticket Premium
};

// Éléments du DOM
const pointsDisplay = document.getElementById('points');
const clickButton = document.getElementById('click-button');
const upgrade1Button = document.getElementById('upgrade1');
const upgrade2Button = document.getElementById('upgrade2');
const autoclickerButton = document.getElementById('autoclicker-button');
const autoclickerCountDisplay = document.getElementById('autoclicker-count');
const trophyList = document.getElementById("trophy-list");
const itemsToBuyContainer = document.getElementById('items-to-buy');
const itemsBoughtContainer = document.getElementById('items-bought');
const ticketsElement = document.getElementById("tickets");
const ticketTypeSelect = document.getElementById("ticketType");
const ticketQuantitySelect = document.getElementById("ticketQuantity");
const coutTotalElement = document.getElementById("coutTotal");
const acheterTicketButton = document.getElementById("acheterTicket");
const miseSelect = document.getElementById("mise");
const parierButton = document.getElementById("parier");
const resultatElement = document.getElementById("resultat");
const animationElement = document.getElementById("animation");
const historiqueList = document.getElementById("historique-list");

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
        historique,
        tickets,
    


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
        historique = gameData.historique ||[];
        tickets = gameData.tickets;
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
    updateUI();
    updateTrophies();
    displayItems();
}

// Mettre à jour l'affichage
function updateDisplay() {
    pointsDisplay.textContent = `€: ${formatNumber(points)}`;
      // Mettre à jour les points par clic
      document.getElementById('points-per-click').textContent = `€ par clic: ${formatNumber(pointsPerClick)}`;
    document.getElementById("pps-display").textContent = `€ par seconde: ${formatNumber(autoclickers * autoclickerPower)}`;
    document.getElementById("upgrade1-count").textContent = `Améliorations 1 : ${upgrade1Level}`;
    document.getElementById("upgrade2-count").textContent = `Améliorations 2 : ${upgrade2Level}`;
    autoclickerCountDisplay.textContent = `Autoclickers: ${autoclickers}`;
    upgrade1Button.textContent = `Amélioration 1 + 20€/click (Coût: ${formatNumber(upgrade1Cost)} €)`;
    upgrade2Button.textContent = `Amélioration 2 + 50€/click (Coût: ${formatNumber(upgrade2Cost)} €)`;
    autoclickerButton.textContent = `Acheter un Autoclicker + 250€/sec (Coût: ${formatNumber(autoclickerCost)} €)`;
    document.getElementById("player-name").textContent = playerName;
    document.getElementById("avatar").src = avatarSrc; // Utiliser la valeur de avatarSrc
        // Mettre à jour les boutons d'achat
        document.getElementById('boutonSupermarche').textContent = `Acheter Supermarché (Coût: ${formatNumber(supermarcheCost)} €)`;
        document.getElementById('boutonMarchandises').textContent = `Acheter Marchandises (Coût: ${formatNumber(marchandisesCost)} €)`;
        document.getElementById('boutonSuperviseur').textContent = `Embaucher un Superviseur (Coût: ${formatNumber(superviseurCost)} €)`;
        document.getElementById('boutonAgrandissement').textContent = `Agrandissement du magasin (Coût: ${formatNumber(agrandissementCost)} €)`;
        document.getElementById('boutonMagasin').textContent = `Magasin de luxe  (Coût: ${formatNumber(MagasinCost)} €)`;
        document.getElementById('boutonMarchandisesdeluxe').textContent = `Marchandises de luxe (Coût: ${formatNumber(MarchandisesdeluxeCost)} €)`;
        document.getElementById('boutonNouvellecollection').textContent = `Nouvelles collections (Coût: ${formatNumber(NouvellecollectionCost)} €)`;
        document.getElementById('boutonDevellopementdanslemonde').textContent = `Dévelloper dans le monde (Coût: ${formatNumber(DevellopementdanslemondeCost)} €)`;
        document.getElementById('total-clicks').textContent = `Nombre total de clics : ${formatNumber(totalClicks)}`;
document.getElementById('total-points-earned').textContent = `€ gagnés au total : ${formatNumber(totalPointsEarned)}`;
document.getElementById("total-points-spent").textContent = `€ dépensés au total : ${formatNumber(totalPointsSpent)}`;
    document.getElementById('upgrade1').classList.toggle('upgrade-available', points >= upgrade1Cost);
    document.getElementById('upgrade2').classList.toggle('upgrade-available', points >= upgrade2Cost);
    document.getElementById('autoclicker-button').classList.toggle('upgrade-available', points >= autoclickerCost);
    



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
    updateUI();
    updateCoutTotal();
    saveGame(); // Sauvegarde après chaque mise à jour
}


function formatNumber(number) {
    // Vérifie que la valeur est un nombre
    if (typeof number !== 'number' || isNaN(number)) {
        return '0'; // Retourne '0' si la valeur n'est pas un nombre
    }

    // Si le nombre est supérieur ou égal à 1 Billion
    if (number >= 1000000000000) {
        return (number / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'Blns';
    }

    // Si le nombre est supérieur ou égal à 1 milliard
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'Mds';
    }

    // Si le nombre est supérieur ou égal à 1 million
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }

    // Si le nombre est supérieur ou égal à 1 000
    if (number >= 1000) {
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
    reader.onload = function (e) {
        try {
            const gameData = JSON.parse(e.target.result);

            // Vérification de la structure des données avant de les appliquer
            if (gameData) {
                // Charger les variables de base
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
                totalClicks = gameData.totalClicks || totalClicks;
                totalPointsEarned = gameData.totalPointsEarned || totalPointsEarned;
                totalPointsSpent = gameData.totalPointsSpent || totalPointsSpent;
                gameStartTime = gameData.gameStartTime || gameStartTime;
                elapsedTime = gameData.elapsedTime || elapsedTime;
                boughtItems = gameData.boughtItems || [];
                tickets = gameData.tickets || tickets;

                // Charger les états d'achat des entreprises
                supermarcheAchete = gameData.supermarcheAchete || supermarcheAchete;
                marchandisesAchete = gameData.marchandisesAchete || marchandisesAchete;
                superviseurAchete = gameData.superviseurAchete || superviseurAchete;
                agrandissementAchete = gameData.agrandissementAchete || agrandissementAchete;
                MagasinAchete = gameData.MagasinAchete || MagasinAchete;
                MarchandisesdeluxeAchete = gameData.MarchandisesdeluxeAchete || MarchandisesdeluxeAchete;
                NouvellecollectionAchete = gameData.NouvellecollectionAchete || NouvellecollectionAchete;
                DevellopementdanslemondeAchete = gameData.DevellopementdanslemondeAchete || DevellopementdanslemondeAchete;

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
                updateUI();
                updateCoutTotal();
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

newClickButton.addEventListener('click', (event) => {
    totalClicks++;  
    let pointsGagnes = pointsPerClick > 0 ? pointsPerClick : 1;
    points += pointsGagnes;  
    totalPointsEarned += pointsGagnes;

    // Création de l'effet visuel
    const moneyEffect = document.createElement("span");
    moneyEffect.classList.add("money-pop");
    moneyEffect.textContent = `+${formatNumber(pointsGagnes)} 💰`;

    document.body.appendChild(moneyEffect);

    // Récupérer les coordonnées du bouton et du clic
    const rect = newClickButton.getBoundingClientRect();
    const x = event.clientX + window.scrollX; // Ajuste en cas de scroll
    const y = event.clientY + window.scrollY; // Ajuste en cas de scroll

    // Appliquer la position exacte sous le clic
    moneyEffect.style.left = `${x}px`;
    moneyEffect.style.top = `${y}px`;

    // Supprime l'élément après l'animation
    setTimeout(() => {
        moneyEffect.remove();
    }, 1000);

    // Mise à jour de l'affichage
    updateDisplay();
    displayItems();
    updateTrophies();
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(upgrade1Cost - points)} € pour acheter.`,
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(upgrade2Cost - points)} € pour acheter.`,
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
            autoclickerEffect.textContent = `+${formatNumber(gainedPoints)} € 💰`;

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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(autoclickerCost - points)} € pour acheter.`,
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


// Fonction pour réinitialiser le jeu
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
    historique = [];
    tickets = 0;

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

    // Réinitialiser le conteneur du supermarché
    localStorage.removeItem('supermarcheAchete1');
    const supermarcheContainer = document.getElementById('supermarcheContainer');
    if (supermarcheContainer) {
        supermarcheContainer.classList.add('locked');
        const buttons = supermarcheContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
    }

    // Réinitialiser le conteneur du magasin de luxe
    localStorage.removeItem('magasinAchete1');
    const magasinContainer = document.getElementById('magasinContainer');
    if (magasinContainer) {
        magasinContainer.classList.add('locked');
        const buttons = magasinContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
    }

    // Réinitialiser les conteneurs du shop et de l'inventaire
    localStorage.removeItem('shopAndInventoryAchete');
    const shopContainer = document.querySelector('.shop');
    const inventoryContainer = document.querySelector('.inventory-container');
    if (shopContainer) {
        shopContainer.classList.add('locked');
        const buttons = shopContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
    }
    if (inventoryContainer) {
        inventoryContainer.classList.add('locked');
        const buttons = inventoryContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
    }

    // Réinitialiser le conteneur des paris
    localStorage.removeItem('pariContainerAchete');
    const pariContainer = document.querySelector('.pari-container');
    if (pariContainer) {
        pariContainer.classList.add('locked');
        const buttons = pariContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
    }

    // Sauvegarder et mettre à jour l'affichage
    saveGame();
    updateDisplay();
    displayItems();
    updateUI();
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(supermarcheCost - points)} € pour acheter.`,
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(marchandisesCost - points)} € pour acheter.`,
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(superviseurCost - points)} € pour acheter.`,
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(agrandissementCost - points)} € pour acheter.`,
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(MagasinCost - points)} € pour acheter.`,
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(MarchandisesdeluxeCost - points)} € pour acheter.`,
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
        autoclickerPower += 80000; // Augmente les points par seconde de 1000
        pointsPerClick +=80000;
        NouvellecollectionAchete = true;
        disableButton('boutonNouvellecollection');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(NouvellecollectionCost - points)} € pour acheter.`,
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
        autoclickerPower += 100000; // Augmente les points par seconde de 2000
        pointsPerClick +=100000;
        DevellopementdanslemondeAchete = true;
        disableButton('boutonDevellopementdanslemonde');
        updateDisplay();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(DevellopementdanslemondeCost - points)} € pour acheter.`,
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
        itemButton.textContent = `${item.name} - ${formatNumber(item.cost)} €`;
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
            title: 'Argents insuffisants',
            text: `Il vous manque ${formatNumber(item.cost - points)} € pour acheter "${item.name}".`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50',
        });
    }
}

function addToBoughtItems(item) {
    const boughtItemElement = document.createElement('div');
    boughtItemElement.className = 'item bought';

    // Calculer la différence entre la valeur actuelle et le prix initial
    const difference = item.currentValue - item.cost;

    // Déterminer la couleur en fonction de la valeur actuelle
    if (item.currentValue > item.cost) {
        boughtItemElement.style.color = 'green'; // Valeur supérieure au prix initial
    } else if (item.currentValue < item.cost) {
        boughtItemElement.style.color = 'red'; // Valeur inférieure au prix initial
    } else {
        boughtItemElement.style.color = 'black'; // Valeur égale au prix initial
    }

    // Afficher le nom de l'item et sa valeur actuelle
    boughtItemElement.textContent = `${item.name} - Valeur actuelle: ${formatNumber(item.currentValue)} €`;

    // Créer un élément pour afficher la différence de valeur
    const differenceElement = document.createElement('span');
    differenceElement.textContent = ` (${difference >= 0 ? '+' : ''}${formatNumber(difference)} €)`;
    differenceElement.style.color = difference >= 0 ? 'green' : 'red'; // Couleur en fonction du gain ou de la perte

    // Créer un bouton "Vendre"
    const sellButton = document.createElement('button');
    sellButton.textContent = 'Vendre';
    sellButton.className = 'sell-button';
    sellButton.addEventListener('click', () => sellItem(item));

    // Ajouter la différence et le bouton "Vendre" à l'élément de l'item
    boughtItemElement.appendChild(differenceElement);
    boughtItemElement.appendChild(sellButton);

    // Ajouter l'élément de l'item au conteneur de l'inventaire
    itemsBoughtContainer.appendChild(boughtItemElement);
}


function fluctuateItemValues() {
    items.forEach(item => {
        if (boughtItems.includes(item.name)) {
            // Générer une fluctuation aléatoire entre -30% et +30% de la valeur initiale
            const fluctuation = item.cost * (Math.random() * 0.6 - 0.3);
            item.currentValue = Math.round(item.cost + fluctuation);
        }
    });

    // Mettre à jour l'affichage des items achetés
    updateBoughtItemsDisplay();
}

function updateBoughtItemsDisplay() {
    itemsBoughtContainer.innerHTML = ''; // Vider l'inventaire avant de réafficher
    boughtItems.forEach(itemName => {
        const item = items.find(i => i.name === itemName); // Trouver l'objet dans la liste des items
        if (item) {
            addToBoughtItems(item); // Réafficher l'objet dans l'inventaire
        }
    });
}

// Appeler la fonction de fluctuation toutes les 2 secondes
setInterval(fluctuateItemValues, 2000);

function sellItem(item) {
    // Vérifier si l'item est bien dans la liste des objets achetés
    if (!boughtItems.includes(item.name)) {
        alert("Cet objet n'est pas dans votre inventaire !");
        return;
    }

    // Ajouter la valeur actuelle de l'item aux points du joueur
    points += item.currentValue;
    totalPointsEarned += item.currentValue;

    // Retirer l'item de la liste des objets achetés
    boughtItems = boughtItems.filter(boughtItem => boughtItem !== item.name);

    // Sauvegarder le jeu
    saveGame();

    // Mettre à jour l'affichage des items disponibles et de l'inventaire
    displayItems();
    updateBoughtItemsDisplay();
}

// Fonction pour mettre à jour l'affichage des points et des tickets
function updateUI() {
    pointsDisplay.textContent = formatNumber(points);
    ticketsElement.textContent = formatNumber(tickets);
    parierButton.disabled = tickets === 0; // Active/désactive le bouton "Parier"
}

// Fonction pour mettre à jour l'affichage du coût total
function updateCoutTotal() {
    const coutParTicket = parseInt(ticketTypeSelect.value); // Coût du ticket sélectionné
    const quantite = parseInt(ticketQuantitySelect.value); // Quantité de tickets
    const coutTotal = coutParTicket * quantite; // Coût total
    coutTotalElement.textContent = formatNumber(coutTotal); // Affiche le coût total formaté
}

// Fonction pour acheter des tickets
function acheterTickets() {
    const coutParTicket = parseInt(ticketTypeSelect.value); // Coût du ticket sélectionné
    const quantite = parseInt(ticketQuantitySelect.value); // Quantité de tickets
    const coutTotal = coutParTicket * quantite; // Coût total

    if (points >= coutTotal) {
        points -= coutTotal; // Dédruit les points
        tickets += quantite; // Ajoute les tickets
        totalPointsSpent +=coutTotal;
        updateUI(); // Met à jour l'interface
        resultatElement.textContent = `Vous avez acheté ${formatNumber(quantite)} ticket(s) pour ${formatNumber(coutTotal)} €.`;
    } else {
        resultatElement.textContent = `Vous n'avez pas assez de € pour acheter ${formatNumber(quantite)} ticket(s).`;
    }
}

// Fonction pour gérer le pari
function parier() {
    // Récupère la mise sélectionnée
    const mise = parseInt(miseSelect.value);

    // Vérifie si la mise est valide
    if (isNaN(mise) || mise <= 0) {
        resultatElement.textContent = "Mise invalide. Veuillez choisir une mise valide.";
        return;
    }

    // Utilise un ticket
    tickets -= 1;

    // Récupère les propriétés du ticket sélectionné
    const coutParTicket = parseInt(ticketTypeSelect.value);
    const { multiplicateur } = ticketProperties[coutParTicket];

    // Génère un nombre aléatoire entre 0 et 100
    const resultat = Math.floor(Math.random() * 101);

    // Détermine si le joueur gagne ou perd
    if (resultat <= 20) { // 40% de chance de gagner
        const gain = coutParTicket + Math.round(mise * multiplicateur); // Gain = prix du ticket + (mise * multiplicateur)
        points += gain;
        totalPointsEarned +=gain;
        resultatElement.textContent = `Vous avez gagné ! Vous gagnez ${formatNumber(gain)} €.`;
        animationElement.textContent = "Gagné !";
        animationElement.className = "gagne";
        updateHistorique("gagne", gain); // Ajoute à l'historique
    } else { // 60% de chance de perdre
        const perte = coutParTicket + mise; // Perte = prix du ticket + mise
        points -= perte;
        resultatElement.textContent = `Vous avez perdu ! Vous perdez ${formatNumber(perte)} €.`;
        animationElement.textContent = "Perdu !";
        animationElement.className = "perdu";
        updateHistorique("perdu", perte); // Ajoute à l'historique
    }

    // Affiche l'animation
    animationElement.style.display = "block";

    // Cache l'animation après 1 seconde
    setTimeout(() => {
        animationElement.style.display = "none";
    }, 1000);

    // Réinitialise la mise à la première option
    miseSelect.selectedIndex = 0;

    // Met à jour l'affichage des points et des tickets
    updateUI();

    // Vérifie si le joueur a encore des points
    if (points <= 0) {
        resultatElement.textContent += " Vous n'avez plus d'€. Fin du jeu.";
        parierButton.disabled = true;
    }
}
// Fonction pour mettre à jour l'historique des paris
function updateHistorique(resultat, valeur) {
    // Ajoute le résultat à l'historique
    historique.push({ resultat, valeur });

    // Garde uniquement les deux derniers résultats
    if (historique.length > 2) {
        historique.shift(); // Supprime le plus ancien résultat
    }

    // Vide la liste actuelle
    historiqueList.innerHTML = "";

    // Affiche les résultats dans l'historique
    historique.forEach((res) => {
        const li = document.createElement("li");
        li.textContent = res.resultat === "gagne" 
            ? `Gagné : +${formatNumber(res.valeur)} €` 
            : `Perdu : -${formatNumber(res.valeur)} €`;
        li.classList.add(res.resultat); // Ajoute une classe pour la couleur
        historiqueList.appendChild(li);
    });
}

// Ajoute des écouteurs d'événements pour mettre à jour le coût total
ticketTypeSelect.addEventListener("change", updateCoutTotal);
ticketQuantitySelect.addEventListener("change", updateCoutTotal);

// Ajoute un écouteur d'événement au bouton "Acheter des tickets"
acheterTicketButton.addEventListener("click", acheterTickets);

// Ajoute un écouteur d'événement au bouton "Parier"
parierButton.addEventListener("click", parier);

// Initialise l'affichage des points, des tickets et du coût total
updateUI();
updateCoutTotal();

// Sélection des éléments
const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");

// Fonction pour activer/désactiver la musique
function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
    updateMusicIcon();
}

// Met à jour l'icône du bouton en fonction de l'état de la musique
function updateMusicIcon() {
    if (music.paused) {
        musicButton.textContent = "🔇"; // Icône barrée si musique coupée
    } else {
        musicButton.textContent = "🔊"; // Icône normale si musique activée
    }
}

// S'assure que l'icône est correcte même après un arrêt manuel
music.addEventListener("pause", updateMusicIcon);
music.addEventListener("play", updateMusicIcon);

// Couper la musique lorsque l'utilisateur quitte la page
function stopMusic() {
    music.pause(); // Mettre en pause la musique
    music.currentTime = 0; // Remettre la musique au début (optionnel)
}

// Écouter les événements de déchargement de la page
window.addEventListener("beforeunload", stopMusic);
window.addEventListener("pagehide", stopMusic);

// Ajouter un écouteur d'événement au bouton pour activer/désactiver la musique
musicButton.addEventListener("click", toggleMusic);

// Désactiver la lecture automatique au chargement de la page
music.pause(); // S'assurer que la musique est en pause au départ
updateMusicIcon(); // Mettre à jour l'icône du bouton
//////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const supermarcheContainer = document.getElementById('supermarcheContainer');
    const magasinContainer = document.getElementById('magasinContainer');
    const shopContainer = document.querySelector('.shop'); // Conteneur des objets disponibles
    const inventoryContainer = document.querySelector('.inventory-container'); // Conteneur des objets achetés
    const pariContainer = document.querySelector('.pari-container'); // Conteneur des paris
    const resetButton = document.getElementById('reset-game');

    const supermarcheContainercost = 500000; // Coût pour débloquer le supermarché
    const magasinContainercost = 60000000; // Coût pour débloquer le magasin de luxe (100M points)
    const shopAndInventoryCost = 300000; // Coût pour débloquer les deux conteneurs (shop et inventory)
    const pariContainerCost = 400000; // Coût pour débloquer le conteneur des paris

    // Fonction pour vérifier l'état d'un conteneur
    function checkContainerState(container, localStorageKey) {
        if (localStorage.getItem(localStorageKey) === 'true') {
            container.classList.remove('locked');
            // Activer les boutons à l'intérieur du conteneur
            const buttons = container.querySelectorAll('button');
            buttons.forEach(button => button.disabled = false);
        } else {
            container.classList.add('locked');
            // Désactiver les boutons à l'intérieur du conteneur
            const buttons = container.querySelectorAll('button');
            buttons.forEach(button => button.disabled = true);
        }
    }

    // Vérifie l'état des conteneurs au chargement de la page
    checkContainerState(supermarcheContainer, 'supermarcheAchete1');
    checkContainerState(magasinContainer, 'magasinAchete1');
    checkContainerState(shopContainer, 'shopAndInventoryAchete');
    checkContainerState(inventoryContainer, 'shopAndInventoryAchete');
    checkContainerState(pariContainer, 'pariContainerAchete');

    // Gestion du clic sur le conteneur du supermarché
    supermarcheContainer.addEventListener('click', function() {
        if (supermarcheContainer.classList.contains('locked')) {
            if (points >= supermarcheContainercost) {
                points -= supermarcheContainercost; // Déduire les points
                totalPointsSpent += supermarcheContainercost;
                localStorage.setItem('supermarcheAchete1', 'true');
                checkContainerState(supermarcheContainer, 'supermarcheAchete1');
                Swal.fire({
                    title: 'Achat réussi!',
                    text: 'Vous avez débloqué le supermarché!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Points insuffisants',
                    text: `Il vous manque ${formatNumber(supermarcheContainercost - points)} € pour débloquer le Supermarché.`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });

    // Gestion du clic sur le conteneur du magasin de luxe
    magasinContainer.addEventListener('click', function() {
        if (magasinContainer.classList.contains('locked')) {
            if (points >= magasinContainercost) {
                points -= magasinContainercost; // Déduire les points
                totalPointsSpent += magasinContainercost;
                localStorage.setItem('magasinAchete1', 'true');
                checkContainerState(magasinContainer, 'magasinAchete1');
                Swal.fire({
                    title: 'Achat réussi!',
                    text: 'Vous avez débloqué le magasin de luxe!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Points insuffisants',
                    text: `Il vous manque ${formatNumber(magasinContainercost - points)} € pour débloquer le magasin de luxe.`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });

    // Gestion du clic sur le conteneur du shop et de l'inventaire
    shopContainer.addEventListener('click', function() {
        if (shopContainer.classList.contains('locked')) {
            if (points >= shopAndInventoryCost) {
                points -= shopAndInventoryCost; // Déduire les points
                totalPointsSpent += shopAndInventoryCost;
                localStorage.setItem('shopAndInventoryAchete', 'true');
                checkContainerState(shopContainer, 'shopAndInventoryAchete');
                checkContainerState(inventoryContainer, 'shopAndInventoryAchete');
                Swal.fire({
                    title: 'Achat réussi!',
                    text: 'Vous avez débloqué les items',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Points insuffisants',
                    text: `Il vous manque ${formatNumber(shopAndInventoryCost - points)} € pour débloquer les items.`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });

    // Gestion du clic sur le conteneur des paris
    pariContainer.addEventListener('click', function() {
        if (pariContainer.classList.contains('locked')) {
            if (points >= pariContainerCost) {
                points -= pariContainerCost; // Déduire les points
                totalPointsSpent += pariContainerCost;
                localStorage.setItem('pariContainerAchete', 'true');
                checkContainerState(pariContainer, 'pariContainerAchete');
                Swal.fire({
                    title: 'Achat réussi!',
                    text: 'Vous avez débloqué le conteneur des paris!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Points insuffisants',
                    text: `Il vous manque ${formatNumber(pariContainerCost - points)} € pour débloquer le centre des paris.`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });
});

document.getElementById('infoButton').addEventListener('click', function() {
    Swal.fire({
        title: 'Informations sur le jeu',
        html: `
            <h3>Taptastic</h3>
            <p>Bienvenue dans le jeu que j'ai créé ! Voici un aperçu des mécaniques :</p>
            <ul>
                <li><strong>Le clicker :</strong> Clique sur le bouton cliquez-moi pour gagner de des € et hesite pas a améliorer et achter un autoclicker !</li>
                <li><strong>Supermarché et Magasin de luxe :</strong> achete des magasin pour augmenter tes revenus !</li>
                <li><strong>Les items :</strong>Ici, tu peut acheter et vendre tes items avec des plus value !</li>
                <li><strong>les paris :</strong>Ici, tu dois acheter des ticket pour jouer et tenter de gagner beaucoup, mais attention tu peut aller dans le negatif !</li>
                <!-- Ajoutez autant de mécaniques que nécessaire -->
            </ul>
            <p>Amusez-vous bien !</p>
        `,
        icon: 'info',
        confirmButtonText: 'Fermer'
    });
});

