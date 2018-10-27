const names = {
  1: 'A',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K'
}

const suits = [
  '♦', '♣', '♥', '♠'
];

class Card {
  constructor(number, suit) {
    this.number = parseInt(number);
    this.name = names[number];
    this.suit = suit;
    this.id = this.name + this.suit + (this.isOpen ? '^' : 'v');
    this.isRed = ['♥', '♦'].includes(suit);
    this.isOpen = false;
  }

  toString() {
    return this.id;
  }

  domElement() {
    const el = document.createElement('div');
    el.id = this.id;
    el.className = 'card';
    if (this.isOpen) {
      el.textContent = this.name + ' ' + this.suit;
      el.classList.add('open')
    }
    if (this.isRed) {
      el.classList.add('red');
    }
    return el;
  }
}

const deck = [];
const hand = [];
const piles = [];
const acePiles = {
  '♦': [],
  '♣': [],
  '♥': [],
  '♠': []
}

function clearArray(arr) {
  arr.splice(0, deck.length);
}

function createDeck() {
  clearArray(deck);
  suits.forEach(suit => {
    Object.keys(names).forEach(name => {
      deck.push(new Card(name, suit));
    });
  });
}

function shuffleDeck() {
  deck.sort(() => Math.random() - 0.5);
}

function initialise() {
  clearArray(piles);
  clearArray(hand);
  createDeck();
  shuffleDeck();
  for (let pileNumber = 0; pileNumber < 7; pileNumber++) {
    const pile = [];
    for (let cardNumber = 0; cardNumber < pileNumber + 1; cardNumber++) {
      const card = deck.pop();
      if (cardNumber === pileNumber) card.isOpen = true;
      pile.push(card);
    }
    piles.push(pile);
  }
}

function topCard(pile) {
  return pile[pile.length - 1];
}

function changePiles(fromPile, toPile) {
  const card = fromPile.pop();
  if (card) {
    const toCard = topCard(toPile);
    if (toCard.number === card.number + 1 && toCard.isRed !== card.isRed) {
      moveCard(fromPile, toPile, card);
      return true;
    } else if (card.number === 13 && pileIsEmpty(toPile)) {
      moveCard(fromPile, toPile, card);
      return true;
    } else {
      fromPile.push(card);
    }
  }
  return false;
}

function moveCard(fromPile, toPile, card) {
  toPile.push(card);
  revealTopOf(fromPile);
}

function deal() {
  for (let i = 0; i < 3; i++) {
    const card = deck.pop();
    if (card) {
      card.isOpen = true;
      hand.push(card);
    } else {
      break;
    }
  }
  return true;
}

function stashCard(fromPile) {
  const card = topCard(fromPile);
  const acePile = acePiles[fromPile.suit];
  const highestOfSuit = topCard(acePile);
  if (highestOfSuit.number === card.number + 1) {
    moveCard(fromPile, acePile, card);
    return true;
  }
  return false;
}

function createDomCardPile(pile, domPile, pileIsOffset) {
  // Add any which need adding
  pile.forEach((card, i) => {
    const domCard = domPile.querySelector(`[id="${card.id}"]`);
    if (!domCard) {
      const newCard = card.domElement();
      if (pileIsOffset) {
        newCard.style.top = `${i * 10}px`;
      }
      domPile.appendChild(newCard);
    }
  });
  // Remove any which need removing
  domPile.querySelectorAll('.card').forEach(domCard => {
    if (!pile.find(card => card.id === domCard.id)) {
      domCard.remove();
    }
  })
}

function renderDomPiles() {
  createDomCardPile(deck, document.querySelector('.deck'));
  createDomCardPile(hand, document.querySelector('.hand'));
  piles.forEach((pile, i) => {
    createDomCardPile(pile, document.querySelector(`.game-piles>:nth-child(${i + 1})`), true);
  })
}

function takeTurn(action, fromPile, toPile) {
  if (action(fromPile, toPile)) {
    renderDomPiles();
  }
}

initialise();
renderDomPiles();
