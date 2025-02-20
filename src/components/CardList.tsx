import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Deck from "../model/Deck";
import Card from "../model/Card";
import { BasicForm } from "./BasicForm";
import { CardItem } from "./CardItem";
import { EmptyDeck } from "./EmptyDeck";
import { Loading } from "./Loading";
import { useState } from "react";
import "./CardList.css";

export function CardList({
  deck,
  decksNames,
  setCurrentCard,
  updateDeck,
}: {
  deck: Deck;
  decksNames?: string[];
  setCurrentCard?: (card: Card) => void;
  updateDeck?: (deck: Deck) => void;
}) {
  const [isEditable, setIsEditable] = useState(false);

  const updateName = (name?: string) => {
    if (!name || decksNames?.find((n) => n === name)) {
      setIsEditable(false);
    } else {
      const newDeck = new Deck(deck?.id, name, deck?.cards);
      if (updateDeck) updateDeck(newDeck);
      setIsEditable(false);
    }
  };

  const toggleEditable = () => {
    setIsEditable(true);
  };

  return (
    <SwiperComponent
      className={updateDeck ? "" : "swiper-collection"}
      modules={[Navigation]}
      centeredSlides={true}
      spaceBetween={0}
      slidesPerView={updateDeck ? 1 : 3}
      navigation={updateDeck ? true : true}
      onSlideChange={(swiper) => {
        const card = deck.cards ? deck.cards[swiper.activeIndex] : undefined;
        if (card) {
          if (setCurrentCard) {
            setCurrentCard(card);
          }
        }
      }}
    >
      {deck.cards.length === 0 ? (
        updateDeck ? (
          <EmptyDeck />
        ) : (
          <Loading />
        )
      ) : (
        deck?.cards?.map((card: Card, index: number) => (
          <SwiperSlide key={index}>
            <CardItem
              card={card}
              className={updateDeck ? "deck-item" : "collection-item"}
            />
          </SwiperSlide>
        ))
      )}
      {isEditable && updateDeck ? (
        <BasicForm
          label="save"
          onClickCallback={(inputValue) => updateName(inputValue)}
          placeholder={deck?.name}
        />
      ) : (
        <h4 className="deck-name" onClick={toggleEditable}>
          {deck?.name} ({deck?.cards?.length})
        </h4>
      )}
    </SwiperComponent>
  );
}
