import React, { createContext, useContext } from "react";
import {
  CardsService,
  CardsServiceImplementation,
} from "../services/CardsService";

type CardsServiceContextProps = {
  cardsService: CardsService;
};

const CardsServiceContext = createContext<CardsServiceContextProps | undefined>(
  undefined
);

export const CardsServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cardsService = new CardsServiceImplementation();

  return (
    <CardsServiceContext.Provider value={{ cardsService }}>
      {children}
    </CardsServiceContext.Provider>
  );
};

export const useCardsServiceContext = (): CardsServiceContextProps => {
  const context = useContext(CardsServiceContext);
  if (!context) {
    throw new Error(
      "useCardsServiceContext must be used inside a CardsServiceContextProvider"
    );
  }
  return context;
};
