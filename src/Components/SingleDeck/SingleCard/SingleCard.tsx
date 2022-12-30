import { Dispatch, SetStateAction } from "react";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import NotTypingCard from "./NotTypingCard";
import TypingCard from "./TypingCard";

interface SingleCardProps {
  setLives: Dispatch<SetStateAction<{ max: number; left: number }>>;
  typing: boolean;
  cardData: Card;
  setCurrentCard: Dispatch<SetStateAction<number>>;
  deckData: Deck;
  setCurrentResults: Dispatch<SetStateAction<{ right: number; wrong: number }>>;
}

const SingleCard = ({
  setLives,
  typing,
  cardData,
  setCurrentCard,
  deckData,
  setCurrentResults,
}: SingleCardProps) => {
  return typing ? (
    <TypingCard
      setLives={setLives}
      cardData={cardData}
      setCurrentCard={setCurrentCard}
    />
  ) : (
    <NotTypingCard
      cardData={cardData}
      setCurrentCard={setCurrentCard}
      deckData={deckData}
      setCurrentResults={setCurrentResults}
    />
  );
};

export default SingleCard;
