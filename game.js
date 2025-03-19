// Initialize Game
const player = {
    x: 400,
    y: 300,
    class: null,
    level: 1,
    xp: 0
};

// Class System
const classes = {
    necromancer: {
        type: 'hidden',
        unlock: () => player.xp >= 500,
        bonus: '+ Undead Minions'
    },
    swordmaster: {
        type: 'basic',
        bonus: '+ Critical Strikes'
    }
};

// Game Loop
function updateGame() {
    // Movement logic
    document.addEventListener('keydown', (e) => {
        const speed = 10;
        if(e.key === 'ArrowUp') player.y -= speed;
        if(e.key === 'ArrowDown') player.y += speed;
        if(e.key === 'ArrowLeft') player.x -= speed;
        if(e.key === 'ArrowRight') player.x += speed;
        
        updatePlayerPosition();
    });
}

function updatePlayerPosition() {
    const pc = document.getElementById('playerCharacter');
    pc.style.left = `${player.x}px`;
    pc.style.top = `${player.y}px`;
}

// Start Game
function init() {
    updateGame();
    spawnEnemy();
}

// Initialize when page loads
window.onload = init;
// Add to game.js
function showClassSelection() {
    const selectionHTML = `
        <div class="class-select">
            <h3>Choose Your Path:</h3>
            <div class="class-option" onclick="selectClass('swordmaster')">
                ⚔️ Swordmaster
            </div>
            <div class="class-option hidden-class" 
                 id="necromancerOption" 
                 onclick="selectClass('necromancer')">
                💀 ??? (Locked)
            </div>
        </div>
    `;
    document.body.innerHTML += selectionHTML;
}

function selectClass(className) {
    if(className === 'necromancer' && !classes.necromancer.unlock()) return;
    
    player.class = className;
    document.querySelector('.class-select').remove();
    applyClassBonuses();
}
// Save game
function saveGame() {
    localStorage.setItem('gameSave', JSON.stringify(player));
}

// Load game
function loadGame() {
    const save = localStorage.getItem('gameSave');
    if(save) Object.assign(player, JSON.parse(save));
}

// Add to init()
window.onload = () => {
    loadGame();
    init(); 
};
;

// Add to game.js
function attack(enemy) {
    const baseDamage = 10;
    let damage = baseDamage;
    
    if(player.class === 'swordmaster') damage *= 1.5;
    if(player.class === 'necromancer') summonMinion();
    
    enemy.health -= damage;
    if(enemy.health <= 0) defeatEnemy(enemy);
}

const audio = new Audio('sfx/sword-slash.mp3');
   function playSound() {
       audio.currentTime = 0;
       audio.play();
   }
const gameMap = [
       [1,1,1,0,0],
       [1,0,1,1,0],
       [0,0,0,1,1]
   ];
}