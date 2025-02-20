import { useDecks } from "../contexts/DecksContext";
import Deck from "../model/Deck";
import { BasicForm } from "./BasicForm";
import "./AddDeck.css";

export function AddDeck() {
  const { decks, updateDecks } = useDecks();

  const addDeck = (name: string) => {
    if (!name) return;
    if (decks.find((d) => d.name === name)) return;
    const newDeck = new Deck(name, name, []);
    updateDecks([...decks, newDeck]);
  };

  return (
    <div className="add-deck">
      <BasicForm
        onClickCallback={addDeck}
        label={"+ add deck"}
        placeholder={""}
      />
    </div>
  );
}
