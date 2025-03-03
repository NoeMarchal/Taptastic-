const maxUpgrade1Level = 500; // niveau max pour l'amélioration 1²
const maxUpgrade2Level = 500; // Niveau max pour l'amélioration 2
const maxAutoclickers = 500; // Nombre max d'autoclickers
const supermarcheCost = 1400000; // Coût du supermarché
const marchandisesCost = 2500000; // Coût des marchandises
const superviseurCost = 3000000; // Coût du superviseur
const agrandissementCost = 5000000; // Coût de l'agrandissement
const MagasinCost = 500000000; // Coût du supermarché
const MarchandisesdeluxeCost = 700000000; // Coût des marchandises
const NouvellecollectionCost = 800000000; // Coût du superviseur
const DevellopementdanslemondeCost = 1000000000; // Coût de l'agrandissement
const ConcessionCost = 5000000000; // Coût du supermarché
const VoituredeluxeCost = 100000000000; // Coût des marchandises
const AtelierCost = 300000000000; // Coût du superviseur
const VoiturierCost = 500000000000; // Coût de l'agrandissement

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
let ConcessionAchete = false;
let VoituredeluxeAchete = false;
let AtelierAchete = false;
let VoiturierAchete = false;
let totalClicks = 0;
let totalPointsEarned = 0;
let totalPointsSpent = 0;
let gameStartTime = Date.now(); // Moment où le jeu commence
let elapsedTime = 0; // Temps écoulé en secondes
let gameTime = 0; // en secondes
let boughtItems = [];
let historique = [];
let tickets = 0;
let bot = {
  purchased: false,
  sellThreshold: 15, // Seuil de vente par défaut
  autoBuy: false, // Achat automatique désactivé par défaut
};
// Mise à jour du temps de jeu chaque seconde
setInterval(() => {
  gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
  updateTrophies();
}, 1000);

// Liste des trophées et leurs conditions
const trophies = [
  { name: "Débutant Clikers", condition: 10 },
  { name: "Apprenti Clicker", condition: 100 },
  { name: "Clicker Confirmé", condition: 1000 },
  { name: "Joue 1h", condition: 3600 }, // 1 heure en secondes
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
  {
    name: "Marchandises de luxe Achetées",
    condition: "MarchandisesdeluxeAchete === true",
  },
  {
    name: "Nouvelles collections Acheté",
    condition: "NouvellecollectionAchete === true",
  },
  {
    name: "Dévellopement dans le monde Acheté",
    condition: "DevellopementdanslemondeAchete === true",
  },
  { name: "Concession Acheté", condition: "ConcessionAchete === true" },
  {
    name: "Voitures de luxe Achetées",
    condition: "VoituredeluxeAchete === true",
  },
  { name: "Atelier Acheté", condition: "AtelierAchete === true" },
  { name: "Voituriers Acheté", condition: "VoiturierAchete === true" },
];

// Liste des objets disponibles à l'achat
const items = [
  { name: "Panini", cost: 100 },
  { name: "Pizza", cost: 1000 },
  { name: "Vélo", cost: 20000 }, // Ajouté
  { name: "Scooter", cost: 132000 },
  { name: "Moto", cost: 500000 }, // Ajouté
  { name: "Vacances", cost: 3000000 },
  { name: "Salaire", cost: 10000000 }, // Ajouté
  { name: "Studio", cost: 300000000 },
  { name: "Maison", cost: 700000000 }, // Ajouté
  { name: "Voiture", cost: 1000000000 },
  { name: "Jet", cost: 15000000000 }, // Ajouté
  { name: "Villa", cost: 40000000000 },
  { name: "Île", cost: 500000000000 },
  { name: "Pays", cost: 10000000000000 }, // Ajouté
];

// Propriétés des tickets (coût, multiplicateur)
const ticketProperties = {
  100: { multiplicateur: 0.1 }, // Ticket Basique
  1000: { multiplicateur: 0.2 }, // Ticket Intermédiaire
  10000: { multiplicateur: 0.5 }, // Ticket Avancé
  1000000: { multiplicateur: 1.0 }, // Ticket Expert
  100000000: { multiplicateur: 2.0 }, // Ticket Premium
};

const avatars = [
  { src: "avatar1.jpg", name: "Léo" },
  { src: "avatar2.jpg", name: "Noah" },
  { src: "avatar3.jpg", name: "Léa" },
  { src: "avatar4.jpg", name: "David" },
  { src: "avatar5.jpg", name: "Jade" },
  { src: "avatar6.jpg", name: "Samir" },
  { src: "avatar7.jpg", name: "Emma" },
  { src: "avatar8.jpg", name: "Maya" },
  { src: "avatar9.jpg", name: "Zoé" },
  { src: "avatar10.jpg", name: "Inaya" },
  { src: "avatar11.jpg", name: "Lucas" },
  { src: "avatar12.jpg", name: "Arthur" },
];

// Éléments du DOM
const pointsDisplay = document.getElementById("points");
const clickButton = document.getElementById("click-button");
const upgrade1Button = document.getElementById("upgrade1");
const upgrade2Button = document.getElementById("upgrade2");
const autoclickerButton = document.getElementById("autoclicker-button");
const autoclickerCountDisplay = document.getElementById("autoclicker-count");
const trophyList = document.getElementById("trophy-list");
const itemsToBuyContainer = document.getElementById("itemsToBuyContainer");
const itemsBoughtContainer = document.getElementById("items-bought");
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
    ConcessionAchete,
    VoituredeluxeAchete,
    AtelierAchete,
    VoiturierAchete,
    boughtItems,
    historique,
    tickets,
    autoclickerPower,
    botPurchased: bot.purchased,
    botSellThreshold: bot.sellThreshold,
    botAutoBuy: bot.autoBuy,
  };
  localStorage.setItem("incrementalGameSave", JSON.stringify(gameData));
}

function loadGame() {
  const savedData = localStorage.getItem("incrementalGameSave");
  if (savedData) {
    const gameData = JSON.parse(savedData);
    points = gameData.points;
    pointsPerClick = gameData.pointsPerClick;
    upgrade1Cost = gameData.upgrade1Cost;
    upgrade2Cost = gameData.upgrade2Cost;
    autoclickerCost = gameData.autoclickerCost;
    autoclickers = gameData.autoclickers;
    autoclickerPower = gameData.autoclickerPower;
    upgrade1Level = gameData.upgrade1Level || 0;
    upgrade2Level = gameData.upgrade2Level || 0;
    unlockedTrophies = gameData.unlockedTrophies || [];
    playerName = gameData.playerName;
    avatarSrc = gameData.avatarSrc || "Images/choose_avatar.jpg";
    supermarcheAchete = gameData.supermarcheAchete || false;
    marchandisesAchete = gameData.marchandisesAchete || false;
    superviseurAchete = gameData.superviseurAchete || false;
    agrandissementAchete = gameData.agrandissementAchete || false;
    MagasinAchete = gameData.MagasinAchete || false;
    MarchandisesdeluxeAchete = gameData.MarchandisesdeluxeAchete || false;
    NouvellecollectionAchete = gameData.NouvellecollectionAchete || false;
    DevellopementdanslemondeAchete =
      gameData.DevellopementdanslemondeAchete || false;
    totalClicks = gameData.totalClicks || 0;
    totalPointsEarned = gameData.totalPointsEarned || 0;
    totalPointsSpent = gameData.totalPointsSpent || 0;
    gameStartTime = gameData.gameStartTime || Date.now();
    elapsedTime = gameData.elapsedTime || 0;
    boughtItems = gameData.boughtItems || [];
    historique = gameData.historique || [];
    tickets = gameData.tickets;
    ConcessionAchete = gameData.ConcessionAchete || false;
    VoituredeluxeAchete = gameData.VoituredeluxeAchete || false;
    AtelierAchete = gameData.AtelierAchete || false;
    VoiturierAchete = gameData.VoiturierAchete || false;

    // Charger les propriétés du bot
    bot.purchased = gameData.botPurchased || false;
    bot.sellThreshold = gameData.botSellThreshold || 15; // Valeur par défaut
    bot.autoBuy = gameData.botAutoBuy || false; // Valeur par défaut

    // Mettre à jour l'interface utilisateur pour le bot
    if (bot.purchased) {
      document.getElementById("buy-bot-btn").disabled = true;
      document.getElementById("bot-settings").style.display = "block";
      document.getElementById("sell-threshold").value = bot.sellThreshold;
      document.getElementById("auto-buy").checked = bot.autoBuy;
    }
  }

  // Charger l'avatar depuis localStorage (au cas où il n'est pas dans gameData)
  const savedAvatar = localStorage.getItem("selectedAvatar");
  if (savedAvatar) {
    avatarSrc = savedAvatar;
    document.getElementById("avatar").src = savedAvatar;
  }

  // Désactiver les boutons déjà achetés
  if (supermarcheAchete) disableButton("boutonSupermarche");
  if (marchandisesAchete) disableButton("boutonMarchandises");
  if (superviseurAchete) disableButton("boutonSuperviseur");
  if (agrandissementAchete) disableButton("boutonAgrandissement");
  if (MagasinAchete) disableButton("boutonMagasin");
  if (MarchandisesdeluxeAchete) disableButton("boutonMarchandisesdeluxe");
  if (NouvellecollectionAchete) disableButton("boutonNouvellecollection");
  if (DevellopementdanslemondeAchete)
    disableButton("boutonDevellopementdanslemonde");
  if (ConcessionAchete) disableButton("boutonconcession");
  if (VoituredeluxeAchete) disableButton("boutonvoituredeluxe");
  if (AtelierAchete) disableButton("boutonatelier");
  if (VoiturierAchete) disableButton("boutonvoiturier");

  updateDisplay();
  updateTrophies();
  displayItems();
}

// Mettre à jour l'affichage
function updateDisplay() {
  pointsDisplay.textContent = `${formatNumber(points)} €`;
  document.getElementById("points-per-click").textContent = `${formatNumber(
    pointsPerClick
  )}€ /click  `;
  document.getElementById("pps-display").textContent = `${formatNumber(
    autoclickers * autoclickerPower
  )}€ /sec`;
  document.getElementById(
    "upgrade1-count"
  ).textContent = `Améliorations 1 +20€/clikcs: ${upgrade1Level}`;
  document.getElementById(
    "upgrade2-count"
  ).textContent = `Améliorations 2 +50€/clikcs: ${upgrade2Level}`;
  autoclickerCountDisplay.textContent = `Autoclickers +250€/sec: ${autoclickers}`;
  upgrade1Button.textContent = `Amélioration 1 (Coût: ${formatNumber(
    upgrade1Cost
  )} €)`;
  upgrade2Button.textContent = `Amélioration 2 (Coût: ${formatNumber(
    upgrade2Cost
  )} €)`;
  autoclickerButton.textContent = `Autoclicker (Coût: ${formatNumber(
    autoclickerCost
  )} €)`;
  document.getElementById("player-name").textContent = playerName;
  document.getElementById("avatar").src = avatarSrc;
  document.getElementById(
    "boutonSupermarche"
  ).textContent = `Supermarché (Coût: ${formatNumber(supermarcheCost)} €)`;
  document.getElementById(
    "boutonMarchandises"
  ).textContent = `Marchandises (Coût: ${formatNumber(marchandisesCost)} €)`;
  document.getElementById(
    "boutonSuperviseur"
  ).textContent = `Superviseur (Coût: ${formatNumber(superviseurCost)} €)`;
  document.getElementById(
    "boutonAgrandissement"
  ).textContent = `Agrandissement (Coût: ${formatNumber(
    agrandissementCost
  )} €)`;
  document.getElementById(
    "boutonMagasin"
  ).textContent = `Magasin de luxe (Coût: ${formatNumber(MagasinCost)} €)`;
  document.getElementById(
    "boutonMarchandisesdeluxe"
  ).textContent = `Marchandises(Coût: ${formatNumber(
    MarchandisesdeluxeCost
  )} €)`;
  document.getElementById(
    "boutonNouvellecollection"
  ).textContent = `Nouvelles collections (Coût: ${formatNumber(
    NouvellecollectionCost
  )} €)`;
  document.getElementById(
    "boutonDevellopementdanslemonde"
  ).textContent = `Exportation(Coût: ${formatNumber(
    DevellopementdanslemondeCost
  )} €)`;
  document.getElementById(
    "boutonconcession"
  ).textContent = `Concession  (Coût: ${formatNumber(ConcessionCost)} €)`;
  document.getElementById(
    "boutonvoituredeluxe"
  ).textContent = `Voitures de luxe (Coût: ${formatNumber(
    VoituredeluxeCost
  )} €)`;
  document.getElementById(
    "boutonatelier"
  ).textContent = `Atelier (Coût: ${formatNumber(AtelierCost)} €)`;
  document.getElementById(
    "boutonvoiturier"
  ).textContent = `Voituriers (Coût: ${formatNumber(VoiturierCost)} €)`;
  document.getElementById(
    "total-clicks"
  ).textContent = `Nombre total de clics : ${formatNumber(totalClicks)}`;
  document.getElementById(
    "total-points-earned"
  ).textContent = `€ gagnés au total : ${formatNumber(totalPointsEarned)}`;
  document.getElementById(
    "total-points-spent"
  ).textContent = `€ dépensés au total : ${formatNumber(totalPointsSpent)}`;
  document
    .getElementById("upgrade1")
    .classList.toggle("upgrade-available", points >= upgrade1Cost);
  document
    .getElementById("upgrade2")
    .classList.toggle("upgrade-available", points >= upgrade2Cost);
  document
    .getElementById("autoclicker-button")
    .classList.toggle("upgrade-available", points >= autoclickerCost);

  // Calcul des heures, minutes et secondes
  let hours = Math.floor(elapsedTime / 3600); // Diviser par 3600 pour obtenir les heures
  let minutes = Math.floor((elapsedTime % 3600) / 60); // Diviser le reste des secondes par 60 pour obtenir les minutes
  let seconds = elapsedTime % 60; // Le reste est le nombre de secondes

  // Ajouter un 0 devant les heures, minutes et secondes si nécessaire
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Afficher l'heure au format hh:mm:ss
  document.getElementById(
    "elapsed-time"
  ).textContent = `Temps écoulé : ${hours}:${minutes}:${seconds}`;

  updateTrophies();
  displayItems();
  saveGame(); // Sauvegarde après chaque mise à jour
}

function formatNumber(number) {
  // Vérifie que la valeur est un nombre
  if (typeof number !== "number" || isNaN(number)) {
    return "0"; // Retourne '0' si la valeur n'est pas un nombre
  }

  // Si le nombre est supérieur ou égal à 1 Billion
  if (number >= 1000000000000) {
    return (number / 1000000000000).toFixed(1).replace(/\.0$/, "") + "Blns";
  }

  // Si le nombre est supérieur ou égal à 1 milliard
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "Mds";
  }

  // Si le nombre est supérieur ou égal à 1 million
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }

  // Si le nombre est supérieur ou égal à 1 000
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  // Sinon, juste ajouter les séparateurs de milliers
  return number.toLocaleString();
}

function updateTrophies() {
  const trophyList = document.getElementById("trophy-list");
  const trophyCountElement = document.getElementById("trophy-count");

  // Vider la liste actuelle
  trophyList.innerHTML = "";

  // Vérifier et débloquer les trophées
  trophies.forEach((trophy) => {
    let conditionMet = false;

    // Vérifier si la condition est une chaîne de caractères (pour les trophées dynamiques)
    if (typeof trophy.condition === "string") {
      // Évaluer la condition dynamiquement
      conditionMet = eval(trophy.condition);
    } else if (trophy.name.includes("Joue")) {
      // Pour les trophées basés sur le temps de jeu
      conditionMet = gameTime >= trophy.condition;
    } else {
      // Pour les trophées basés sur les clics
      conditionMet = totalClicks >= trophy.condition;
    }

    // Si la condition est remplie et que le trophée n'est pas déjà débloqué
    if (conditionMet && !unlockedTrophies.includes(trophy.name)) {
      unlockedTrophies.push(trophy.name);

      // 🎉 Effet de confettis
      confetti({
        particleCount: 2000,
        spread: 500,
        origin: { y: 0.6 },
      });
    }
  });

  // Mettre à jour le compteur de trophées dans le <h2>
  trophyCountElement.textContent = `${unlockedTrophies.length}/${trophies.length}`;

  // Afficher uniquement les trophées débloqués
  if (unlockedTrophies.length === 0) {
    // Afficher un message si aucun trophée n'est débloqué
    const li = document.createElement("li");
    li.textContent = "Aucun trophée débloqué pour l’instant.";
    trophyList.appendChild(li);
  } else {
    unlockedTrophies.forEach((trophyName) => {
      // Trouver le trophée correspondant dans la liste `trophies`
      const trophy = trophies.find((t) => t.name === trophyName);
      if (trophy) {
        const li = document.createElement("li");

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
  const gameData = localStorage.getItem("incrementalGameSave");
  if (!gameData) {
    Swal.fire("Erreur", "Aucune sauvegarde trouvée !", "error");
    return;
  }

  const blob = new Blob([gameData], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "incrementalGameSave.json";
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
        supermarcheAchete = gameData.supermarcheAchete || supermarcheAchete;
        marchandisesAchete = gameData.marchandisesAchete || marchandisesAchete;
        superviseurAchete = gameData.superviseurAchete || superviseurAchete;
        agrandissementAchete =
          gameData.agrandissementAchete || agrandissementAchete;
        MagasinAchete = gameData.MagasinAchete || MagasinAchete;
        MarchandisesdeluxeAchete =
          gameData.MarchandisesdeluxeAchete || MarchandisesdeluxeAchete;
        NouvellecollectionAchete =
          gameData.NouvellecollectionAchete || NouvellecollectionAchete;
        DevellopementdanslemondeAchete =
          gameData.DevellopementdanslemondeAchete ||
          DevellopementdanslemondeAchete;
        ConcessionAchete = gameData.ConcessionAchete || ConcessionAchete;
        VoituredeluxeAchete =
          gameData.VoituredeluxeAchete || VoituredeluxeAchete;
        AtelierAchete = gameData.AtelierAchete || AtelierAchete;
        VoiturierAchete = gameData.VoiturierAchete || VoiturierAchete;
        autoclickerPower = gameData.autoclickerPower || autoclickerPower;

        // Charger les propriétés du bot
        bot.purchased = gameData.botPurchased || false;
        bot.sellThreshold = gameData.botSellThreshold || 15; // Valeur par défaut
        bot.autoBuy = gameData.botAutoBuy || false; // Valeur par défaut

        // Mettre à jour l'interface utilisateur pour le bot
        if (bot.purchased) {
          document.getElementById("buy-bot-btn").disabled = true;
          document.getElementById("bot-settings").style.display = "block";
          document.getElementById("sell-threshold").value = bot.sellThreshold;
          document.getElementById("auto-buy").checked = bot.autoBuy;
        }

        // Recharge l'avatar si nécessaire
        if (gameData.avatarSrc) {
          document.getElementById("avatar").src = gameData.avatarSrc;
        }

        // Désactivation des boutons si nécessaire
        if (gameData.supermarcheAchete) disableButton("boutonSupermarche");
        if (gameData.marchandisesAchete) disableButton("boutonMarchandises");
        if (gameData.superviseurAchete) disableButton("boutonSuperviseur");
        if (gameData.agrandissementAchete)
          disableButton("boutonAgrandissement");
        if (gameData.MagasinAchete) disableButton("boutonMagasin");
        if (gameData.MarchandisesdeluxeAchete)
          disableButton("boutonMarchandisesdeluxe");
        if (gameData.NouvellecollectionAchete)
          disableButton("boutonNouvellecollection");
        if (gameData.DevellopementdanslemondeAchete)
          disableButton("boutonDevellopementdanslemonde");
        if (gameData.ConcessionAchete) disableButton("boutonconcession");
        if (gameData.VoituredeluxeAchete) disableButton("boutonvoituredeluxe");
        if (gameData.AtelierAchete) disableButton("boutonatelier");
        if (gameData.VoiturierAchete) disableButton("boutonvoiturier");

        // Vider l'inventaire des objets achetés
        itemsBoughtContainer.innerHTML = "";

        // Réafficher les objets achetés dans l'inventaire
        boughtItems.forEach((itemName) => {
          const item = items.find((i) => i.name === itemName); // Trouver l'objet dans la liste des items
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
      Swal.fire(
        "Erreur",
        "Erreur lors du chargement de la sauvegarde !",
        "error"
      );
    }
  };
  reader.readAsText(file);
}
// Fonction pour afficher le popup avec les options de sauvegarde
function showSavePopup() {
  Swal.fire({
    title: "Gestion de la sauvegarde",
    html: `
            <button onclick="exportSave()" class="swal2-confirm swal2-styled">Télécharger la sauvegarde</button>
            <button onclick="document.getElementById('uploadSave').click()" class="swal2-cancel swal2-styled">Charger une sauvegarde</button>
        `,
    showCloseButton: true,
    showConfirmButton: false,
    showCancelButton: false,
    didOpen: () => {
      document.querySelector(".swal2-popup").style.borderRadius = "20px";
    },
  });
}

clickButton.replaceWith(clickButton.cloneNode(true)); // Évite les doublons d'écouteurs d'événements
const newClickButton = document.getElementById("click-button");

newClickButton.addEventListener("click", (event) => {
  totalClicks++;
  let pointsGagnes = pointsPerClick > 0 ? pointsPerClick : 1;
  points += pointsGagnes;
  totalPointsEarned += pointsGagnes;

  // Mise à jour de l'affichage
  updateDisplay();
  displayItems();
  updateTrophies();
});

//Amélioration1
upgrade1Button.addEventListener("click", () => {
  if (upgrade1Level >= maxUpgrade1Level) {
    // Afficher un message d'erreur stylisé avec SweetAlert2
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "niveau max atteint",
      text: `vous ne pouvez plus acheter`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
    return;
  }
  if (points >= upgrade1Cost) {
    points -= upgrade1Cost;
    totalPointsSpent += upgrade1Cost;
    pointsPerClick += 20;
    upgrade1Cost = Math.floor(upgrade1Cost + 500);
    upgrade1Level++;
    updateDisplay();
    displayItems();
    updateTrophies();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "fond insuffisant",
      text: `Il vous manque ${formatNumber(
        upgrade1Cost - points
      )} € pour acheter.`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
  }
});

// Amélioration 2
upgrade2Button.addEventListener("click", () => {
  if (upgrade2Level >= maxUpgrade2Level) {
    // Afficher un message d'erreur stylisé avec SweetAlert2
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "niveau max atteint",
      text: `vous ne pouvez plus acheter`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
    return;
  }
  if (points >= upgrade2Cost) {
    points -= upgrade2Cost;
    totalPointsSpent += upgrade2Cost;
    pointsPerClick += 50;
    upgrade2Cost = Math.floor(upgrade2Cost + 800);
    upgrade2Level++;
    updateDisplay();
    updateTrophies();
    displayItems();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "fond insuffisant",
      text: `Il vous manque ${formatNumber(
        upgrade2Cost - points
      )} € pour acheter.`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
  }
});

setInterval(() => {
  if (autoclickers > 0) {
    let gainedPoints = autoclickers * autoclickerPower;
    points += gainedPoints;
    totalPointsEarned += gainedPoints;
    updateDisplay();
  }

  // Mettre à jour le temps écoulé
  elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000); // Temps écoulé en secondes
  updateDisplay(); // Appeler pour mettre à jour l'affichage du temps
}, 1000);

// Achat d'un autoclicker
autoclickerButton.addEventListener("click", () => {
  if (autoclickers >= maxAutoclickers) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "niveau max atteint",
      text: `vous ne pouvez plus acheter`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
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
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "fond insuffisant",
      text: `Il vous manque ${formatNumber(
        autoclickerCost - points
      )} € pour acheter.`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
  }
});

// Afficher le pop-up des avatars
function showAvatarPopup() {
  const popup = document.getElementById("avatar-popup");
  const avatarGrid = document.getElementById("avatar-grid");
  avatarGrid.innerHTML = "";

  avatars.forEach((avatar) => {
    const avatarItem = document.createElement("div");
    avatarItem.className = "avatar-item";

    const img = document.createElement("img");
    img.src = `Images/${avatar.src}`; // Chemin relatif vers les images
    img.alt = avatar.name;

    const name = document.createElement("p");
    name.textContent = avatar.name;

    // Ajouter un écouteur d'événement pour la sélection d'avatar
    avatarItem.addEventListener("click", () => {
      changeAvatar(avatar.src); // Appeler changeAvatar avec le fichier de l'avatar
      closeAvatarPopup(); // Fermer le pop-up après la sélection
    });

    avatarItem.appendChild(img);
    avatarItem.appendChild(name);
    avatarGrid.appendChild(avatarItem);
  });

  popup.style.display = "flex";
}

// Fermer le pop-up
function closeAvatarPopup() {
  const popup = document.getElementById("avatar-popup");
  popup.style.display = "none";
}

// Changer l'avatar
function changeAvatar(avatarFileName) {
  const avatarImg = document.getElementById("avatar");

  if (!avatarImg) {
    console.error("L'élément #avatar n'existe pas dans le DOM.");
    return;
  }

  // Mettre à jour l'image avec un paramètre unique pour éviter le cache
  const newAvatarPath = `Images/${avatarFileName}?t=${new Date().getTime()}`;
  console.log("Nouvel avatar :", newAvatarPath); // ✅ Debug

  avatarImg.src = newAvatarPath;
  avatarSrc = newAvatarPath; // Mettre à jour la variable avatarSrc
  localStorage.setItem("selectedAvatar", newAvatarPath); // Sauvegarder dans localStorage

  // Sauvegarder le jeu
  saveGame();
}

// Charger l'avatar sauvegardé au démarrage
window.addEventListener("load", () => {
  const savedAvatar = localStorage.getItem("selectedAvatar");

  if (savedAvatar) {
    console.log("Avatar chargé depuis localStorage :", savedAvatar); // ✅ Debug
    const avatarImg = document.getElementById("avatar");
    if (avatarImg) {
      avatarImg.src = savedAvatar;
    } else {
      console.error("L'élément #avatar n'existe pas dans le DOM.");
    }
  }
});

// Fonction pour changer le nom
function changeName(newName) {
  playerName = newName;
  updateDisplay();
}

// Permettre de changer le nom via l'input
document.getElementById("name-input").addEventListener("input", function () {
  changeName(this.value);
});

document.getElementById("reset-game").addEventListener("click", () => {
  Swal.fire({
    title: "Réinitialiser le jeu ?",
    text: "Toutes vos données seront perdues.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Oui, réinitialiser",
    cancelButtonText: "Annuler",
    didOpen: () => {
      document.querySelector(".swal2-popup").style.borderRadius = "20px";
    },
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("incrementalGameSave");
      resetGame();
      updateDisplay();

      Swal.fire(
        "Réinitialisé !",
        "Votre progression a été supprimée.",
        "success"
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
  unlockedTrophies = []; // Réinitialise les trophées
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
  ConcessionAchete = false;
  VoituredeluxeAchete = false;
  AtelierAchete = false;
  VoiturierAchete = false;
  autoclickerPower = 250;
  // Réinitialiser le bot
  bot.purchased = false;
  bot.sellThreshold = 15; // Valeur par défaut
  bot.autoBuy = false; // Valeur par défaut
  // Réactiver le bouton "Acheter le Bot"
  document.getElementById("buy-bot-btn").disabled = false;

  // Masquer les paramètres du bot
  document.getElementById("bot-settings").style.display = "none";

  // Réinitialiser les valeurs des paramètres du bot
  document.getElementById("sell-threshold").value = bot.sellThreshold;
  document.getElementById("auto-buy").checked = bot.autoBuy;
  // Réactiver les boutons
  document.getElementById("boutonSupermarche").disabled = false;
  document.getElementById("boutonMarchandises").disabled = false;
  document.getElementById("boutonSuperviseur").disabled = false;
  document.getElementById("boutonAgrandissement").disabled = false;
  document.getElementById("boutonMagasin").disabled = false;
  document.getElementById("boutonMarchandisesdeluxe").disabled = false;
  document.getElementById("boutonNouvellecollection").disabled = false;
  document.getElementById("boutonDevellopementdanslemonde").disabled = false;
  document.getElementById("boutonconcession").disabled = false;
  document.getElementById("boutonvoituredeluxe").disabled = false;
  document.getElementById("boutonatelier").disabled = false;
  document.getElementById("boutonvoiturier").disabled = false;

  // Supprimer l'avatar sauvegardé
  localStorage.removeItem("selectedAvatar");

  // Vider l'inventaire des objets achetés
  itemsBoughtContainer.innerHTML = "";

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
document
  .getElementById("boutonSupermarche")
  .addEventListener("click", function () {
    if (!supermarcheAchete && points >= supermarcheCost) {
      points -= supermarcheCost; // Dépense les points
      totalPointsSpent += supermarcheCost;
      autoclickerPower += 2500; // Augmente les points par seconde de 5000
      pointsPerClick += 3000;
      supermarcheAchete = true;
      disableButton("boutonSupermarche");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          supermarcheCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

// Écouteur d'événement pour le bouton Marchandises
document
  .getElementById("boutonMarchandises")
  .addEventListener("click", function () {
    if (!marchandisesAchete && points >= marchandisesCost) {
      points -= marchandisesCost; // Dépense les points
      totalPointsSpent += marchandisesCost;
      autoclickerPower += 3000; // Augmente les points par seconde de 500
      pointsPerClick += 6000;
      marchandisesAchete = true;
      disableButton("boutonMarchandises");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          marchandisesCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

// Écouteur d'événement pour le bouton Superviseur
document
  .getElementById("boutonSuperviseur")
  .addEventListener("click", function () {
    if (!superviseurAchete && points >= superviseurCost) {
      points -= superviseurCost; // Dépense les points
      totalPointsSpent += superviseurCost;
      autoclickerPower += 6000; // Augmente les points par seconde de 1000
      pointsPerClick += 8000;
      superviseurAchete = true;
      disableButton("boutonSuperviseur");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          superviseurCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

// Écouteur d'événement pour le bouton Agrandissement
document
  .getElementById("boutonAgrandissement")
  .addEventListener("click", function () {
    if (!agrandissementAchete && points >= agrandissementCost) {
      points -= agrandissementCost; // Dépense les points
      totalPointsSpent += marchandisesCost;
      autoclickerPower += 7000; // Augmente les points par seconde de 2000
      pointsPerClick += 10000;
      agrandissementAchete = true;
      disableButton("boutonAgrandissement");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          agrandissementCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

document.getElementById("toggle-arrow").addEventListener("click", function () {
  const trophyList = document.getElementById("trophy-list");
  const arrow = document.getElementById("toggle-arrow");

  // Basculer la visibilité de la liste
  trophyList.classList.toggle("visible");

  // Basculer la rotation de la flèche
  arrow.classList.toggle("rotated");
});

// Écouteur d'événement pour le bouton Magasin
document.getElementById("boutonMagasin").addEventListener("click", function () {
  if (!MagasinAchete && points >= MagasinCost) {
    points -= MagasinCost; // Dépense les points
    totalPointsSpent += MagasinCost;
    autoclickerPower += 10000; // Augmente les points par seconde de 5000
    pointsPerClick += 12000;
    MagasinAchete = true;
    disableButton("boutonMagasin");
    updateDisplay();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "fond insuffisant",
      text: `Il vous manque ${formatNumber(
        MagasinCost - points
      )} € pour acheter.`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
  }
});

// Écouteur d'événement pour le bouton Marchandises de luxe
document
  .getElementById("boutonMarchandisesdeluxe")
  .addEventListener("click", function () {
    if (!MarchandisesdeluxeAchete && points >= MarchandisesdeluxeCost) {
      points -= MarchandisesdeluxeCost; // Dépense les points
      totalPointsSpent += MarchandisesdeluxeCost;
      autoclickerPower += 15000; // Augmente les points par seconde de 500
      pointsPerClick += 19000;
      MarchandisesdeluxeAchete = true;
      disableButton("boutonMarchandisesdeluxe");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          MarchandisesdeluxeCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

// Écouteur d'événement pour le bouton Nouvelles collections
document
  .getElementById("boutonNouvellecollection")
  .addEventListener("click", function () {
    if (!NouvellecollectionAchete && points >= NouvellecollectionCost) {
      points -= NouvellecollectionCost; // Dépense les points
      totalPointsSpent += NouvellecollectionCost;
      autoclickerPower += 30000; // Augmente les points par seconde de 1000
      pointsPerClick += 30000;
      NouvellecollectionAchete = true;
      disableButton("boutonNouvellecollection");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          NouvellecollectionCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

// Écouteur d'événement pour le bouton devellopement dans le monde
document
  .getElementById("boutonDevellopementdanslemonde")
  .addEventListener("click", function () {
    if (
      !DevellopementdanslemondeAchete &&
      points >= DevellopementdanslemondeCost
    ) {
      points -= DevellopementdanslemondeCost; // Dépense les points
      totalPointsSpent += DevellopementdanslemondeCost;
      autoclickerPower += 45000; // Augmente les points par seconde de 2000
      pointsPerClick += 45000;
      DevellopementdanslemondeAchete = true;
      disableButton("boutonDevellopementdanslemonde");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          DevellopementdanslemondeCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

// Écouteur d'événement pour le bouton Concession
document
  .getElementById("boutonconcession")
  .addEventListener("click", function () {
    if (!ConcessionAchete && points >= ConcessionCost) {
      points -= ConcessionCost; // Dépense les points
      totalPointsSpent += ConcessionCost;
      autoclickerPower += 50000; // Augmente les points par seconde de 5000
      pointsPerClick += 100000;
      ConcessionAchete = true;
      disableButton("boutonconcession");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          ConcessionCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

// Écouteur d'événement pour le bouton Voitures de luxe
document
  .getElementById("boutonvoituredeluxe")
  .addEventListener("click", function () {
    if (!VoituredeluxeAchete && points >= VoituredeluxeCost) {
      points -= VoituredeluxeCost; // Dépense les points
      totalPointsSpent += VoituredeluxeCost;
      autoclickerPower += 60000; // Augmente les points par seconde de 500
      pointsPerClick += 150000;
      VoituredeluxeAchete = true;
      disableButton("boutonvoituredeluxe");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          VoituredeluxeCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

// Écouteur d'événement pour le bouton Atelier
document.getElementById("boutonatelier").addEventListener("click", function () {
  if (!AtelierAchete && points >= AtelierCost) {
    points -= AtelierCost; // Dépense les points
    totalPointsSpent += AtelierCost;
    autoclickerPower += 70000; // Augmente les points par seconde de 1000
    pointsPerClick += 200000;
    AtelierAchete = true;
    disableButton("boutonatelier");
    updateDisplay();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "fond insuffisant",
      text: `Il vous manque ${formatNumber(
        AtelierCost - points
      )} € pour acheter.`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
  }
});

// Écouteur d'événement pour le bouton Voiturier
document
  .getElementById("boutonvoiturier")
  .addEventListener("click", function () {
    if (!VoiturierAchete && points >= VoiturierCost) {
      points -= VoiturierCost; // Dépense les points
      totalPointsSpent += VoiturierCost;
      autoclickerPower += 80000; // Augmente les points par seconde de 2000
      pointsPerClick += 300000;
      VoiturierAchete = true;
      disableButton("boutonvoiturier");
      updateDisplay();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "fond insuffisant",
        text: `Il vous manque ${formatNumber(
          VoiturierCost - points
        )} € pour acheter.`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    }
  });

function displayItems() {
  itemsToBuyContainer.innerHTML = ""; // Vider le conteneur

  items.forEach((item) => {
    // Vérifier si l'objet a déjà été acheté
    if (boughtItems.includes(item.name)) {
      return; // Ne pas afficher l'objet s'il a déjà été acheté
    }

    // Créer une carte pour chaque objet
    const itemCard = document.createElement("div");
    itemCard.className = "item-card";

    // Ajouter une image de fond pour l'item "Panini"
    if (item.name === "Panini") {
      itemCard.style.backgroundImage = "url('Images/panini.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
    // Ajouter une image de fond pour l'item "Pizza"
    if (item.name === "Pizza") {
      itemCard.style.backgroundImage = "url('Images/pizza.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
    // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Vélo") {
      itemCard.style.backgroundImage = "url('Images/vélo.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    } // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Scooter") {
      itemCard.style.backgroundImage = "url('Images/scooter.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
    // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Moto") {
      itemCard.style.backgroundImage = "url('Images/moto.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
    // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Vacances") {
      itemCard.style.backgroundImage = "url('Images/vacances.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
    // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Salaire") {
      itemCard.style.backgroundImage = "url('Images/salaire.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
    // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Studio") {
      itemCard.style.backgroundImage = "url('Images/studio.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
        // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Maison") {
      itemCard.style.backgroundImage = "url('Images/maison.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
        // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Voiture") {
      itemCard.style.backgroundImage = "url('Images/voiture.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
        // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Jet") {
      itemCard.style.backgroundImage = "url('Images/jet.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
            // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Villa") {
      itemCard.style.backgroundImage = "url('Images/villa.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
            // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Île") {
      itemCard.style.backgroundImage = "url('Images/ile.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
                // Ajouter une image de fond pour l'item "vélo"
    if (item.name === "Pays") {
      itemCard.style.backgroundImage = "url('Images/pays.jpg')"; // Remplacez par le chemin de votre image
      itemCard.style.backgroundSize = "cover"; // Ajuster l'image pour couvrir la carte
      itemCard.style.backgroundPosition = "center"; // Centrer l'image
    }
    // Ajouter le nom de l'objet
    const itemName = document.createElement("div");
    itemName.className = "item-name";
    itemName.textContent = item.name;
    itemCard.appendChild(itemName);

    // Ajouter le prix de l'objet
    const itemCost = document.createElement("div");
    itemCost.className = "item-cost";
    itemCost.textContent = `${formatNumber(item.cost)} €`;
    itemCard.appendChild(itemCost);

    // Créer un bouton pour acheter l'objet
    const buyButton = document.createElement("button");
    buyButton.className = "buy-button";
    buyButton.textContent = "Acheter";
    buyButton.addEventListener("click", () => buyItem(item));
    itemCard.appendChild(buyButton);

    // Ajouter la carte au conteneur
    itemsToBuyContainer.appendChild(itemCard);
  });
}

function buyItem(item) {
  if (boughtItems.includes(item.name)) {
    return;
  }

  if (points >= item.cost) {
    points -= item.cost; // Retirer les points
    totalPointsSpent += item.cost; // Ajouter le coût total
    boughtItems.push(item.name); // Ajouter l'objet à la liste des objets achetés
    displayItems(); // Mettre à jour l'affichage
    updateBoughtItemsDisplay(); // Mettre à jour l'inventaire
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "fond insuffisant",
      text: `Il vous manque ${formatNumber(
        item.cost - points
      )} € pour acheter.`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
  }
}

// Afficher les items au chargement de la page
window.addEventListener("load", displayItems);

function addToBoughtItems(item) {
  // Créer une carte pour l'item acheté
  const boughtItemCard = document.createElement("div");
  boughtItemCard.className = "item-card";

  // Ajouter une image de fond pour les items spécifiques
  const itemImages = {
    "Panini": "Images/panini.jpg",
    "Pizza": "Images/pizza.jpg",
    "Vélo": "Images/vélo.jpg",
    "Scooter": "Images/scooter.jpg",
    "Moto": "Images/moto.jpg",
    "Vacances": "Images/vacances.jpg",
    "Salaire": "Images/salaire.jpg",
    "Studio": "Images/studio.jpg",
    "Maison": "Images/maison.jpg",
    "Voiture": "Images/voiture.jpg",
    "Jet": "Images/jet.jpg",
    "Villa": "Images/villa.jpg",
    "Île": "Images/ile.jpg",
    "Pays": "Images/pays.jpg",
  };

  if (itemImages[item.name]) {
    boughtItemCard.style.backgroundImage = `url('${itemImages[item.name]}')`;
    boughtItemCard.style.backgroundSize = "cover";
    boughtItemCard.style.backgroundPosition = "center";
  }

  // Ajouter le nom de l'item
  const itemName = document.createElement("div");
  itemName.className = "item-name";
  itemName.textContent = item.name;
  boughtItemCard.appendChild(itemName);

  // Ajouter la valeur actuelle de l'item
  const itemValue = document.createElement("div");
  itemValue.className = "item-cost";
  itemValue.textContent = `${formatNumber(item.currentValue)} €`;
  boughtItemCard.appendChild(itemValue);

  // Calculer la différence entre la valeur actuelle et le prix initial
  const difference = item.currentValue - item.cost;

  // Créer un élément pour afficher la différence de valeur
  const differenceElement = document.createElement("span");
  differenceElement.textContent = ` (${
    difference >= 0 ? "+" : ""
  }${formatNumber(difference)} €)`;
  differenceElement.className = difference >= 0 ? "difference positive" : "difference negative";
  boughtItemCard.appendChild(differenceElement);

  // Créer un bouton "Vendre"
  const sellButton = document.createElement("button");
  sellButton.textContent = "Vendre";
  sellButton.className = "sell-button";
  sellButton.addEventListener("click", () => sellItem(item));
  boughtItemCard.appendChild(sellButton);

  // Ajouter la carte au conteneur de l'inventaire
  itemsBoughtContainer.appendChild(boughtItemCard);
}

function fluctuateItemValues() {
  items.forEach((item) => {
    if (boughtItems.includes(item.name)) {
      // Générer une fluctuation aléatoire entre -50% et +50% de la valeur initiale
      const fluctuation = item.cost * (Math.random() * 1.0 - 0.5);
      item.currentValue = Math.round(item.cost + fluctuation);
    }
  });

  // Mettre à jour l'affichage des items achetés
  updateBoughtItemsDisplay();
}

function updateBoughtItemsDisplay() {
  itemsBoughtContainer.innerHTML = ""; // Vider l'inventaire avant de réafficher
  boughtItems.forEach((itemName) => {
    const item = items.find((i) => i.name === itemName); // Trouver l'objet dans la liste des items
    if (item) {
      addToBoughtItems(item); // Réafficher l'objet dans l'inventaire
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const sellThresholdSlider = document.getElementById("sell-threshold");
  const sellThresholdValue = document.getElementById("sell-threshold-value");

  // Mettre à jour la valeur affichée
  sellThresholdSlider.addEventListener("input", function () {
    sellThresholdValue.textContent = `${this.value}%`;
  });

  // Appliquer les paramètres du bot
  document
    .getElementById("apply-settings")
    .addEventListener("click", function () {
      bot.sellThreshold = parseInt(sellThresholdSlider.value);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Bot mis à jour",
        text: `Seuil de vente: ${bot.sellThreshold}%`,
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          document.querySelector(".swal2-popup").style.borderRadius = "20px";
        },
      });
    });
});
function sellItem(item) {
  // Vérifier si l'item est bien dans la liste des objets achetés
  if (!boughtItems.includes(item.name)) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Ce produit n'est pas dans votre inventaire",
      text: `Vous devez acheter cet article avant de pouvoir le vendre.`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
    return;
  }
  // Ajouter la valeur actuelle de l'item aux points du joueur
  points += item.currentValue;
  totalPointsEarned += item.currentValue;

  // Réinitialiser la valeur actuelle de l'objet à sa valeur d'origine (cost)
  item.currentValue = item.cost;

  // Retirer l'item de la liste des objets achetés
  boughtItems = boughtItems.filter((boughtItem) => boughtItem !== item.name);

  // Sauvegarder le jeu
  saveGame();

  // Mettre à jour l'affichage des items disponibles et de l'inventaire
  displayItems();
  updateBoughtItemsDisplay();
}

// Fonction pour acheter le bot
document.getElementById("buy-bot-btn").addEventListener("click", function () {
  if (points >= 500000000000) {
    points -= 500000000000;
    totalPointsSpent += 500000000000;
    bot.purchased = true;
    document.getElementById("buy-bot-btn").disabled = true;
    document.getElementById("bot-settings").style.display = "block";
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "fond insuffisant",
      text: `Il vous manque ${formatNumber(
        500000000000 - points
      )} € pour acheter.`,
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        document.querySelector(".swal2-popup").style.borderRadius = "20px";
      },
    });
  }
});

// Appliquer les paramètres du bot
document
  .getElementById("apply-settings")
  .addEventListener("click", function () {
    bot.sellThreshold = parseInt(
      document.getElementById("sell-threshold").value
    );
    bot.autoBuy = document.getElementById("auto-buy").checked;
  });

// Fonction pour vendre automatiquement les items
function autoSellItems() {
  if (!bot.purchased) return; // Ne rien faire si le bot n'est pas acheté

  boughtItems.forEach((itemName) => {
    const item = items.find((i) => i.name === itemName);
    if (item && item.currentValue > item.cost * (1 + bot.sellThreshold / 100)) {
      sellItem(item); // Vendre l'item si la condition est remplie
    }
  });
}

// Fonction pour acheter automatiquement les items
function autoBuyItems() {
  if (!bot.purchased || !bot.autoBuy) return; // Ne rien faire si le bot n'est pas acheté ou si l'achat automatique est désactivé

  items.forEach((item) => {
    if (!boughtItems.includes(item.name) && points >= item.cost) {
      buyItem(item); // Acheter l'item si la condition est remplie
    }
  });
}

// Appeler autoSellItems et autoBuyItems toutes les 2 secondes
setInterval(() => {
  fluctuateItemValues(); // Fluctuer les valeurs
  autoSellItems(); // Vendre automatiquement
  autoBuyItems(); // Acheter automatiquement
}, 10000);

// Sélection des éléments
const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");

// Fonction pour activer/désactiver la musique
function toggleMusic() {
  if (music.paused) {
    music.play().catch((error) => console.log("Lecture bloquée :", error));
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

// Fonction pour couper la musique
function stopMusic() {
  music.pause(); // Mettre en pause la musique
  music.currentTime = 0; // Remettre la musique au début (optionnel)
}

// Écouter les événements de déchargement de la page
window.addEventListener("beforeunload", stopMusic);
window.addEventListener("pagehide", stopMusic);

// Écouter les changements de visibilité de la page
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    stopMusic(); // Couper la musique
  }
});

// Écouter les événements de focus et de blur
window.addEventListener("blur", stopMusic);
window.addEventListener("focus", () => {
  if (!music.paused) {
    music.play().catch((error) => console.log("Lecture bloquée :", error));
  }
});

// Ajouter un écouteur d'événement au bouton pour activer/désactiver la musique
musicButton.addEventListener("click", toggleMusic);

// Désactiver la lecture automatique au chargement de la page
music.pause(); // S'assurer que la musique est en pause au départ
updateMusicIcon(); // Mettre à jour l'icône du bouton

document.getElementById("infoButton").addEventListener("click", function () {
  Swal.fire({
    title: "Informations sur le jeu",
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
    icon: "info",
    confirmButtonText: "Fermer",
    didOpen: () => {
      document.querySelector(".swal2-popup").style.borderRadius = "20px";
    },
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////:
// Anti auto-clicker + debugger bloquer //
(function () {
  let clickTimes = [];
  let autoClickDetected = false;

  // Fonction pour détecter l'auto-click
  function detectAutoClick() {
    const now = performance.now();
    clickTimes.push(now);

    if (clickTimes.length > 10) {
      clickTimes.shift();
    }

    if (clickTimes.length >= 5) {
      let intervalSum = 0;
      for (let i = 1; i < clickTimes.length; i++) {
        intervalSum += clickTimes[i] - clickTimes[i - 1];
      }

      const avgInterval = intervalSum / (clickTimes.length - 1);

      if (avgInterval < 100 && !autoClickDetected) {
        autoClickDetected = true;
        bloquerJeu(
          "Auto-click détecté !",
          "Vous utilisez un auto-clicker. Votre partie sera réinitialisée."
        );
      }
    }
  }

  // Fonction pour bloquer le jeu et réinitialiser la partie
  function bloquerJeu(title, message) {
    // Utiliser SweetAlert2 pour afficher une alerte stylisée
    Swal.fire({
      title: title,
      text: message,
      icon: "warning", // Icône d'avertissement
      confirmButtonText: "OK",
      allowOutsideClick: false, // Empêcher la fermeture en cliquant à l'extérieur
      allowEscapeKey: false, // Empêcher la fermeture avec la touche Échap
    }).then((result) => {
      if (result.isConfirmed) {
        // Réinitialiser la partie après que l'utilisateur a cliqué sur "OK"
        resetGame();

        // Afficher un overlay avec un compte à rebours
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        overlay.style.zIndex = "1000";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.color = "white";
        overlay.style.fontSize = "24px";
        overlay.innerHTML = `
                    <div style="text-align: center;">
                        <p>Vous serez débloqué dans <span id="countdown">30</span> secondes.</p>
                    </div>
                `;

        // Ajouter l'overlay à la page
        document.body.appendChild(overlay);

        // Démarrer un compte à rebours
        let timeLeft = 30;
        const countdownElement = overlay.querySelector("#countdown");
        const countdownInterval = setInterval(() => {
          timeLeft--;
          countdownElement.textContent = timeLeft;

          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.body.removeChild(overlay);
            autoClickDetected = false; // Réactiver la détection
          }
        }, 1000);
      }
    });
  }

  // Lier la fonction à l'événement de clic
  document.addEventListener("click", detectAutoClick);
})();

// Récupérer les éléments
const imageSupermarche = document.getElementById('imageSupermarche');
const popupSupermarche = document.getElementById('popupSupermarche');
const closePopup = document.querySelector('.close');

// Ouvrir le pop-up quand on clique sur l'image
imageSupermarche.addEventListener('click', () => {
    popupSupermarche.style.display = 'flex';
});

// Fermer le pop-up quand on clique sur la croix
closePopup.addEventListener('click', () => {
    popupSupermarche.style.display = 'none';
});

// Fermer le pop-up si on clique en dehors de la fenêtre
window.addEventListener('click', (event) => {
    if (event.target === popupSupermarche) {
        popupSupermarche.style.display = 'none';
    }
});
// Récupérer les éléments
const imageMagasinLuxe = document.getElementById('imageMagasinLuxe');
const popupMagasinLuxe = document.getElementById('popupMagasinLuxe');

// Ouvrir le pop-up quand on clique sur l'image
imageMagasinLuxe.addEventListener('click', () => {
    popupMagasinLuxe.style.display = 'flex';
});

// Fermer le pop-up si on clique en dehors de la fenêtre
window.addEventListener('click', (event) => {
    if (event.target === popupMagasinLuxe) {
        popupMagasinLuxe.style.display = 'none';
    }
});

// Récupérer les éléments
const imageConcession = document.getElementById('imageConcession');
const popupConcession = document.getElementById('popupConcession');

// Ouvrir le pop-up quand on clique sur l'image
imageConcession.addEventListener('click', () => {
    popupConcession.style.display = 'flex';
});

// Fermer le pop-up si on clique en dehors de la fenêtre
window.addEventListener('click', (event) => {
    if (event.target === popupConcession) {
        popupConcession.style.display = 'none';
    }
});

// Récupérer les éléments
const imageTrade = document.getElementById('imageTrade');
const popupTrade = document.getElementById('popupTrade');

// Ouvrir le pop-up quand on clique sur l'image
imageTrade.addEventListener('click', () => {
  popupTrade.style.display = 'flex';
});

// Fermer le pop-up si on clique en dehors de la fenêtre
window.addEventListener('click', (event) => {
    if (event.target === popupTrade) {
      popupTrade.style.display = 'none';
    }
});


