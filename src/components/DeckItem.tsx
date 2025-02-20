import { CardList } from "./CardList";
import Deck from "../model/Deck";
import Card from "../model/Card";
import { useState } from "react";
import { useDecks } from "../contexts/DecksContext";
import "./DeckItem.css";
import Button from "./Button";

export const DeckItem = ({ deck }: { deck: Deck }) => {
  const { decks, currentCard, updateDecks } = useDecks();
  const [currentFromDeck, setCurrentFromDeck] = useState<Card>(deck.cards[0]);

  const addCurrentFromCardCollection = () => {
    if (currentCard && deck.cards) {
      const newCard = new Card(
        Date.now().toString(),
        currentCard.name,
        currentCard.image
      );
      const newDeck = new Deck(Date.now().toString(), deck.name, [
        newCard,
        ...deck.cards,
      ]);
      updateDecks(decks.map((d) => (d.name === newDeck.name ? newDeck : d)));
      setCurrentFromDeck(currentCard);
    }
  };

  const removeCurrentFromDeck = () => {
    if (!currentFromDeck) return;

    const newDecks = decks.map((d) =>
      d.id === deck.id
        ? {
            ...d,
            cards: d.cards!.filter((card) => card.id !== currentFromDeck.id),
          }
        : d
    );

    updateDecks(newDecks);

    const updatedDeck = newDecks.find((d) => d.id === deck.id);

    if (updatedDeck) setCurrentFromDeck(updatedDeck.cards[0]);
  };

  const removeCurrentDeck = () => {
    updateDecks(decks.filter((d) => d.id !== deck.id));
  };

  const updateNameDeck = (deck: Deck) => {
    updateDecks(decks.map((d) => (d.id === deck.id ? deck : d)));
  };

  return (
    <div>
      <CardList
        deck={deck}
        decksNames={decks.map((d) => d.name)}
        setCurrentCard={setCurrentFromDeck}
        updateDeck={updateNameDeck}
      />
      <div className="deck-menu">
        <Button
          onClick={addCurrentFromCardCollection}
          label={"+ add current card from collection"}
        />

        <Button onClick={removeCurrentFromDeck} label={"- delete card"} />

        <Button onClick={removeCurrentDeck} label={"- delete deck"} />
      </div>
    </div>
  );
};
