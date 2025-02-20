import { createContext, useContext, useState } from "react";
import Deck from "../model/Deck";
import Card from "../model/Card";

export interface DecksContextType {
  decks: Deck[];
  currentCard: Card | null;
  setCurrentCard: (card: Card) => void;
  updateDecks: (decks: Deck[]) => void;
}

const DecksContext = createContext<DecksContextType | undefined>(undefined);

export const DecksProvider = ({ children }: { children: React.ReactNode }) => {
  const [decks, setDecks] = useState<Deck[]>([
    new Deck(Date.now().toString(), "Favs", []),
  ]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const updateDecks = (decks: Deck[]) => {
    setDecks(decks);
  };

  return (
    <DecksContext.Provider
      value={{
        decks,
        currentCard,
        setCurrentCard,
        updateDecks,
      }}
    >
      {children}
    </DecksContext.Provider>
  );
};

export const useDecks = () => {
  const context = useContext(DecksContext);
  if (!context) {
    throw new Error("useDecks must be used inside a DecksProvider");
  }
  return context;
};
