// ============================================================
// EL MINERO DEL ABISMO - v1
// ============================================================

const SAVE_KEY = 'minero-abismo-save';

const DIFFICULTIES = {
  facil:   { hazardMult: 0.5, damageMult: 0.6, label: '😌 Fácil' },
  normal:  { hazardMult: 1.0, damageMult: 1.0, label: '⚔️ Normal' },
  dificil: { hazardMult: 1.6, damageMult: 1.4, label: '💀 Difícil' }
};

const PICKAXES = [
  { name: 'Pico oxidado', damage: 1, speed: 1.0, maxDurability: 50,  price: 0 },
  { name: 'Pico de hierro', damage: 2, speed: 1.3, maxDurability: 150, price: 150 },
  { name: 'Pico de acero', damage: 4, speed: 1.8, maxDurability: 300, price: 400 },
  { name: 'Pico de oro', damage: 7, speed: 2.5, maxDurability: 500, price: 900 },
  { name: 'Pico de diamante', damage: 12, speed: 4.0, maxDurability: 1000, price: 2000 },
  { name: 'Pico del Abismo', damage: 20, speed: 6.0, maxDurability: 99999, price: 5000 }
];

// item name -> {rarity, xp, gold}
const ITEMS = {
  'Piedra':               { rarity: 'common', xp: 2, gold: 1 },
  'Mineral de hierro':     { rarity: 'common', xp: 3, gold: 3 },
  'Moneda antigua':        { rarity: 'common', xp: 3, gold: 5 },
  'Fragmento de cristal':  { rarity: 'common', xp: 4, gold: 8 },
  'Bolsa de oro':          { rarity: 'uncommon', xp: 8, gold: 25 },
  'Rubí':                  { rarity: 'uncommon', xp: 10, gold: 35 },
  'Zafiro':                { rarity: 'uncommon', xp: 10, gold: 35 },
  'Jarra antigua':         { rarity: 'uncommon', xp: 8, gold: 20 },
  'Corona perdida':        { rarity: 'rare', xp: 25, gold: 120 },
  'Pergamino antiguo':     { rarity: 'rare', xp: 20, gold: 90 },
  'Espada enterrada':      { rarity: 'rare', xp: 22, gold: 100 },
  'Anillo maldito':        { rarity: 'rare', xp: 20, gold: 95 },
  'Cristal del Abismo':    { rarity: 'epic', xp: 50, gold: 300 },
  'Ídolo antiguo':         { rarity: 'epic', xp: 45, gold: 280 },
  'Diamante negro':        { rarity: 'epic', xp: 55, gold: 350 },
  'Corona del Rey Muerto': { rarity: 'legendary', xp: 150, gold: 1000 },
  'Corazón del Abismo':    { rarity: 'legendary', xp: 180, gold: 1200 },
  'Reliquia del Primer Minero': { rarity: 'legendary', xp: 200, gold: 1500 }
};

const RARITY_ITEMS = {
  common: ['Piedra', 'Mineral de hierro', 'Moneda antigua', 'Fragmento de cristal'],
  uncommon: ['Bolsa de oro', 'Rubí', 'Zafiro', 'Jarra antigua'],
  rare: ['Corona perdida', 'Pergamino antiguo', 'Espada enterrada', 'Anillo maldito'],
  epic: ['Cristal del Abismo', 'Ídolo antiguo', 'Diamante negro'],
  legendary: ['Corona del Rey Muerto', 'Corazón del Abismo', 'Reliquia del Primer Minero']
};


// ============================================================
// VISUALES DE ITEMS
// ============================================================
const ITEM_VISUALS = {
  'Piedra': { icon: '🪨', description: 'Una piedra común extraída de las profundidades.' },
  'Mineral de hierro': { icon: '⛓️', description: 'Mineral resistente usado por los mineros.' },
  'Moneda antigua': { icon: '🪙', description: 'Una moneda de una civilización olvidada.' },
  'Fragmento de cristal': { icon: '💠', description: 'Un pequeño fragmento cristalino que brilla tenuemente.' },
  'Bolsa de oro': { icon: '💰', description: 'Una pequeña bolsa repleta de monedas antiguas.' },
  'Rubí': { icon: '❤️', description: 'Una gema roja de gran valor.' },
  'Zafiro': { icon: '🔷', description: 'Una gema azul encontrada en las rocas profundas.' },
  'Jarra antigua': { icon: '🏺', description: 'Una jarra conservada durante siglos bajo tierra.' },
  'Corona perdida': { icon: '👑', description: 'Una corona perdida por algún antiguo gobernante.' },
  'Pergamino antiguo': { icon: '📜', description: 'Un pergamino misterioso lleno de secretos.' },
  'Espada enterrada': { icon: '⚔️', description: 'Una espada que permaneció enterrada durante generaciones.' },
  'Anillo maldito': { icon: '💍', description: 'Un extraño anillo que parece guardar una maldición.' },
  'Cristal del Abismo': { icon: '🔮', description: 'Un cristal que parece contener energía del Abismo.' },
  'Ídolo antiguo': { icon: '🗿', description: 'Una figura sagrada de una civilización perdida.' },
  'Diamante negro': { icon: '💎', description: 'Una gema extremadamente rara y oscura.' },
  'Corona del Rey Muerto': { icon: '👑', description: 'La corona de un rey cuyo nombre se perdió en el tiempo.' },
  'Corazón del Abismo': { icon: '💜', description: 'Un cristal con forma de corazón que late con energía oscura.' },
  'Reliquia del Primer Minero': { icon: '🏆', description: 'Una reliquia legendaria vinculada al primer minero del Abismo.' }
};

const RARITY_LABELS = {
  common: 'Común',
  uncommon: 'Poco común',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Legendario'
};

function itemVisual(name) {
  return ITEM_VISUALS[name] || { icon: '❓', description: 'Un objeto misterioso.' };
}

function showTreasurePopup(itemName, rarity, info) {
  const popup = document.getElementById('treasure-popup');
  const card = popup.querySelector('.treasure-card');

  document.getElementById('treasure-rarity').textContent =
    `✨ ${RARITY_LABELS[rarity] || rarity}`;

  document.getElementById('treasure-icon').textContent = itemVisual(itemName).icon;
  document.getElementById('treasure-name').textContent = itemName;
  document.getElementById('treasure-description').textContent = itemVisual(itemName).description;
  document.getElementById('treasure-reward').textContent =
    `✨ +${info.xp} XP   ·   🪙 ${info.gold} oro de valor`;

  card.className = `treasure-card rarity-${rarity}`;
  popup.classList.remove('hidden');
}

function closeTreasurePopup() {
  document.getElementById('treasure-popup').classList.add('hidden');
}

let state = null;

// ============================================================
// ESTADO INICIAL
// ============================================================
function newGameState(difficulty) {
  return {
    difficulty,
    hp: 100, maxHp: 100,
    energy: 100, maxEnergy: 100,
    gold: 0,
    xp: 0, level: 1, xpNeeded: 100,
    pickaxeIndex: 0,
    pickaxeDurability: PICKAXES[0].maxDurability,
    inventory: {},
    bagSize: 10,
    pos: { x: 0, y: 0 },
    discovered: { '0,0': { dug: true } },
    potionsHeal: 0,
    potionsEnergy: 0
  };
}

function pickaxe() { return PICKAXES[state.pickaxeIndex]; }

// ============================================================
// GUARDADO
// ============================================================
function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}
function loadSave() {
  const raw = localStorage.getItem(SAVE_KEY);
  return raw ? JSON.parse(raw) : null;
}
function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

// ============================================================
// UTILIDADES
// ============================================================
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function roll(pct) { return Math.random() * 100 < pct; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function depthOf(pos) { return Math.max(Math.abs(pos.x), Math.abs(pos.y)); }

function bagCount() {
  return Object.values(state.inventory).reduce((a, b) => a + b, 0);
}

function addItem(name, qty = 1) {
  if (bagCount() + qty > state.bagSize) {
    log(`🎒 ¡Tu mochila está llena! No pudiste recoger ${name}.`, 'bad');
    return false;
  }
  state.inventory[name] = (state.inventory[name] || 0) + qty;
  return true;
}

function log(msg, cls = 'info') {
  const logEl = document.getElementById('log');
  const p = document.createElement('p');
  p.className = 'log-' + cls;
  p.textContent = msg;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
  while (logEl.children.length > 60) logEl.removeChild(logEl.firstChild);
}

function clearLogVisual() {
  document.getElementById('log').innerHTML = '';
}

// ============================================================
// XP / NIVEL
// ============================================================
function gainXp(amount) {
  state.xp += amount;
  while (state.xp >= state.xpNeeded) {
    state.xp -= state.xpNeeded;
    state.level++;
    state.xpNeeded = Math.round(state.xpNeeded * 1.4);
    state.maxHp += 15;
    state.maxEnergy += 10;
    state.hp = state.maxHp;
    state.energy = state.maxEnergy;
    log(`✨ ¡Subiste al NIVEL ${state.level}! Vida y energía máximas aumentaron.`, 'good');
  }
}

// ============================================================
// EXCAVACIÓN
// ============================================================
document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (!state) return;

  const active = document.activeElement;
  if (active && ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName)) return;

  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      dig("up");
      break;

    case "ArrowDown":
      e.preventDefault();
      dig("down");
      break;

    case "ArrowLeft":
      e.preventDefault();
      dig("left");
      break;

    case "ArrowRight":
      e.preventDefault();
      dig("right");
      break;
  }
});
function energyCost() {
  return Math.max(2, Math.round(5 / pickaxe().speed));
}

function dig(direction) {
  if (state.hp <= 0) return;

  const cost = energyCost();

  if (state.energy < cost) {
    log('😴 Estás demasiado cansado para seguir excavando. Vuelve al refugio a dormir.', 'bad');
    return;
  }

  const newPos = { ...state.pos };

  if (direction === 'up') newPos.y += 1;
  if (direction === 'down') newPos.y -= 1;
  if (direction === 'left') newPos.x -= 1;
  if (direction === 'right') newPos.x += 1;

  state.energy -= cost;
  state.pos = newPos;

  const key = `${newPos.x},${newPos.y}`;
  const depth = depthOf(newPos);
  const diffMult = DIFFICULTIES[state.difficulty];

  // Comprobar si este lugar ya fue excavado ANTES de marcarlo
  const alreadyDug = state.discovered[key]?.dug === true;

  if (!alreadyDug) {
    state.discovered[key] = { dug: true };
  }

  log(`⛏️ Excavando hacia ${dirLabel(direction)}... (profundidad ${depth})`, 'info');

  // ---- PELIGROS ----
  let tookDamage = false;

  if (direction === 'up') {
    const rockChance = clamp(10 + depth * 0.4, 5, 45) * diffMult.hazardMult;

    if (roll(rockChance)) {
      const dmg = Math.round((5 + depth * 0.3) * diffMult.damageMult);
      state.hp -= dmg;

      log(`🪨 ¡Una roca cae desde arriba! Pierdes ${dmg} de vida.`, 'bad');
      tookDamage = true;
    }
  }

  const mineChance = clamp(4 + depth * 0.25, 2, 25) * diffMult.hazardMult;

  if (roll(mineChance)) {
    const dmg = Math.round((12 + depth * 0.5) * diffMult.damageMult);
    state.hp -= dmg;

    log(`💥 ¡MINA EXPLOSIVA! La explosión te hiere por ${dmg} de vida.`, 'bad');

    state.pickaxeDurability = Math.max(
      0,
      state.pickaxeDurability - 15
    );

    tookDamage = true;
  }

  if (state.hp <= 0) {
    handleFaint();
    render();
    save();
    return;
  }

  // ---- DURABILIDAD DEL PICO ----
  state.pickaxeDurability = Math.max(
    0,
    state.pickaxeDurability - 1
  );

  if (state.pickaxeDurability <= 0) {
    log(
      '⛏️ ¡Tu pico se ha roto! Visita la tienda para reemplazarlo.',
      'bad'
    );
  }

  // ---- BÚSQUEDA DE TESOROS ----
  // Solo se pueden encontrar items la PRIMERA vez que se excava
  // esta casilla.
  if (!alreadyDug) {
    const findChance = clamp(
      60 + pickaxe().damage * 1.2,
      60,
      90
    );

    if (roll(findChance)) {
      resolveFind(depth);
    } else {
      log('💨 No encontraste nada esta vez.', 'info');
    }
  } else {
    log(
      '🕳️ Este lugar ya fue excavado. No hay nada más que encontrar aquí.',
      'info'
    );
  }

  render();
  save();
}

function dirLabel(d) {
  return { up: 'arriba', down: 'abajo', left: 'la izquierda', right: 'la derecha' }[d];
}

function resolveFind(depth) {
  const depthBonus = clamp(depth * 0.05, 0, 8);
  const weights = {
    common: 55 - depthBonus * 0.5,
    uncommon: 27,
    rare: 12 + depthBonus * 0.3,
    epic: 5 + depthBonus * 0.3,
    legendary: 1 + depthBonus * 0.1
  };

  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  let rarity = 'common';

  for (const [k, w] of Object.entries(weights)) {
    if (r < w) {
      rarity = k;
      break;
    }
    r -= w;
  }

  const itemName = pick(RARITY_ITEMS[rarity]);
  const added = addItem(itemName);

  if (added) {
    const info = ITEMS[itemName];
    gainXp(info.xp);

    const cls = rarity === 'legendary' ? 'legend' : 'good';
    log(`${itemVisual(itemName).icon} ¡Encontraste: ${itemName}! (+${info.xp} XP)`, cls);
    showTreasurePopup(itemName, rarity, info);
  }
}

function handleFaint() {
  log('💀 Has caído inconsciente... Un compañero minero te encuentra y te lleva al refugio.', 'bad');
  const lostGold = Math.round(state.gold * 0.2);
  state.gold -= lostGold;
  if (lostGold > 0) log(`🪙 Perdiste ${lostGold} de oro en el proceso.`, 'bad');
  state.hp = Math.round(state.maxHp * 0.5);
  state.energy = Math.round(state.maxEnergy * 0.5);
  state.pos = { x: 0, y: 0 };
}

function goHome() {
  state.pos = { x: 0, y: 0 };
  log('🏠 Regresaste al refugio.', 'info');
  render();
  save();
}

function sleep() {
  state.hp = state.maxHp;
  state.energy = state.maxEnergy;
  log('😴 Duermes profundamente. Vida y energía restauradas por completo.', 'good');
  render();
  save();
}

// ============================================================
// TIENDA
// ============================================================
function sellItem(name) {
  if (!state.inventory[name]) return;
  const info = ITEMS[name];
  state.inventory[name] -= 1;
  if (state.inventory[name] <= 0) delete state.inventory[name];
  state.gold += info.gold;
  log(`🪙 Vendiste ${name} por ${info.gold} oro.`, 'good');
  render();
  save();
}

function sellAll(name) {
  if (!state.inventory[name]) return;
  const info = ITEMS[name];
  const qty = state.inventory[name];
  const total = qty * info.gold;
  delete state.inventory[name];
  state.gold += total;
  log(`🪙 Vendiste ${qty}x ${name} por ${total} oro.`, 'good');
  render();
  save();
}

function buyPickaxe(index) {
  const p = PICKAXES[index];
  if (state.gold < p.price) return;
  if (index <= state.pickaxeIndex) return;
  state.gold -= p.price;
  state.pickaxeIndex = index;
  state.pickaxeDurability = p.maxDurability;
  log(`⛏️ ¡Compraste el ${p.name}!`, 'good');
  render();
  save();
}

const BAG_UPGRADE_PRICE = (size) => 30 + size * 8;
function buyBag() {
  const price = BAG_UPGRADE_PRICE(state.bagSize);
  if (state.gold < price) return;
  state.gold -= price;
  state.bagSize += 10;
  log(`🎒 ¡Mochila ampliada a ${state.bagSize} espacios!`, 'good');
  render();
  save();
}

const POTION_HEAL_PRICE = 40;
const POTION_ENERGY_PRICE = 30;
function buyPotion(type) {
  const price = type === 'heal' ? POTION_HEAL_PRICE : POTION_ENERGY_PRICE;
  if (state.gold < price) return;
  state.gold -= price;
  if (type === 'heal') state.potionsHeal++;
  else state.potionsEnergy++;
  log(`🧪 Compraste una poción de ${type === 'heal' ? 'vida' : 'energía'}.`, 'good');
  render();
  save();
}

function usePotion(type) {
  if (type === 'heal' && state.potionsHeal > 0) {
    state.potionsHeal--;
    state.hp = clamp(state.hp + 40, 0, state.maxHp);
    log('🧪 Usaste una poción de vida. +40 HP.', 'good');
  } else if (type === 'energy' && state.potionsEnergy > 0) {
    state.potionsEnergy--;
    state.energy = clamp(state.energy + 40, 0, state.maxEnergy);
    log('🧪 Usaste una poción de energía. +40 Energía.', 'good');
  }
  render();
  save();
}

// ============================================================
// RENDER
// ============================================================
function render() {
  document.getElementById('hp-fill').style.width = (state.hp / state.maxHp * 100) + '%';
  document.getElementById('hp-text').textContent = `${Math.max(0, state.hp)}/${state.maxHp}`;

  document.getElementById('energy-fill').style.width = (state.energy / state.maxEnergy * 100) + '%';
  document.getElementById('energy-text').textContent = `${state.energy}/${state.maxEnergy}`;

  document.getElementById('xp-fill').style.width = (state.xp / state.xpNeeded * 100) + '%';
  document.getElementById('xp-text').textContent = `${state.xp}/${state.xpNeeded}`;
  document.getElementById('level-text').textContent = state.level;

  document.getElementById('gold-text').textContent = state.gold;

  const p = pickaxe();
  document.getElementById('pickaxe-text').textContent = `${p.name} (${state.pickaxeDurability}/${p.maxDurability})`;
  document.getElementById('pos-text').textContent = `📍 (${state.pos.x}, ${state.pos.y})`;
  document.getElementById('diff-text').textContent = DIFFICULTIES[state.difficulty].label;

  renderMap();
  renderInventory();
  renderShop();

  // disable dig buttons if pickaxe broken or dead
  const broken = state.pickaxeDurability <= 0;
  ['dig-up', 'dig-down', 'dig-left', 'dig-right'].forEach(id => {
    document.getElementById(id).disabled = broken;
  });
}

function renderMap() {
  const grid = document.getElementById('map-grid');
  grid.innerHTML = '';
  const RADIUS = 3;
  for (let dy = RADIUS; dy >= -RADIUS; dy--) {
    for (let dx = -RADIUS; dx <= RADIUS; dx++) {
      const x = state.pos.x + dx;
      const y = state.pos.y + dy;
      const key = `${x},${y}`;
      const tile = document.createElement('div');
      tile.className = 'tile';
      if (x === state.pos.x && y === state.pos.y) {
        tile.classList.add('player');
        tile.textContent = '🧍';
      } else if (state.discovered[key] && state.discovered[key].dug) {
        tile.classList.add('dug');
        if (depthOf({ x, y }) > 15) tile.classList.add('deep');
        tile.textContent = depthOf({ x, y }) > 30 ? '🕳️' : '';
      } else {
        tile.classList.add('undug');
        tile.textContent = '░';
      }
      grid.appendChild(tile);
    }
  }
}

function renderInventory() {
  document.getElementById('bag-capacity').textContent = `(${bagCount()}/${state.bagSize})`;
  const list = document.getElementById('inventory-list');
  list.innerHTML = '';

  if (state.potionsHeal > 0) {
    list.appendChild(potionRow('🧪', 'Poción de vida', state.potionsHeal, () => usePotion('heal')));
  }

  if (state.potionsEnergy > 0) {
    list.appendChild(potionRow('⚡', 'Poción de energía', state.potionsEnergy, () => usePotion('energy')));
  }

  const names = Object.keys(state.inventory);

  if (names.length === 0 && state.potionsHeal === 0 && state.potionsEnergy === 0) {
    list.innerHTML = '<p style="color:#888;grid-column:1/-1;text-align:center;">Tu mochila está vacía. ¡Empieza a excavar!</p>';
    return;
  }

  names.forEach(name => {
    const info = ITEMS[name];
    const visual = itemVisual(name);
    const row = document.createElement('div');

    row.className = `inv-item rarity-${info.rarity}`;
    row.title = visual.description;

    row.innerHTML = `
      <div class="item-icon">${visual.icon}</div>
      <div class="item-name">${name}</div>
      <div class="item-qty">x${state.inventory[name]}</div>
      <div class="item-rarity">${RARITY_LABELS[info.rarity]}</div>
    `;

    list.appendChild(row);
  });
}

function potionRow(icon, name, qty, onUse) {
  const row = document.createElement('div');
  row.className = 'inv-item potion-inventory';

  const iconEl = document.createElement('div');
  iconEl.className = 'item-icon';
  iconEl.textContent = icon;

  const info = document.createElement('div');
  info.className = 'potion-info';
  info.innerHTML = `<div class="item-name">${name}</div><div class="item-qty">x${qty}</div>`;

  const btn = document.createElement('button');
  btn.textContent = 'Usar';
  btn.onclick = onUse;

  row.appendChild(iconEl);
  row.appendChild(info);
  row.appendChild(btn);

  return row;
}

function renderShop() {
  const sellList = document.getElementById('sell-list');
  sellList.innerHTML = '';

  const names = Object.keys(state.inventory);

  if (names.length === 0) {
    sellList.innerHTML = '<p style="color:#888;">No tienes tesoros para vender.</p>';
  } else {
    names.forEach(name => {
      const info = ITEMS[name];
      const visual = itemVisual(name);

      const row = document.createElement('div');
      row.className = 'shop-item';

      row.innerHTML = `
        <div class="shop-visual">
          <div class="shop-icon">${visual.icon}</div>
          <div class="shop-info">
            <div class="shop-name">${name} x${state.inventory[name]}</div>
            <div class="shop-rarity">${RARITY_LABELS[info.rarity]}</div>
            <small>${info.gold} 🪙 c/u</small>
          </div>
        </div>
      `;

      const btn = document.createElement('button');
      btn.textContent = 'Vender todo';
      btn.onclick = () => sellAll(name);

      row.appendChild(btn);
      sellList.appendChild(row);
    });
  }

  const pShop = document.getElementById('pickaxe-shop');
  pShop.innerHTML = '';

  PICKAXES.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'shop-item';

    const owned = i === state.pickaxeIndex;
    const locked = i < state.pickaxeIndex;

    row.innerHTML = `
      <div class="shop-visual">
        <div class="shop-icon">⛏️</div>
        <div class="shop-info">
          <div class="shop-name">${p.name}${owned ? ' (equipado)' : ''}</div>
          <small>Daño ${p.damage} · Vel ${p.speed}x · Dur ${p.maxDurability}</small>
        </div>
      </div>
    `;

    const btn = document.createElement('button');

    if (owned || locked) {
      btn.textContent = owned ? 'Equipado' : 'Obtenido';
      btn.disabled = true;
    } else {
      btn.textContent = `${p.price} 🪙`;
      btn.disabled = state.gold < p.price;
      btn.onclick = () => buyPickaxe(i);
    }

    row.appendChild(btn);
    pShop.appendChild(row);
  });

  const other = document.getElementById('other-shop');
  other.innerHTML = '';

  const bagPrice = BAG_UPGRADE_PRICE(state.bagSize);
  other.appendChild(shopRow(`🎒 Ampliar mochila (+10, actual ${state.bagSize})`, bagPrice, () => buyBag()));
  other.appendChild(shopRow('🧪 Poción de vida (+40 HP)', POTION_HEAL_PRICE, () => buyPotion('heal')));
  other.appendChild(shopRow('⚡ Poción de energía (+40)', POTION_ENERGY_PRICE, () => buyPotion('energy')));
}

function shopRow(label, price, onBuy) {
  const row = document.createElement('div');
  row.className = 'shop-item';
  row.innerHTML = `<span>${label}</span>`;
  const btn = document.createElement('button');
  btn.textContent = `${price} 🪙`;
  btn.disabled = state.gold < price;
  btn.onclick = onBuy;
  row.appendChild(btn);
  return row;
}

// ============================================================
// TABS
// ============================================================
function showTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  ['inventory', 'shelter', 'shop'].forEach(t => {
    document.getElementById('panel-' + t).classList.toggle('hidden', t !== tab);
  });
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
function startGame(difficulty) {
  state = newGameState(difficulty);
  document.getElementById('start-screen').classList.add('hidden');
  ['hud', 'map-container', 'log', 'controls', 'bottom-tabs', 'reset-btn'].forEach(id =>
    document.getElementById(id).classList.remove('hidden')
  );
  clearLogVisual();
  log('⛏️ Bienvenido al Abismo. Excava en cualquier dirección para comenzar tu aventura.', 'info');
  showTab('shelter');
  render();
  save();
}

function continueGame() {
  const loaded = loadSave();
  if (!loaded) return;
  state = loaded;
  document.getElementById('start-screen').classList.add('hidden');
  ['hud', 'map-container', 'log', 'controls', 'bottom-tabs', 'reset-btn'].forEach(id =>
    document.getElementById(id).classList.remove('hidden')
  );
  clearLogVisual();
  log('▶ Partida cargada. Bienvenido de vuelta, minero.', 'info');
  showTab('shelter');
  render();
}

function initUI() {
  const existing = loadSave();
  if (existing) {
    document.getElementById('continue-btn').style.display = 'block';
    document.getElementById('continue-btn').onclick = continueGame;
  }

  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.onclick = () => startGame(btn.dataset.diff);
  });

  document.getElementById('dig-up').onclick = () => dig('up');
  document.getElementById('dig-down').onclick = () => dig('down');
  document.getElementById('dig-left').onclick = () => dig('left');
  document.getElementById('dig-right').onclick = () => dig('right');
  document.getElementById('go-home').onclick = goHome;
  document.getElementById('sleep-btn').onclick = sleep;
  document.getElementById('treasure-close').onclick = closeTreasurePopup;
  document.getElementById('treasure-popup').addEventListener('click', (e) => {
    if (e.target.id === 'treasure-popup') closeTreasurePopup();
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => showTab(btn.dataset.tab);
  });

  document.getElementById('reset-btn').onclick = () => {
    if (confirm('¿Seguro que quieres borrar tu partida y empezar de nuevo?')) {
      clearSave();
      location.reload();
    }
  };
}

document.addEventListener('DOMContentLoaded', initUI);
