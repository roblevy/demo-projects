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
    el.addEventListener('click', handleCardClick(this));
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

  changePiles(toPile) {
    let canMove = false;
    const toCard = toPile.topCard();
    if (!toCard) {
      canMove = true;
    } else if (toCard.number === this.number + 1 && toCard.isRed !== this.isRed) {
      canMove = true;
    } else if (this.name === 'K' && toPile.isEmpty()) {
      canMove = true;
    }
    if (canMove) {
      const openCards = this.pile().openCardsFrom(this);
      openCards.forEach(card => card.move(toPile));
    }
    return canMove;
  }

  move(toPile) {
    console.log('Moving', this, 'to', toPile);
    const fromPile = this.pile();
    fromPile.cards.filter(card => card !== this);
    fromPile.revealTopCard();
    toPile.cards.push(this);
    fromPile.render();
    toPile.render();
  }

  pile() {
    const piles = [deck, hand].concat(gamePiles).concat(acePiles);
    return piles.find(pile => pile.cards.includes(this));
  }

  open() {
    this.isOpen = true;
    this.id = this.id.replace('v', '^');
  }
}

class Pile {
  constructor(type, domPile, suit) {
    this.type = type;
    this.cards = [];
    this.domPile = domPile;
    this.suit = suit;
  }

  contains(cardToFind) {
    return this.cards.find(card => card === cardToFind);
  }

  topCard() {
    return this.cards[this.cards.length - 1];
  }

  isEmpty() {
    return !this.cards.length;
  }

  revealTopCard() {
    this.topCard().open();
  }

  openCardsFrom(card) {
    const openCards = [];
    for (let i = this.cards.indexOf(card); i < this.cards.length; i++) {
      const card = this.cards[i];
      if (card.isOpen) {
        openCards.push(card);
      }
    }
    return openCards;
  }

  render() {
    const domPile = this.domPile;
    // Add any which need adding
    this.cards.forEach((card, i) => {
      const domCard = domPile.querySelector(`[id="${card.id}"]`);
      if (!domCard) {
        const newCard = card.domElement();
        if (this.type === 'game') {
          newCard.style.top = `${i * 10}px`;
        }
        domPile.appendChild(newCard);
      }
    });
    // Remove any which need removing
    domPile.querySelectorAll('.card').forEach(domCard => {
      if (!this.cards.find(card => card.id === domCard.id)) {
        domCard.remove();
      }
    });
  }
}

const deck = new Pile('deck', document.querySelector('.deck'));
const hand = new Pile('hand', document.querySelector('.hand'));
const gamePiles = [];
const $acePiles = document.querySelector('.ace-piles');
const $gamePiles = document.querySelector('.game-piles');
const acePiles = [
  new Pile('ace', $acePiles.children[0], '♦'),
  new Pile('ace', $acePiles.children[1], '♣'),
  new Pile('ace', $acePiles.children[2], '♥'),
  new Pile('ace', $acePiles.children[3], '♠')
];

function clearArray(arr) {
  arr.splice(0, deck.length);
}

function createDeck() {
  clearArray(deck.cards);
  suits.forEach(suit => {
    Object.keys(names).forEach(name => {
      deck.cards.push(new Card(name, suit));
    });
  });
}

function shuffleDeck() {
  deck.cards.sort(() => Math.random() - 0.5);
}

function initialise() {
  clearArray(gamePiles);
  clearArray(hand.cards);
  createDeck();
  shuffleDeck();
  for (let pileNumber = 0; pileNumber < 7; pileNumber++) {
    const pile = new Pile('game', $gamePiles.children[pileNumber]);
    for (let cardNumber = 0; cardNumber < pileNumber + 1; cardNumber++) {
      const card = deck.cards.pop();
      if (cardNumber === pileNumber) card.isOpen = true;
      pile.cards.push(card);
    }
    gamePiles.push(pile);
  }
}

function deal() {
  for (let i = 0; i < 3; i++) {
    const card = deck.cards.pop();
    if (card) {
      card.isOpen = true;
      hand.cards.push(card);
    } else {
      break;
    }
  }
  return true;
}

function stashCard(card) {
  const acePile = acePiles[fromPile.suit];
  const highestOfSuit = acePile.topCard();
  if (highestOfSuit.number === card.number + 1) {
    moveCard(card, fromPile, acePile);
    return true;
  }
  return false;
}

function takeTurn(action, toPile) {
  if (action(toPile)) {
    renderDomPiles();
  }
}

initialise();
renderDomPiles();
