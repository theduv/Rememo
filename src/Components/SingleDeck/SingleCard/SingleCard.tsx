import { Dispatch, SetStateAction } from "react";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import NotTypingCard from "./NotTypingCard";
import TypingCard from "./TypingCard";

interface SingleCardProps {
  typing: boolean;
  cardData: Card;
  setCurrentCard: Dispatch<SetStateAction<number>>;
  deckData: Deck;
  setCurrentResults: Dispatch<SetStateAction<{ right: number; wrong: number }>>;
}

const SingleCard = ({
  typing,
  cardData,
  setCurrentCard,
  deckData,
  setCurrentResults,
}: SingleCardProps) => {
  console.log(typing);

  return typing ? (
    <TypingCard
      cardData={cardData}
      setCurrentCard={setCurrentCard}
      deckData={deckData}
      setCurrentResults={setCurrentResults}
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
