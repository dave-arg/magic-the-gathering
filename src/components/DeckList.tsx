import { useDecks } from "../contexts/DecksContext";
import Deck from "../model/Deck";
import { DeckItem } from "./DeckItem";
import "./DeckList.css";

export const DeckList = () => {
  const { decks } = useDecks();

  return (
    <div className="deck-container">
      {decks.map((deck: Deck) => (
        <div className="deck-item-container" key={deck.id}>
          <DeckItem deck={deck} />
        </div>
      ))}
    </div>
  );
};
