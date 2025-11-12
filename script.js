const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const beginBtn = document.getElementById('begin-btn');
const attackBtn = document.getElementById('attack-btn');
const sentenceDisplay = document.getElementById('sentence');
const playerInput = document.getElementById('player-input');
const resultText = document.getElementById('result-text');
const bossHPBar = document.getElementById('boss-hp');
const fightAgainBtn = document.getElementById('fight-again');
const proceedBtn = document.getElementById('proceed');
const postFight = document.getElementById('post-fight');
const restartBtn = document.getElementById('restart-btn');

let bossMaxHP = 100;
let bossHP = bossMaxHP;
let startTime;
let sentences = [
  "The shadows whisper back",
  "Echoes dance within silence",
  "Fear binds the fastest hands",
  "Every word cuts deeper",
  "The dungeon remembers all"
];

function startGame() {
  introScreen.classList.remove('active');
  gameScreen.classList.add('active');
  resetBoss();
  nextSentence();
}

function nextSentence() {
  playerInput.value = "";
  playerInput.focus();
  sentenceDisplay.textContent = sentences[Math.floor(Math.random() * sentences.length)];
  startTime = Date.now();
}

function attack() {
  const typed = playerInput.value.trim();
  const target = sentenceDisplay.textContent.trim();
  const timeTaken = (Date.now() - startTime) / 1000;
  
  if (typed === target) {
    let damage = Math.max(5, 20 - Math.floor(timeTaken));
    bossHP = Math.max(0, bossHP - damage);
    showResult("HIT!", true);
    bossHPBar.style.width = (bossHP / bossMaxHP * 100) + "%";
    bossHPBar.classList.add('shake');
    setTimeout(() => bossHPBar.classList.remove('shake'), 200);

    if (bossHP <= 0) {
      bossDefeated();
    } else {
      nextSentence();
    }
  } else {
    showResult("MISS!", false);
  }
}

function showResult(text, success) {
  resultText.textContent = text;
  resultText.style.color = success ? "#ff0000" : "#660000";
  resultText.classList.add('show');
  setTimeout(() => resultText.classList.remove('show'), 1000);
}

function bossDefeated() {
  postFight.classList.remove('hidden');
  sentenceDisplay.textContent = "";
  playerInput.disabled = true;
  attackBtn.disabled = true;
}

function resetBoss() {
  bossHP = bossMaxHP;
  bossHPBar.style.width = "100%";
  playerInput.disabled = false;
  attackBtn.disabled = false;
  postFight.classList.add('hidden');
}

beginBtn.addEventListener('click', startGame);
attackBtn.addEventListener('click', attack);
fightAgainBtn.addEventListener('click', () => {
  resetBoss();
  nextSentence();
});
proceedBtn.addEventListener('click', () => {
  gameScreen.classList.remove('active');
  endScreen.classList.add('active');
});
restartBtn.addEventListener('click', () => {
  endScreen.classList.remove('active');
  introScreen.classList.add('active');
});
// 🔒 Anti-copy and anti-paste protection
document.addEventListener("copy", (e) => e.preventDefault());
document.addEventListener("cut", (e) => e.preventDefault());
document.addEventListener("paste", (e) => e.preventDefault());
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable autocomplete and prevent right-click
const input = document.getElementById("playerInput");
if (input) {
  input.setAttribute("autocomplete", "off");
  input.setAttribute("autocorrect", "off");
  input.setAttribute("autocapitalize", "off");
  input.setAttribute("spellcheck", "false");

  // Prevent pasting directly into input
  input.addEventListener("paste", (e) => e.preventDefault());
  input.addEventListener("contextmenu", (e) => e.preventDefault());
}