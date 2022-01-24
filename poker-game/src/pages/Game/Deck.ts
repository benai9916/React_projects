enum Suit {
  spades = '♠',
  clubs = '♣',
  heart = '♥',
  diamond = '♦',
}

const values: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q'];

// generate cards
class Card {
  private readonly suit: string;

  private readonly value: string;

  constructor(suit: string, value: string) {
    this.suit = suit;
    this.value = value;
  }
}

// map suite with value and generate 52 cards
const cardDeck = (): any => {
  return Object.values(Suit).flatMap((suit) => {
    return values.map((value) => {
      return new Card(suit, value);
    });
  });
};

// deck of card
export class Deck {
  private cards: Card[];

  constructor(cards: Card[] = cardDeck()) {
    this.cards = cards;
  }

  get numberOfCards(): number {
    return this.cards.length;
  }

  get getCards(): Card[] {
    return this.cards;
  }

  // fisher-yates shuffle algorithm
  shuffle = () => {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex: number = Math.floor(Math.random() * (i + 1));
      const oldValue: Card = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  };
}
