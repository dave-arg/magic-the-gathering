import { useState, useEffect } from "react";
import { useCardsServiceContext } from "../contexts/CardsServiceContext";
import Deck from "../model/Deck";
import { CardList } from "./CardList";
import { useDecks } from "../contexts/DecksContext";
import { AddDeck } from "./AddDeck";

export function CardCollection() {
  const { cardsService } = useCardsServiceContext();
  const [collection, setCollection] = useState<Deck>(
    new Deck(Date.now().toString(), "Cards Collection", [])
  );
  const { setCurrentCard } = useDecks();

  useEffect(() => {
    cardsService.getCards().then((cards) => {
      const newDeck = new Deck(collection.id, collection.name, cards);
      setCollection(newDeck);
      setCurrentCard(newDeck.cards[0]);
    });
  }, []);

  return (
    <>
      <CardList deck={collection} setCurrentCard={setCurrentCard} />
      <AddDeck />
    </>
  );
}
