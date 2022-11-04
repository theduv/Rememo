import { useState } from "react";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { Card } from "../../../../Interfaces/card.interface";
import { Deck } from "../../../../Interfaces/deck.interface";
const fs = window.require("fs");

interface CardResultsProps {
  onClickResult: () => void;
  clickedShow: boolean;
  deckData: Deck;
  cardData: Card;
  setCurrentResults: Dispatch<SetStateAction<{ wrong: number; right: number }>>;
}

const CardResults = ({
  onClickResult,
  clickedShow,
  deckData,
  cardData,
  setCurrentResults,
}: CardResultsProps) => {
  const [keyPressed, setKeyPressed] = useState("undefined");

  useEffect(() => {
    if (keyPressed === "d") onClickAnswer("right");
    if (keyPressed === "a") onClickAnswer("wrong");
  }, [keyPressed]);

  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      setKeyPressed(event.key);
    });
  });

  const onClickAnswer = (answer: string) => {
    if (!clickedShow) return;

    if (answer === "right") {
      setCurrentResults((oldResults) => ({
        ...oldResults,
        right: oldResults.right + 1,
      }));
    } else {
      setCurrentResults((oldResults) => ({
        ...oldResults,
        wrong: oldResults.wrong + 1,
      }));
    }

    const data = fs.readFileSync("src/data/decks.json");
    const parsedDecks = JSON.parse(data);
    const targetDeck = parsedDecks.find(
      (deck: Deck) => deck.id === deckData.id
    );
    const targetCard = targetDeck.cards.find(
      (card: Deck) => card.id === cardData.id
    );
    targetCard.lastResult = answer;
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedDecks));

    onClickResult();
  };

  return (
    <div className="flex space-x-12 justify-center">
      <XCircle
        onClick={() => onClickAnswer("wrong")}
        width={32}
        height={32}
        className="text-gray-500 cursor-pointer"
      />
      <CheckCircle
        onClick={() => onClickAnswer("right")}
        width={32}
        height={32}
        className="text-gray-500 cursor-pointer"
      />
    </div>
  );
};

export default CardResults;
