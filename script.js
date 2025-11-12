let bossHP = 100;
const maxHP = 100;
let currentSentence = "The gate hums with cursed whispers.";
const hpBar = document.getElementById("hp-fill");
const sentenceDisplay = document.getElementById("sentence");
const input = document.getElementById("playerInput");
const indicator = document.getElementById("damageIndicator");

let startTime = null;

// Track typing start time
input.addEventListener("input", () => {
  if (!startTime) startTime = new Date();
});

document.getElementById("submitBtn").addEventListener("click", attackBoss);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") attackBoss();
});

// Normalize text for fair comparison
function normalize(str) {
  return str
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Handle typing attack
function attackBoss() {
  const typed = input.value.trim();
  const sentence = currentSentence.trim();

  if (normalize(typed) === normalize(sentence)) {
    const endTime = new Date();
    const timeTaken = startTime ? (endTime - startTime) / 1000 : 1;
    startTime = null;

    let baseDamage = 10;
    let bonus = Math.max(0, 15 - timeTaken);
    let damage = Math.floor(baseDamage + bonus);

    bossHP -= damage;
    if (bossHP < 0) bossHP = 0;
    hpBar.style.width = `${(bossHP / maxHP) * 100}%`;

    showIndicator(`-${damage}`, "hit");

    if (bossHP > 0) {
      currentSentence = getNewSentence();
      sentenceDisplay.innerText = currentSentence;
    } else {
      showIndicator("💀 DEFEATED 💀", "kill");
      sentenceDisplay.innerText = "The Gatekeeper fades into shadow.";
      input.disabled = true;
      document.getElementById("submitBtn").disabled = true;
    }
  } else {
    showIndicator("MISS!", "miss");
  }

  input.value = "";
}

// Sentences for the boss fight
function getNewSentence() {
  const sentences = [
    "The whispers twist into maddened laughter.",
    "Shadows form words that burn your tongue.",
    "Your echo grows sharper, slicing through the dark.",
    "Letters fall apart like dying stars.",
    "The dungeon breathes with your heartbeat."
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

// Center glowing damage/miss text
function showIndicator(text, type) {
  indicator.innerText = text;
  indicator.style.color =
    type === "miss" ? "#cccccc" : type === "kill" ? "crimson" : "#ff4444";
  indicator.classList.add("active");
  setTimeout(() => {
    indicator.classList.remove("active");
  }, 800);
}