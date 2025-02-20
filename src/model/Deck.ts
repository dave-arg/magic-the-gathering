import Card from "./Card";

class Deck {
  constructor(public id: string, public name: string, public cards: Card[]) {}
}

export default Deck;
