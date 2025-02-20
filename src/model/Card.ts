export class Card {
  constructor(public id: string , public name: string, public image: string) {}

  display() {
    return `el id de la carta es ${this.id}`;
  }
}

export default Card;
