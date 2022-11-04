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
  const onClickCorrect = () => {
    if (!clickedShow) return;

    setCurrentResults((oldResults) => ({
      ...oldResults,
      right: oldResults.right + 1,
    }));

    const data = fs.readFileSync("src/data/decks.json");
    const parsedDecks = JSON.parse(data);
    const targetDeck = parsedDecks.find(
      (deck: Deck) => deck.id === deckData.id
    );
    const targetCard = targetDeck.cards.find(
      (card: Deck) => card.id === cardData.id
    );
    targetCard.lastResult = "right";
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedDecks));

    onClickResult();
  };

  const onClickIncorrect = () => {
    if (!clickedShow) return;

    setCurrentResults((oldResults) => ({
      ...oldResults,
      wrong: oldResults.wrong + 1,
    }));

    const data = fs.readFileSync("src/data/decks.json");
    const parsedDecks = JSON.parse(data);
    const targetDeck = parsedDecks.find(
      (deck: Deck) => deck.id === deckData.id
    );
    const targetCard = targetDeck.cards.find(
      (card: Card) => card.id === cardData.id
    );
    targetCard.lastResult = "wrong";
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedDecks));

    onClickResult();
  };

  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "a") {
        onClickIncorrect();
      }
      if (event.key === "d") {
        onClickCorrect();
      }
    });
  }, []);

  return (
    <div className="flex space-x-12 justify-center">
      <XCircle
        onClick={onClickIncorrect}
        width={32}
        height={32}
        className="text-gray-500 cursor-pointer"
      />
      <CheckCircle
        onClick={onClickCorrect}
        width={32}
        height={32}
        className="text-gray-500 cursor-pointer"
      />
    </div>
  );
};

export default CardResults;
