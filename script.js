const suits = [
  { symbol: '♠', color: 'black' },
  { symbol: '♥', color: 'red' },
  { symbol: '♦', color: 'red' },
  { symbol: '♣', color: 'black' }
];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const tableau = [];
let selectedCard = null;
let tableauEl = null;
let selectedCardInfo = null;
let resetButton = null;

function initGame() {
  tableauEl = document.getElementById('tableau');
  selectedCardInfo = document.getElementById('selectedCardInfo');
  resetButton = document.getElementById('resetButton');

  if (!tableauEl || !selectedCardInfo || !resetButton) {
    console.warn('No se encontraron los elementos del juego.');
    return;
  }

  resetButton.addEventListener('click', createGame);
  createGame();
}

function buildDeck() {
  const deck = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({ rank, suit: suit.symbol, color: suit.color, id: `${rank}${suit.symbol}${Math.random().toString(36).slice(2)}` });
    });
  });
  return deck;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createGame() {
  tableau.length = 0;
  selectedCard = null;
  selectedCardInfo.textContent = 'Carta seleccionada: ninguna';

  const deck = shuffle(buildDeck());

  for (let pile = 0; pile < 7; pile += 1) {
    tableau.push(deck.splice(0, pile + 1));
  }

  renderTableau();
}

function renderTableau() {
  tableauEl.innerHTML = '';

  tableau.forEach((pile, pileIndex) => {
    const pileEl = document.createElement('div');
    pileEl.className = 'pile';
    pileEl.dataset.pileIndex = pileIndex;

    const title = document.createElement('p');
    title.className = 'pile-title';
    title.textContent = `Pila ${pileIndex + 1}`;
    pileEl.append(title);

    if (pile.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'pile-empty';
      empty.textContent = 'Vacía';
      pileEl.append(empty);
    }

    pile.forEach((card, cardIndex) => {
      const cardEl = document.createElement('button');
      cardEl.type = 'button';
      cardEl.className = `card ${card.color === 'red' ? 'red' : ''}`;
      cardEl.dataset.pileIndex = pileIndex;
      cardEl.dataset.cardIndex = cardIndex;
      cardEl.style.top = `${cardIndex * 30}px`;
      cardEl.innerHTML = `
        <div class="corner">
          <span class="rank">${card.rank}</span>
          <span class="suit">${card.suit}</span>
        </div>
        <div class="center">${card.suit}</div>
        <div class="corner" style="align-items: flex-end; text-align: right;">
          <span class="rank">${card.rank}</span>
          <span class="suit">${card.suit}</span>
        </div>
      `;

      if (selectedCard && selectedCard.id === card.id) {
        cardEl.classList.add('selected');
      }

      cardEl.addEventListener('click', (event) => {
        event.stopPropagation();
        handleCardClick(pileIndex, cardIndex);
      });

      pileEl.append(cardEl);
    });

    pileEl.addEventListener('click', () => {
      moveSelectedCardToPile(pileIndex);
    });

    tableauEl.append(pileEl);
  });
}

function handleCardClick(pileIndex, cardIndex) {
  const card = tableau[pileIndex][cardIndex];

  if (!card) {
    return;
  }

  if (selectedCard && selectedCard.id === card.id) {
    selectedCard = null;
    selectedCardInfo.textContent = 'Carta seleccionada: ninguna';
  } else {
    selectedCard = { ...card, pileIndex, cardIndex };
    selectedCardInfo.textContent = `Carta seleccionada: ${card.rank}${card.suit} (Pila ${pileIndex + 1})`;
  }

  renderTableau();
}

function moveSelectedCardToPile(targetPileIndex) {
  if (!selectedCard) {
    return;
  }

  if (selectedCard.pileIndex === Number(targetPileIndex)) {
    return;
  }

  const sourcePile = tableau[selectedCard.pileIndex];
  const movingCard = sourcePile.splice(selectedCard.cardIndex, 1)[0];
  tableau[targetPileIndex].push(movingCard);

  selectedCard = null;
  selectedCardInfo.textContent = 'Carta seleccionada: ninguna';
  renderTableau();
}

document.addEventListener('DOMContentLoaded', initGame);
