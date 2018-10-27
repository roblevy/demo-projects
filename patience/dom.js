function renderDomPiles() {
  deck.render();
  hand.render();
  gamePiles.forEach(pile => {
    pile.render();
  });
}

let selectedCard;

function handleCardClick(card) {
  return function(event) {
    const pile = card.pile();
    switch (pile.type) {
      case 'deck':
        takeTurn(deal);
        selectedCard = null;
        break;
      case 'hand':
        if (selectedCard) {
          selectedCard = null;
        } else {
          selectedCard = card;
        }
        break;
      case 'game':
        if (selectedCard) {
          takeTurn(selectedCard.changePiles.bind(selectedCard), card.pile());
          selectedCard = null;
        } else {
          selectedCard = card;
        }
    }
  }
}
